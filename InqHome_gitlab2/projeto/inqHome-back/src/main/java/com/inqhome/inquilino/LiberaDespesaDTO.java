package com.inqhome.inquilino;

import com.inqhome.casa.Casa;

import lombok.Data;

@Data
public class LiberaDespesaDTO {

    private boolean despesasLiberado;
    private Casa casa;
    
    public LiberaDespesaDTO(boolean despesasLiberado, Casa casa) {
        this.despesasLiberado = despesasLiberado;
        this.casa = casa;
    }

    public LiberaDespesaDTO() {
    }
 
}
