package com.inqhome.casa;

import javax.persistence.*;

import com.inqhome.usuario.Usuario;

import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "casa")
@Data
public class Casa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_casa")
    private Long idCasa;
    @OneToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuarioResponsavel;
    private String cep;
    private String endereco;
    private String numeroCasa;
    private Double valorAluguel;
    private String lat;
    private String lng;
    private String cidade;
    private String estado;

    public Casa(Usuario usuarioResponsavel, Double valorAluguel) {
        this.usuarioResponsavel = usuarioResponsavel;
        this.valorAluguel = valorAluguel;
    }

    public Casa(Usuario usuarioResponsavel, Double valorAluguel, String cep,  String endereco, String numero, 
            String lat, String lng, String cidade, String estado) {
        this.usuarioResponsavel = usuarioResponsavel;
        this.valorAluguel = valorAluguel;
        this.cep = cep;
        this.endereco = endereco;
        this.numeroCasa = numero;
        
        this.lat = lat;
        this.lng = lng;
        this.cidade = cidade;
        this.estado = cidade;
    }

    public Casa() {

    }
}
