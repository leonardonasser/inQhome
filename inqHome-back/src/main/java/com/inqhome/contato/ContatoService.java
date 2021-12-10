package com.inqhome.contato;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inqhome.usuario.Usuario;
import com.inqhome.usuario.UsuarioService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class ContatoService {

    @Autowired
    private ContatoRespository contatoRepository;
    
    @Autowired
    private UsuarioService usuarioService;

    public List<Contato> buscarContatos(Long idUsuario) {
        Usuario usuario1 = usuarioService.buscarUsuarioPeloId(idUsuario);
        List<Contato> contatos = contatoRepository.findByUsuarioRecebe(usuario1);        
        Collections.sort(contatos, Comparator.comparing(Contato::getDataHora));
        
        return contatos;
    }
    

    public Contato buscarNotificao(Long id) {
        return contatoRepository.findById(id).get();
    }
    
    public Contato buscarContatoUsuarioResponsavelAndUsuarioRecebe(Usuario idUsuarioEnvia, Usuario idUsuarioRecebe) {
        return contatoRepository.findByUsuarioResponsavelAndUsuarioRecebe(idUsuarioEnvia, idUsuarioRecebe);
    }   
    
    public List<Contato> buscarByUsuarioResponsavel(Usuario idUsuarioResponsavel) {
        return contatoRepository.findByUsuarioResponsavel(idUsuarioResponsavel);
    } 

    public Contato criar(Usuario responsavel, Usuario recebe) {
        
        Contato contato = new Contato(responsavel, recebe);
        
        return contatoRepository.save(contato);
    }

    public void deletar(Long idNotificao) {
        contatoRepository.deleteById(idNotificao);
    }
}
