package com.inqhome.administrador;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inqhome.administrador.CriarAdministradorDTO;
import com.inqhome.administrador.Administrador;
import com.inqhome.administrador.AdministradorRepository;

@Service
public class AdministradorService implements Serializable {
	private static final long serialVersionUID = 1L;

	@Autowired
	private AdministradorRepository pessoaRepository;

	public List<Administrador> buscarAdministrador() {
		return pessoaRepository.findAll();
	}

	public Administrador buscarAdministradorPeloId(Long id) {
		return pessoaRepository.findById(id).orElseThrow(() -> new RuntimeException());
	}

	public Administrador salvarAdministrador(CriarAdministradorDTO dados) {
		Administrador administrador = new Administrador(dados.getLogin(), dados.getSenha(), dados.getEmail());
		return pessoaRepository.save(administrador);
	}

	public void deletarAdministradorPeloId(Long id) {
		Administrador administrador = buscarAdministradorPeloId(id);
		pessoaRepository.delete(administrador);
	}

	public Administrador atualizarAdministrador(Long id, CriarAdministradorDTO dados) {
		Administrador administrador = buscarAdministradorPeloId(id);
		administrador.setLogin(dados.getLogin());
		administrador.setEmail(dados.getEmail());
		return pessoaRepository.save(administrador);
	}
}