package com.inqhome.inquilino;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.inqhome.usuario.Usuario;

@Repository
public interface InquilinoRepository extends JpaRepository<Inquilino, Long> {

    Inquilino findInquilinoByUsuarioInquilino(Usuario usuarioInquilino);

}
