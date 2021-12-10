package br.com.thinkproject.domain.usuario;

import br.com.thinkproject.infra.persistence.BaseEntity;
import java.util.Calendar;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "usuarios")
@Getter
@ToString
public class Usuario extends BaseEntity<Usuario> {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @NotBlank
    @Column(name = "nome", nullable = false)
    private String nome;

    @Setter
    @NotBlank
    @Column(name = "login", nullable = false)
    private String login;

    @NotBlank
    @Column(name = "senha", nullable = false)
    private String senhaHash;

    @Setter
    @NotNull
    @Column(name = "tipo_usuario", nullable = false)
    @Enumerated(EnumType.STRING)
    private Role tipoUsuario;

    @Setter
    @NotNull
    @Column(name = "situacao", nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusUsuario statusUsuario;
    
    @NotNull
    @Column(name = "criado_em", nullable = false)
    private Date criadoEm;
    
    @Setter
    @Column(name = "ultimo_login")
    private Date ultimoLogin;

    @Deprecated
    public Usuario() {

    }

    public Usuario(String nome, String login, Password password, Role tipoUsuario, StatusUsuario statusUsuario) {
        this.nome = nome;
        this.login = login;
        this.senhaHash = password.hash();
        this.tipoUsuario = tipoUsuario;
        this.statusUsuario = statusUsuario;
        this.criadoEm = Calendar.getInstance().getTime();
    }

    public void setSenha(Password password) {
        this.senhaHash = password.hash();
    }

    public boolean passwordMatches(String guess) {
        return Password.matches(this.senhaHash, guess);
    }
    
    public boolean isAtivo() {
        return this.statusUsuario == StatusUsuario.ATIVO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Usuario usuario = (Usuario) o;

        return id.equals(usuario.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}
