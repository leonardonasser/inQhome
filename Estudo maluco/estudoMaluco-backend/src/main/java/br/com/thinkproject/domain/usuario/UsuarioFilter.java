package br.com.thinkproject.domain.usuario;

import javax.ws.rs.QueryParam;
import lombok.Data;

@Data
public class UsuarioFilter {

    @QueryParam("search")
    private String search;

}
