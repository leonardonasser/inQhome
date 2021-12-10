package com.inqhome.usuario;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findUsuarioByEmail(String email);
    

    Optional<Usuario> findUsuarioByIdUsuario(Long id);

}
