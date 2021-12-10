package com.inqhome.mensagem;

import lombok.Data;

@Data
public class CriarMensagemDTO {

    private Long usuarioEnvia;
    private Long usuarioRecebe;
    private String descricao;
    private boolean msgProposta;

}
