package com.inqhome.inqhome.usuario;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inhome/usuario")
public class UsuarioResource implements Serializable {
	private static final long serialVersionUID = 1L;

	@Autowired
	private UsuarioService usuarioService;

	@GetMapping
	public List<Usuario> buscarTodos() {
		return usuarioService.buscarUsuarios();
	}

	@GetMapping("/{id}")
	public Usuario buscarPeloId(@PathVariable Long id) {
		return usuarioService.buscarUsuarioPeloId(id);
	}

	@PostMapping
	public Usuario salvarUsuario(@RequestBody CriarUsuarioDTO usuario) {
		return usuarioService.salvarUsuario(usuario);
	}

	@DeleteMapping("/{id}")
	public void deletarPeloid(@PathVariable Long id) {
		usuarioService.deletarUsuarioPeloId(id);
	}

	@PutMapping("/{id}")
	public Usuario atualizarUsuario(@PathVariable Long id, CriarUsuarioDTO usuario) {
		return usuarioService.atualizarUsuario(id, usuario);
	}
}
