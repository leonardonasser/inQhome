package com.inqhome.usuario;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements Serializable {
	private static final long serialVersionUID = 1L;

	@Autowired
	private UsuarioRepository pessoaRepository;

	public List<Usuario> buscarUsuarios() {
		return pessoaRepository.findAll();
	}

	public Usuario buscarUsuarioPeloId(Long id) {
		return pessoaRepository.findById(id).orElseThrow(() -> new RuntimeException());
	}

	public Usuario salvarUsuario(CriarUsuarioDTO dados) {
		Usuario usuario = new Usuario(dados.getNome(), dados.getSenha(), dados.getEmail());
		return pessoaRepository.save(usuario);
	}

	public void deletarUsuarioPeloId(Long id) {
		Usuario usuario = buscarUsuarioPeloId(id);
		pessoaRepository.delete(usuario);
	}

	public Usuario atualizarUsuario(Long id, CriarUsuarioDTO dados) {
		Usuario usuario = buscarUsuarioPeloId(id);
		usuario.setNome(dados.getNome());
		usuario.setEmail(dados.getEmail());
		return pessoaRepository.save(usuario);
	}
}
