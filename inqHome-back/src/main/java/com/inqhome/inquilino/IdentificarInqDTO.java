package com.inqhome.inquilino;

import com.inqhome.usuario.Usuario;

import lombok.Data;

@Data
public class IdentificarInqDTO {
    
    private Boolean jaInquilino;
    private Usuario solicitanteInq;

}
