package com.inqhome.usuario;

import java.io.Serializable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inqhome.config.SecurityConfig;
import com.inqhome.infra.exceptions.ValidationException;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository pessoaRepository;
	
	@Autowired
    private SecurityConfig sc;

	public List<Usuario> buscarUsuarios() {
		return pessoaRepository.findAll();
	}

	public Usuario buscarUsuarioPeloId(Long id) {
		return pessoaRepository.findUsuarioByIdUsuario(id).orElseThrow(() -> new RuntimeException());
	}
	
    public Usuario buscarUsuarioPeloEmail(String email) {
        return pessoaRepository.findUsuarioByEmail(email).orElseThrow(() -> new ValidationException("Email invalido"));
    }	

	public Usuario salvarUsuario(CriarUsuarioDTO dados) {
		Usuario usuario = new Usuario(dados.getNome(), sc.bCryptPasswordEncoder().encode(dados.getSenha()), dados.getEmail(), dados.getTelefone());
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
		usuario.setAtivo(dados.isAtivo());
		return pessoaRepository.save(usuario);
	}
}
