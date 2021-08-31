package com.inqhome.usuario;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tb_usuario")
public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nome;
	private String senha;
	private String email;
	private String img;
	private double avaliacao;
	private boolean termos_de_uso;
	private boolean ativo;

	public Usuario() {
	}

	public Usuario(String nome, String senha, String email) {
		super();
		this.nome = nome;
		this.senha = senha;
		this.email = email;
		this.avaliacao = 0.0;
		this.termos_de_uso = true;
		this.ativo = true;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public double getAvaliacao() {
		return avaliacao;
	}

	public void setAvaliacao(double avaliacao) {
		this.avaliacao = avaliacao;
	}

	public boolean getTermos_de_uso() {
		return termos_de_uso;
	}

	public void setTermos_de_uso(boolean termos_de_uso) {
		this.termos_de_uso = termos_de_uso;
	}

	public boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

	public Long getId() {
		return id;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
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
		return Objects.equals(id, other.id);
	}

}
