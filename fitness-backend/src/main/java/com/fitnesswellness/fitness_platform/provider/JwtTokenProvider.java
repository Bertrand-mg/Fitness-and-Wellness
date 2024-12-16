package com.fitnesswellness.fitness_platform.provider;

import com.fitnesswellness.fitness_platform.model.User; // Your custom User class
import com.fitnesswellness.fitness_platform.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtTokenProvider {

    @Autowired
    private UserRepository userRepository;

    private static final String SECRET_KEY = "your-secret-key-here"; // Should be 256 bits long (32 bytes)

    // Generate SecretKey from SECRET_KEY and ensure it's 256 bits (32 bytes)
    private SecretKey getSigningKey() {
        // Ensure the key is at least 256 bits (32 bytes)
        byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);

        if (keyBytes.length < 32) {
            // If the key is too short, pad it (add zeros) to 256 bits (32 bytes)
            byte[] paddedKey = new byte[32];
            System.arraycopy(keyBytes, 0, paddedKey, 0, keyBytes.length);
            return new SecretKeySpec(paddedKey, SignatureAlgorithm.HS256.getJcaName());
        } else if (keyBytes.length > 32) {
            // If the key is too long, truncate it to 256 bits (32 bytes)
            byte[] truncatedKey = new byte[32];
            System.arraycopy(keyBytes, 0, truncatedKey, 0, 32);
            return new SecretKeySpec(truncatedKey, SignatureAlgorithm.HS256.getJcaName());
        }

        // If the key is already 256 bits (32 bytes), use it directly
        return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    public String generateToken(User user) {
        SecretKey key = getSigningKey();

        String role = "ROLE_" + user.getRole(); // Make sure to add the 'ROLE_' prefix

        JwtBuilder jwtBuilder = Jwts.builder()
                .setSubject(user.getEmail()) // Assuming 'user' has getEmail() method
                .claim("email", user.getEmail()) // Store email as a claim
                .claim("role", role) // Store the role with 'ROLE_' prefix
                .setIssuedAt(new Date()) // Set the issued date
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // Set expiration (24 hours)
                .signWith(key, SignatureAlgorithm.HS256); // Sign with the generated secret key and HS256 algorithm

        return jwtBuilder.compact(); // Generate and return the token
    }

    public boolean validateToken(String token) {
        try {
            Optional<User> user = userRepository.findByResetToken(token);

            if (user.isPresent())
                return true;

            return false;
        } catch (Exception e) {
            System.out.println("General exception: " + e.getMessage());
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        SecretKey key = getSigningKey();

        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        return claims.getSubject(); // Retrieve the subject (email) from the claims
    }

    // Extract authentication details from the JWT token
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String username = claims.getSubject(); // Extract the username (email)

        // Extract the role directly from claims
        String role = (String) claims.get("role"); // Example: "ROLE_ADMIN"

        // Use the role as-is when creating the authority
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);

        // Create and return the Authentication object
        return new UsernamePasswordAuthenticationToken(username, null, Collections.singletonList(authority));
    }

}
