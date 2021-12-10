package com.inqhome.mensagem;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.inqhome.contato.Contato;
import com.inqhome.usuario.Usuario;
import lombok.Data;
import java.util.Calendar;
import java.util.Date;
import javax.persistence.*;

@Data
@Entity
@Table(name = "mensageria")
public class Mensagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
   
    private String texto;
    
    @OneToOne
    @JoinColumn(name = "contato")
    private Contato contato;
    
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "America/Sao_Paulo")
    @Column(name = "data_hora", nullable = false)
    private Date dataHora;
    
    private boolean msgProposta;

    public Mensagem (){
    }

    public Mensagem(String texto, boolean msgProposta, Contato contato) {
        super();
        this.texto = texto;
        this.dataHora = Calendar.getInstance().getTime();
        this.msgProposta = msgProposta;
        this.contato = contato;
    }

}
