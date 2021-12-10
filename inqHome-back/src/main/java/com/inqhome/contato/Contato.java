package com.inqhome.contato;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.inqhome.usuario.Usuario;

import lombok.Data;

@Data
@Entity
@Table(name = "contato")
public class Contato {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idContato;
    
    @OneToOne
    @JoinColumn(name = "id_usuario_responsavel")
    private Usuario usuarioResponsavel;
    
    @OneToOne
    @JoinColumn(name = "id_usuario_recebe")
    private Usuario usuarioRecebe;
    
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "America/Sao_Paulo")
    @Column(name = "data_hora", nullable = false)
    private Date dataHora;
    
    public Contato(Usuario usuarioResponsavel, Usuario usuarioRecebe) {
        super();
        this.usuarioResponsavel = usuarioResponsavel;
        this.usuarioRecebe = usuarioRecebe;
        this.dataHora = Calendar.getInstance().getTime();
    }

    public Contato() {
        super();
    }

}
