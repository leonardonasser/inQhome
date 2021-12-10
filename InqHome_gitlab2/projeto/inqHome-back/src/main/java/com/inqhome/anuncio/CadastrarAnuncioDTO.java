package com.inqhome.anuncio;

import lombok.Data;

@Data
public class CadastrarAnuncioDTO {
    
    private String titulo;
    private String tipoImovel;
    private String cep;
    private String endereco;
    private String numero;
    private int numeroVagas;
    private String descricao;
    private boolean temGaragem;
    private boolean permitidoPets;
    
    private Long usuarioResponsavelId;
    private boolean ativo;
    
    private Double valorAluguel;
    
    private String lat;
    private String lng;
    private String cidade;
    private String estado;
    
}
