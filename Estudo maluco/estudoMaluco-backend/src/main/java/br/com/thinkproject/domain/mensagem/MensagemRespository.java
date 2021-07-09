package br.com.thinkproject.domain.mensagem;

import br.com.thinkproject.infra.persistence.BaseRepository;

import io.quarkus.panache.common.Sort;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional
public class MensagemRespository extends BaseRepository<Mensagem> {

    public List<Mensagem> listagemDeMensagem(MensagemFilter filtro) {
        List<Mensagem> lista1 = list("usuarioCria.id = ?1 and usuarioRecebe.id = ?2", 
                Sort.by("dataHora"), filtro.getUsuario1(), filtro.getUsuario2());
      
        List<Mensagem> lista2 = list("usuarioCria.id = ?1 and usuarioRecebe.id = ?2", 
                Sort.by("dataHora"),filtro.getUsuario2(), filtro.getUsuario1());
         
        
        List<Mensagem> mensagens = Stream.concat(lista1.stream(), lista2.stream()).collect(Collectors.toList());
        Collections.sort(mensagens, Comparator.comparing(Mensagem :: getDataHora));
         
        return mensagens; 
    }
}
