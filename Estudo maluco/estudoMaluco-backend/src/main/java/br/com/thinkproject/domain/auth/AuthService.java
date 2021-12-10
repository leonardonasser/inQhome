package br.com.thinkproject.domain.auth;

import br.com.thinkproject.domain.usuario.CriarUsuarioDTO;
import br.com.thinkproject.domain.usuario.Usuario;
import br.com.thinkproject.domain.usuario.UsuarioService;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ValidationException;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@ApplicationScoped
@Transactional
public class AuthService {

    @Inject
    UsuarioService usuarioService;

    @Inject
    TokenIssuer tokenIssuer;

    @ConfigProperty(name = "app.base-url")
    String appUrl;

    public AuthResponse autenticar(String login, String senha) {
        Boolean primeiroLogin = false;

        Usuario usuario = usuarioService.recuperarPorLogin(login).filter(Usuario::isAtivo)
                .filter(u -> u.passwordMatches(senha))
                .orElseThrow(() -> new ValidationException("Login ou Senha incorretos!"));

        String token = tokenIssuer.issueForLogin(usuario);

        return new AuthResponse(usuario, token, primeiroLogin);
    }

    public void resetarSenha(String login) {
        Usuario usuario = usuarioService.recuperarPorLoginOrThrow(login);
        String token = tokenIssuer.issueForPasswordReset(usuario);
        // enviarEmailResetSenha(email, token);
    }

    private void enviarEmailResetSenha(String email, String token) {
        String link = String.format("%s/resetar-senha?token=%s", appUrl, token);
        // emailService.enviarEmailResetSenha(email, link);
    }

    public AuthResponse atualizarSenha(String token, String novaSenha) {
        String login = tokenIssuer.validateAndGetSubjectLogin(token);

        Usuario usuario = usuarioService.alterarSenha(login, novaSenha);
        
        return autenticar(usuario.getLogin(), novaSenha);

    }

    public Usuario cadastrar(CriarUsuarioDTO auth) {
        return usuarioService.criar(auth);
    }

}
