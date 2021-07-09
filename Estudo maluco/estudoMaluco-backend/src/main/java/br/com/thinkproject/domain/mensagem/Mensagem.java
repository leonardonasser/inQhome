package br.com.thinkproject.domain.mensagem;

import br.com.thinkproject.domain.usuario.Usuario;
import br.com.thinkproject.infra.persistence.BaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Calendar;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "mensagens")
public class Mensagem extends BaseEntity<Mensagem> {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "usuario_cria_id", nullable = false)
    @ManyToOne
    private Usuario usuarioCria;

    @JoinColumn(name = "usuario_recebe_id", nullable = false)
    @ManyToOne
    private Usuario usuarioRecebe;
    
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "America/Sao_Paulo")
    @Column(name = "data_hora", nullable = false)
    private Date dataHora;
    
    @Column(name = "texto", nullable = false)
    private String texto;
    
    @Column(name = "lido", nullable = false)
    private boolean lido;

    public Mensagem() {
        
    }

    public Mensagem(Long id, Usuario usuarioCria, Usuario usuarioRecebe, String texto) {
        this.id = id;
        this.usuarioCria = usuarioCria;
        this.usuarioRecebe = usuarioRecebe;
        this.dataHora = Calendar.getInstance().getTime();
        this.texto = texto;
        this.lido = false;
    }
      
}
