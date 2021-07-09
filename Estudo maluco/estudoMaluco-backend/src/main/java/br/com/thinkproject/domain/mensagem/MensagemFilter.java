package br.com.thinkproject.domain.mensagem;

import javax.ws.rs.QueryParam;

import lombok.Data;

@Data
public class MensagemFilter {

    @QueryParam("usuario1")
    private Long usuario1;
    
    @QueryParam("usuario2")
    private Long usuario2;
    
    
}
