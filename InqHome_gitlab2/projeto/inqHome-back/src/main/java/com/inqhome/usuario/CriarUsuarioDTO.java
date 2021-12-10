package com.inqhome.usuario;

import lombok.Data;

@Data
public class CriarUsuarioDTO {
	
	private String nome;
	private String senha;
	private String email;
	private boolean ativo;
	private String telefone;

}
