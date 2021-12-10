package com.inqhome.anuncio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnuncioRepository extends JpaRepository<Anuncio, Long>{
    List<Anuncio> findAll();
}
