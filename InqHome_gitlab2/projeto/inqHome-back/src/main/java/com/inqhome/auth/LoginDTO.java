package com.inqhome.auth;

import lombok.Data;

@Data
public class LoginDTO {

    private String id;
    private String token;
    private String nome;
    private String email;
    private String telefone;
   
    
    public LoginDTO(Long long1, String token, String nome, String email, String telefone) {
        this.id = long1.toString();
        this.token = token;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
    
    
    
}
