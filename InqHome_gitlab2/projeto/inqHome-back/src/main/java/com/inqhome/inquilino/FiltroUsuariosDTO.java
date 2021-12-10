package com.inqhome.inquilino;

import java.io.Serializable;

import lombok.Data;

@Data
public class FiltroUsuariosDTO implements Serializable {

   private static final long serialVersionUID = 1L;
    
    private Long usuario1;
    private Long usuario2;
    
}
