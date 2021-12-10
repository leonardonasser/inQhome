package com.inqhome.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.inqhome.security.JWTAuthenticationFilter;
import com.inqhome.security.JWTAuthorizationFilter;
import com.inqhome.security.JWTUtil;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	//whitelist ou hasIpAddress
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	private AuthenticationConfig authenticationConfig;
	
	private static final String[] PUBLIC_MATCHERS = {
			"/api/mobile/auth/**",	
			"/api/web/auth/**",
	        "/api/usuario/**"
	};
	
	private static final String[] PUBLIC_MATCHERS_POST = {
	        "/api/mobile/auth/**",
	        "/api/web/auth/**",
			"/api/usuario/**"
	};
	
	private static final String[] PUBLIC_MATCHERS_PUT = {
	        "/api/mobile/auth/**",
	        "/api/web/auth/**",
	        "/api/usuario/**"
	};
	
	private static final String[] PUBLIC_MATCHERS_GET = {
	        "/api/mobile/auth/**",
	        "/api/web/auth/**",
			"/api/usuario/**",	
	};
	
	private static final String[] PUBLIC_MATCHERS_DELETE = {
	        "/api/mobile/auth/**",
	        "/api/web/auth/**",
	        "/api/usuario/**"
	};

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/v2/api-docs", "/configuration/ui", "/swagger-resources/**", "/configuration/**",
				"/swagger-ui.html", "/webjars/**", "/static/**");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable();
		http.authorizeRequests()
			.antMatchers(PUBLIC_MATCHERS).permitAll()
			.antMatchers(HttpMethod.POST, PUBLIC_MATCHERS_POST).permitAll()
			.antMatchers(HttpMethod.PUT, PUBLIC_MATCHERS_PUT).permitAll()
			.antMatchers(HttpMethod.GET, PUBLIC_MATCHERS_GET).permitAll()
			.antMatchers(HttpMethod.DELETE, PUBLIC_MATCHERS_DELETE).permitAll()
			.anyRequest().authenticated()
		.and().httpBasic().authenticationEntryPoint(authenticationConfig);

		http.addFilter(new JWTAuthenticationFilter(authenticationManager(), jwtUtil));
		http.addFilter(new JWTAuthorizationFilter(authenticationManager(), jwtUtil, userDetailsService));
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		//CorsConfiguration configuration =  new CorsConfiguration().applyPermitDefaultValues();
        //configuration.setAllowedOrigins(Arrays.asList("*"));
		//configuration.setAllowCredentials(true);
		//configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        //configuration.setAllowedHeaders(Arrays.asList("X-Requested-With", "Origin", "Content-Type", "Accept", "Authorization"));
		//configuration.addAllowedOrigin("*");
		//configuration.addAllowedHeader("*");
	    
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
	    source.registerCorsConfiguration("/**", corsConfiguration);
		//source.registerCorsConfiguration("/**", configuration);
		return source;
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
}
