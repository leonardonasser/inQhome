package br.com.thinkproject.domain.mensagem;

import lombok.Data;

@Data
public class CriarMensagemDTO {

    private Long usuarioCriaId;
    private Long usuarioRecebeId;
    private String texto;
    
}
