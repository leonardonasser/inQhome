package com.inqhome.anuncio;

import lombok.Data;

@Data
public class CriarAnuncioDTO {

    public int vagasDisponiveis;
    private Long idUsuario;
    private String descricao;
    private boolean ativo;

}
