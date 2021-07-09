package br.com.thinkproject.domain.auth;

import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PedidoResetSenha {

    @NotNull
    private String email;

}
