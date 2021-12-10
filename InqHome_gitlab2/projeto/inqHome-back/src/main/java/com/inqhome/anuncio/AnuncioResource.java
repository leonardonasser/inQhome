package com.inqhome.anuncio;

import java.io.Serializable;
import java.util.List;

import com.inqhome.despesa.CriarDespesaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/anuncio")
public class AnuncioResource implements Serializable {
    private static final Long serialVersionUID = 1L;

    @Autowired
    AnuncioService anuncioService;

    @PostMapping
    public Anuncio registrarAnuncio(CriarAnuncioDTO dados) {
        return anuncioService.criar(dados);
    }

    @GetMapping
    public List<Anuncio> listarAnuncio(){
        return anuncioService.buscarAnuncios();
    }

    @GetMapping("{id}")
    public Anuncio listarAnuncio(@PathVariable("id")  Long id){
        return anuncioService.buscarAnuncio(id);
    }

    @DeleteMapping("{id}")
    public void deleteAnuncio(@PathVariable("id") Long id){
       // anuncioService.
    }

}
