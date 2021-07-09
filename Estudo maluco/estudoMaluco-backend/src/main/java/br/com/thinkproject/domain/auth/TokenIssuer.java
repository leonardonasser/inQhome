package br.com.thinkproject.domain.auth;

import br.com.thinkproject.domain.usuario.Usuario;
import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.auth.principal.ParseException;
import io.smallrye.jwt.build.Jwt;
import io.smallrye.jwt.build.JwtClaimsBuilder;
import java.time.Duration;
import java.time.Instant;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.validation.ValidationException;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.jwt.JsonWebToken;

@ApplicationScoped
public class TokenIssuer {

    private static final Duration LOGIN_TOKEN_DURATION = Duration.ofHours(12);
    private static final Duration RESET_PASSWORD_TOKEN_DURATION = Duration.ofHours(1);

    @Inject
    JWTParser jwtParser;

    @ConfigProperty(name = "mp.jwt.verify.issuer")
    String issuer;

    public String issueForLogin(Usuario usuario) {
        JsonObject claims = Json.createObjectBuilder().add(Claims.groups.name(), usuario.getTipoUsuario().name())
                .build();
        return generateToken(usuario.getLogin(), LOGIN_TOKEN_DURATION, claims);
    }

    public String issueForPasswordReset(Usuario usuario) {
        return generateToken(usuario.getLogin(), RESET_PASSWORD_TOKEN_DURATION);
    }

    public String validateAndGetSubjectLogin(String token) {
        try {
            JsonWebToken jwtToken = jwtParser.parse(token);
            return jwtToken.getSubject();
        } catch (ParseException e) {
            throw new ValidationException("Token inválido", e);
        }
    }

    private String generateToken(String subject, Duration duration) {
        return baseJwt(subject).expiresAt(Instant.now().plus(duration)).sign();
    }

    private String generateToken(String subject, Duration duration, JsonObject claims) {
        return baseJwt(subject, claims).expiresAt(Instant.now().plus(duration)).sign();
    }

    private String generateToken(String subject, JsonObject claims) {
        return baseJwt(subject, claims).sign();
    }

    private JwtClaimsBuilder baseJwt(String subject) {
        JsonObject claims = Json.createObjectBuilder().build();
        return baseJwt(subject, claims);
    }

    private JwtClaimsBuilder baseJwt(String subject, JsonObject claims) {
        return Jwt.claims(claims).issuer(issuer).subject(subject).upn(subject).issuedAt(Instant.now());
    }
}
