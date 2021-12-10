package com.inqhome.usuario;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "usuario")
@Data
public class Usuario implements Serializable {
	private static final Long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuario")
	private Long idUsuario;
	private String nome;
	private String senha;
	private String email;
    private String telefone;
	private String img;
	private double avaliacao;
	private boolean termos_de_uso;
	private boolean ativo;

	public Usuario() {
	}

	public Usuario(String nome, String senha, String email, String telefone) {
		super();
		this.nome = nome;
		this.senha = senha;
		this.email = email;
		this.avaliacao = 0.0;
		this.telefone = telefone;
		this.termos_de_uso = true;
		this.ativo = true;
	}


	@Override
	public int hashCode() {
		return Objects.hash(idUsuario);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		return Objects.equals(idUsuario, other.idUsuario);
	}

}
