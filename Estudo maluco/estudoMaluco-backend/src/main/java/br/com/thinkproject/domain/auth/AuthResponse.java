package br.com.thinkproject.domain.auth;

import br.com.thinkproject.domain.usuario.Role;
import br.com.thinkproject.domain.usuario.Usuario;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class AuthResponse {

    private Long id;
    private String login;
    private Role tipoUsuario;
    private String token;
    private Boolean primeiroLogin;

    public AuthResponse(Usuario usuario, String token, Boolean primeiroLogin) {
        this.id = usuario.getId();
        this.login = usuario.getLogin();
        this.tipoUsuario = usuario.getTipoUsuario();
        this.token = token;
        this.primeiroLogin = primeiroLogin;
    }

    public AuthResponse() {
        super();
        // TODO Auto-generated constructor stub
    }

}
