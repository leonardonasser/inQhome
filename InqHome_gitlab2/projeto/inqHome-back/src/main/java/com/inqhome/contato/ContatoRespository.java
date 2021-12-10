package com.inqhome.contato;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.inqhome.usuario.Usuario;

@Repository
public interface ContatoRespository extends JpaRepository<Contato, Long> {
    
    List<Contato> findByUsuarioResponsavel(Usuario usuario);
    
    List<Contato> findByUsuarioRecebe(Usuario usuario);
    
    Contato findByUsuarioResponsavelAndUsuarioRecebe(Usuario idUsuarioEnvia, Usuario idUsuarioRecebe);

}