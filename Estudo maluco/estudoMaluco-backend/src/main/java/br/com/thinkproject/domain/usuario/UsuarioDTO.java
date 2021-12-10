package br.com.thinkproject.domain.usuario;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UsuarioDTO {

    private Long id;
    private String login;
    private String nome;
    private Role tipoUsuario;
    private StatusUsuario statusUsuario;
    private Date criadoEm;
    private Date ultimoLogin;

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.login = usuario.getLogin();
        this.tipoUsuario = usuario.getTipoUsuario();
        this.statusUsuario = usuario.getStatusUsuario();
        this.criadoEm = usuario.getCriadoEm();
        this.ultimoLogin = usuario.getUltimoLogin();
    }

    public static UsuarioDTO ofEntity(Usuario usuario) {
        return new UsuarioDTO(usuario);
    }

    public static List<UsuarioDTO> ofEntities(List<Usuario> usuarios) {
        return usuarios.stream().map(UsuarioDTO::ofEntity).collect(Collectors.toList());
    }

    public UsuarioDTO() {
        super();
        // TODO Auto-generated constructor stub
    }
}
