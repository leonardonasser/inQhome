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
	private static final Long serialVersionUID = 1L;

	@Autowired
	private AdministradorRepository administradorRepository;

	public List<Administrador> buscarAdministrador() {
		return administradorRepository.findAll();
	}

	public Administrador buscarAdministradorPeloId(Long id) {
		return administradorRepository.findById(id).orElseThrow(() -> new RuntimeException());
	}

	public Administrador salvarAdministrador(CriarAdministradorDTO dados) {
		Administrador administrador = new Administrador(dados.getLogin(), dados.getSenha(), dados.getEmail());
		return administradorRepository.save(administrador);
	}

	public void deletarAdministradorPeloId(Long id) {
		Administrador administrador = buscarAdministradorPeloId(id);
		administradorRepository.delete(administrador);
	}

	public Administrador atualizarAdministrador(Long id, CriarAdministradorDTO dados) {
		Administrador administrador = buscarAdministradorPeloId(id);
		administrador.setLogin(dados.getLogin());
		administrador.setEmail(dados.getEmail());
		return administradorRepository.save(administrador);
	}
}