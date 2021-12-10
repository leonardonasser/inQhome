package com.inqhome.casa;

import com.inqhome.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CasaRepository extends JpaRepository<Casa, Long> {

    Casa findCasaByUsuarioResponsavel(Usuario usuarioResponsavel);

}
