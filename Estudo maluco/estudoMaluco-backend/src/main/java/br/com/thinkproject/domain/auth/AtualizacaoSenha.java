package br.com.thinkproject.domain.auth;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AtualizacaoSenha {

    @NotNull
    private String token;

    @NotBlank
    private String novaSenha;

}
