package com.inqhome.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private static final Logger LOG = LoggerFactory.getLogger(JWTAuthorizationFilter.class);

    private JWTUtil jwtUtil;

    private UserDetailsService userDetailsService;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, UserDetailsService userDetailsService) {
        super(authenticationManager);
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        String header = request.getHeader("Authorization");
        String requestURI = request.getRequestURI();
        String user = "NL(-1)";
        
        try {
            if (header != null && header.startsWith("Bearer ")) {
                UsernamePasswordAuthenticationToken auth = getAuthentication(header.substring(7));
                if (auth != null) {
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
            chain.doFilter(request, response);

                
            LOG.info(user + " -> method: " + request.getMethod() + " -> requestURI: " + requestURI + " -> responseStatus: " + response.getStatus() + " -> " + request.getRemoteAddr());
            
        } catch (java.net.SocketTimeoutException e) {
            LOG.error("SocketTimeoutException: " + e.getMessage());
            throw e;
            
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            throw e;
        }
    
    }
    
    private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        if(jwtUtil.tokenValido(token)) {
            String username = jwtUtil.getUsername(token);
          //  UserDetails user = userDetailsService.loadUserByUsername(username);   
            ArrayList<GrantedAuthority> list = new ArrayList<>();
            return new UsernamePasswordAuthenticationToken(username, null, list);
        }
        return null;
    }

}
