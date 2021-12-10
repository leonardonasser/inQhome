package com.inqhome.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JWTUtil {
	
	@Value("${jwt.secret}")
	private String secret;
	
	@Value("${jwt.expiration}")
	private Long expiration;
	
	public String generateToken(String username) {
		return Jwts.builder()
				.setSubject(username)
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(SignatureAlgorithm.HS512, secret.getBytes())
				.compact();
	}

	public boolean tokenValido(String token) {
		Claims claims = getClaims(token);

        System.out.println("claims:" + claims);
		if(claims != null) {
			String username = claims.getSubject();
			System.out.println(username);
			Date expirationDate = claims.getExpiration();
			Date now = new Date(System.currentTimeMillis());
            System.out.println(expirationDate);
			if(username != null && expirationDate != null && now.before(expirationDate)) {
				return true;
			}
		}
		return false;
	}

	public String getUsername(String token) {
		Claims claims = getClaims(token);
		if(claims != null) {
			return claims.getSubject();
		}
		return null;
	}
	
	
	private Claims getClaims(String token) {
		try {
			return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody();
		}catch (Exception e) {
			return null;
		}
	}

	private static final Logger LOG = LoggerFactory.getLogger(JWTUtil.class);


	public String refreshToken(String oldToken) {
		String email = getUsername(oldToken);
		return Jwts.builder()
				.setSubject(email)
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(SignatureAlgorithm.HS512, secret.getBytes())
				.compact();
	}

	public String invalidateToken(String oldToken) {
		String email = getUsername(oldToken);
		return Jwts.builder()
				.setSubject(email)
				.setExpiration(new Date(System.currentTimeMillis()))
				.signWith(SignatureAlgorithm.HS512, secret.getBytes())
				.compact();
	}
	
}
