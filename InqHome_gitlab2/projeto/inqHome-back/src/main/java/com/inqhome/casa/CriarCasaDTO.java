package com.inqhome.casa;

import lombok.Data;

@Data
public class CriarCasaDTO {

    private Long usuarioResponsavelId;
    private Double valorAluguel;
    private String cep;
    private String endereco;
    private String numero;
    private int numeroVagas;
    private String lat;
    private String lng;
    private String cidade;
    private String estado;
    
}
