package com.inqhome.mensagem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inqhome.contato.Contato;
import com.inqhome.contato.ContatoService;
import com.inqhome.inquilino.IdentificarInqDTO;
import com.inqhome.inquilino.Inquilino;
import com.inqhome.inquilino.InquilinoService;
import com.inqhome.usuario.Usuario;
import com.inqhome.usuario.UsuarioService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class MensagemService {

    @Autowired
    private MensagemRepository mensagemRepository;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private ContatoService contatoService;
    

    public List<Mensagem> buscarMensagens(Long idUsuario1, Long idUsuario2) {
        
        Usuario usuario1 = usuarioService.buscarUsuarioPeloId(idUsuario1);
        Usuario usuario2 = usuarioService.buscarUsuarioPeloId(idUsuario2);
        
        Contato contato = contatoService.buscarContatoUsuarioResponsavelAndUsuarioRecebe(usuario1, usuario2);
        Contato contato2 = contatoService.buscarContatoUsuarioResponsavelAndUsuarioRecebe(usuario2, usuario1);
        
        List<Mensagem> lista1 = mensagemRepository.
                findByContato(contato);
        
        List<Mensagem> lista2 = mensagemRepository.
                findByContato(contato2);
        
        List<Mensagem> mensagens = Stream.concat(lista1.stream(), lista2.stream()).collect(Collectors.toList());
        Collections.sort(mensagens, Comparator.comparing(Mensagem::getDataHora));
        
        return mensagens;
    }    

    public Mensagem buscarNotificao(Long id) {
        return mensagemRepository.findById(id).get();
    }

    public Mensagem criar(CriarMensagemDTO dados) {
        
        Usuario usuarioEnvia = usuarioService.buscarUsuarioPeloId(dados.getUsuarioEnvia());
        Usuario usuarioRecebe = usuarioService.buscarUsuarioPeloId(dados.getUsuarioRecebe());
        
        Contato contato = contatoService.buscarContatoUsuarioResponsavelAndUsuarioRecebe(usuarioEnvia, usuarioRecebe);
        if(contato == null) {
            contato = contatoService.criar(usuarioEnvia, usuarioRecebe);
        }
        
        Mensagem mensagem = new Mensagem(dados.getDescricao(), dados.isMsgProposta(), contato);
        
        return mensagemRepository.save(mensagem);
    }

    public void deletar(Long idNotificao) {
        mensagemRepository.deleteById(idNotificao);
    }
}
