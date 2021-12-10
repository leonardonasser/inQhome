package br.com.thinkproject.domain.usuario;

import lombok.Data;

@Data
public class CriarUsuarioDTO {

    private String nome;
    private String login;
    private String senha;
    private Role tipoUsuario;
    private StatusUsuario statusUsuario;

}
