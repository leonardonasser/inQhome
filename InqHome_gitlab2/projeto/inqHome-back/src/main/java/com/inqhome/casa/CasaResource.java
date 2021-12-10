package com.inqhome.casa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/casa")
public class CasaResource {

    @Autowired
    private CasaService casaService;

    @GetMapping
    public List<Casa> buscarTodos() {
        return casaService.buscarCasas();
    }

    @GetMapping("/{id}")
    public Casa buscarPeloId(@PathVariable Long id) {
        return casaService.buscarCasaPeloId(id);
    }

    @PostMapping
    public Casa salvarCasa(@RequestBody CriarCasaDTO casa) {
        return casaService.salvarCasa(casa);
    }

    @DeleteMapping("/{id}")
    public void deletarPeloid(@PathVariable Long id) {
        casaService.deletarCasaPeloId(id);
    }

    @PutMapping("/{id}")
    public Casa atualizarCasa(@PathVariable Long id, @RequestBody CriarCasaDTO casa) {
        return casaService.atualizarCasa(id, casa);
    }
}
