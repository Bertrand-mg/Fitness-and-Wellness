package com.fitnesswellness.fitness_platform.service;

import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fitnesswellness.fitness_platform.dto.ForgotPasswordRequest;
import com.fitnesswellness.fitness_platform.dto.LoginRequest;
import com.fitnesswellness.fitness_platform.dto.OtpGenerator;
import com.fitnesswellness.fitness_platform.dto.SignupRequest;
import com.fitnesswellness.fitness_platform.dto.TwoFactorRequest;
import com.fitnesswellness.fitness_platform.dto.UserProfileResponse;
import com.fitnesswellness.fitness_platform.model.RoleEnum;
import com.fitnesswellness.fitness_platform.model.User;
import com.fitnesswellness.fitness_platform.provider.JwtTokenProvider;
import com.fitnesswellness.fitness_platform.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private EmailService emailService;

    public UserProfileResponse getProfileById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        return new UserProfileResponse(user.getId(), user.getName(), user.getEmail());
    }

    public String signup(SignupRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(RoleEnum.valueOf("CUSTOMER"));
        user.setTwoFactorEnabled(true);
        userRepository.save(user);
        return "User registered successfully!";
    }

    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email!"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid credentials!";
        }

        if (user.isTwoFactorEnabled()) {
            String twoFactorCode = OtpGenerator.generateOtp();
            user.setTwoFactorCode(twoFactorCode);
            userRepository.save(user);

            emailService.sendEmail(user.getEmail(), "Your 2FA Code", "Your 2FA code is: " + twoFactorCode);
            return "2FA code sent to your email. Please validate using /api/auth/validate-2fa.";
        }

        String token = jwtTokenProvider.generateToken(user);

        user.setResetToken(token);

        userRepository.save(user);

        return token;
    }

    // private SecretKey getSigningKey() {
    // // Use the SignatureAlgorithm to specify the required key size
    // return Keys.secretKeyFor(SignatureAlgorithm.HS256);
    // }

    // private String generateJwtToken(User user) {
    // SecretKey key = getSigningKey();
    // JwtBuilder jwtBuilder = Jwts.builder()
    // .setSubject(user.getEmail())
    // .claim("email", user.getEmail())
    // .claim("role", user.getRole())
    // .setIssuedAt(new Date())
    // .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
    // .signWith(key, SignatureAlgorithm.HS256);
    // return jwtBuilder.compact();

    // }

    public String validateTwoFactorCode(TwoFactorRequest request) {
        User user = null;
        user = userRepository.findByEmail(request.getEmail()).get();

        // Validate the 2FA code
        if (request.getTwoFactorCode() != null) {
            if (!request.getTwoFactorCode().equals(user.getTwoFactorCode())) {
                return null;
            }
        }

        // Clear the 2FA code after successful validation
        user.setTwoFactorCode(null);
        user.setTwoFactorEnabled(false);
        userRepository.save(user);

        return jwtTokenProvider.generateToken(user);
    }

    public String forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found!"));

        // Generate reset token
        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        user.setResetTokenExpiration(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        // Send email with reset link
        String resetLink = "http://localhost:5173/forgot-password/reset-password?token=" + resetToken;
        emailService.sendEmail(user.getEmail(), "Password Reset",
                "Click the link to reset your password: " + resetLink);

        return "Reset link sent to email!";
    }

    public String resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired reset token!"));

        if (user.getResetTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset token has expired!");
        }

        // Update the password
        user.setPassword(passwordEncoder.encode(newPassword));
        // user.setPassword(newPassword);

        user.setResetToken(null);
        user.setResetTokenExpiration(null);
        userRepository.save(user);

        return "Password reset successful!";
    }

    // public String updateProfileById(Long id, UpdateProfileRequest request) {
    // User user = userRepository.findById(id)
    // .orElseThrow(() -> new RuntimeException("User not found!"));

    // // Update name if provided
    // if (request.getName() != null && !request.getName().isEmpty()) {
    // user.setName(request.getName());
    // }

    // // Update email if provided
    // if (request.getEmail() != null && !request.getEmail().isEmpty()) {
    // if (userRepository.findByEmail(request.getEmail()).isPresent()) {
    // throw new RuntimeException("Email already in use!");
    // }
    // user.setEmail(request.getEmail());
    // }

    // // Update password if provided
    // if (request.getPassword() != null && !request.getPassword().isEmpty()) {
    // user.setPassword(passwordEncoder.encode(request.getPassword()));
    // }

    // userRepository.save(user);
    // return "Profile updated successfully!";
    // }
}
