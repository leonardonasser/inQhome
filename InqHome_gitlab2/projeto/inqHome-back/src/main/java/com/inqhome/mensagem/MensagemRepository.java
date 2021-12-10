package com.inqhome.mensagem;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inqhome.contato.Contato;
import com.inqhome.usuario.Usuario;

@Repository
public interface MensagemRepository extends JpaRepository<Mensagem,Long> {
    
    List<Mensagem> findByContato(Contato contato);
        
   // List<Mensagem> findByUsuarioRecebe(Usuario idUsuario);
}
