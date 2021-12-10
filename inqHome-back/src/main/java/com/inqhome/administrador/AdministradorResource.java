package com.inqhome.administrador;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inqhome.administrador.CriarAdministradorDTO;
import com.inqhome.administrador.Administrador;

@RestController
@RequestMapping("/api/administrador")
public class AdministradorResource implements Serializable {
	private static final Long serialVersionUID = 1L;
	
	@Autowired
	private AdministradorService administradorService;
	
	@GetMapping
	public List<Administrador> buscarTodos() {
		return administradorService.buscarAdministrador();
	}
	@GetMapping("/{id}")
	public Administrador buscarPeloId(@PathVariable Long id) {
		return administradorService.buscarAdministradorPeloId(id);
	}

	@PostMapping
	public Administrador salvaradministrador(@RequestBody CriarAdministradorDTO administrador) {
		return administradorService.salvarAdministrador(administrador);
	}

	@DeleteMapping("/{id}")
	public void deletarPeloid(@PathVariable Long id) {
		administradorService.deletarAdministradorPeloId(id);
	}

	@PutMapping("/{id}")
	public Administrador atualizaradministrador(@PathVariable Long id, CriarAdministradorDTO administrador) {
		return administradorService.atualizarAdministrador(id, administrador);
	}

}
