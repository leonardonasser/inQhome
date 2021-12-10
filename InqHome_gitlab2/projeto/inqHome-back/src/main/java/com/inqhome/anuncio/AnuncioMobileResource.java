package com.inqhome.anuncio;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/mobile/anuncio")
public class AnuncioMobileResource implements Serializable {
    private static final Long serialVersionUID = 1L;

    @Autowired
    AnuncioService anuncioService;

    @PostMapping
    public Anuncio CadastrarAnuncio(@RequestBody CadastrarAnuncioDTO dados) {
        System.out.println(dados);
        return anuncioService.cadastrarAnuncio(dados);
    }

    @GetMapping
    public List<Anuncio> listarAnuncio(){
        return anuncioService.buscarAnuncios();
    }



}