package com.inqhome.despesa;

import java.util.Date;
import lombok.Data;

@Data
public class CriarDespesaDTO {

    private String titulo;
    private Long casaId;
    private double valor;
    private Date dataValidade;
    
}
