package com.qubit.qubit.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtils {
    private final String SECRET = "a62ddff0758667d2b70f045f0d9975f8";

    public String generateToken(String username){
        Map<String, String> claims = new HashMap<>();
        return createToken(claims, username);
    }

    private String createToken(Map<String, String> claims, String username) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 5 * 1000 * 60 * 60))
                .signWith(setSigningKey())
                .compact();

    }

    private Key setSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public boolean isValid(String token){
        try {
            Claims claims = extractAllClaims(token);
            Date expDate= claims.getExpiration();
            return (expDate.after(new Date()));
        } catch (Exception e){
            return false;
        }
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(setSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUsername(String token){
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }
}
