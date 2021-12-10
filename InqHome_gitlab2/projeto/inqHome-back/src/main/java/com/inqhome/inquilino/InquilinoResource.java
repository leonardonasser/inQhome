package com.inqhome.inquilino;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type")
@RequestMapping(value = "/api/inquilino")
public class InquilinoResource {

    @Autowired
    private InquilinoService inquilinoService;

    @GetMapping
    public List<Inquilino> buscarTodos() {
        return inquilinoService.buscarInquilinos();
    }

    @GetMapping("/{id}")
    public Inquilino buscarPeloId(@PathVariable Long id) {
        return inquilinoService.buscarInquilinoPeloId(id);
    }
    
    @PostMapping
    public Inquilino salvarInquilino(@RequestBody CriarInquilinoDTO inquilino) {
        return inquilinoService.salvarInquilino(inquilino);
    }

    @DeleteMapping("/{id}")
    public void deletarPeloid(@PathVariable Long id) {
        inquilinoService.deletarInquilinoPeloId(id);
    }

    @PutMapping("/{id}")
    public Inquilino atualizarInquilino(@PathVariable Long id, CriarInquilinoDTO inquilino) {
        return inquilinoService.atualizarInquilino(id, inquilino);
    }

}
