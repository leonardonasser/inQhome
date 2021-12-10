package com.inqhome.anuncio;

import javax.persistence.*;
import com.inqhome.casa.Casa;
import com.inqhome.usuario.Usuario;
import lombok.Data;
import java.io.Serializable;

@Entity
@Table(name = "Anuncio")
@Data
public class Anuncio implements Serializable {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    
    private String titulo;
    private String descricao;
    
    @OneToOne
    @JoinColumn(name = "id_casa")
    private Casa casa;
    
    private String tipoImovel;
    private boolean temGaragem;
    private boolean permitidoPets;
    private int vagasDisponiveis;
    
    private boolean ativo = true;

    public Anuncio(Usuario usuario, String descricao, Casa casa, int vagasDisponiveis) {
        super();
        this.usuario = usuario;
        this.descricao = descricao;
        this.casa = casa;
        this.vagasDisponiveis = vagasDisponiveis;
    }

    
    public Anuncio(Usuario usuario, String descricao, Casa casa, int vagasDisponiveis, String titulo, String tipoImovel,
            boolean temGaragem, boolean permitidoPets) {
        super();
        this.usuario = usuario;
        this.descricao = descricao;
        this.casa = casa;
        this.vagasDisponiveis = vagasDisponiveis;
        this.titulo = titulo;
        this.tipoImovel = tipoImovel;
        this.temGaragem = temGaragem;
        this.permitidoPets = permitidoPets;
    }
    
    public Anuncio() {

    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
}
