package com.fitnesswellness.fitness_platform.dto;

import java.util.Random;

public class OtpGenerator {
    public static String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}