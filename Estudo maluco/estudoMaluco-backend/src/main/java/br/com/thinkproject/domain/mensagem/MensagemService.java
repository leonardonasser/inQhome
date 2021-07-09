package br.com.thinkproject.domain.mensagem;

import br.com.thinkproject.domain.usuario.Usuario;
import br.com.thinkproject.domain.usuario.UsuarioService;

import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional
public class MensagemService {

    @Inject
    private MensagemRespository repo;
    
    @Inject
    private UsuarioService usuarioService;
    
    public List<Mensagem> listarMensagens(MensagemFilter filtro) {
        List<Mensagem> mensagens = repo.listagemDeMensagem(filtro);
        return mensagens;
    }

    private Mensagem salvar(Mensagem mensagem) {
        return repo.save(mensagem);
    }

    public Mensagem criar(CriarMensagemDTO dados) {

        Usuario usuarioCria = usuarioService.recuperarPorIdOrThrow(dados.getUsuarioCriaId());
        Usuario usuarioRecebe = usuarioService.recuperarPorIdOrThrow(dados.getUsuarioRecebeId());
        
        Long num = repo.listAll().size() + 1L;
        
        Mensagem mensagem = new Mensagem(num, usuarioCria,usuarioRecebe, dados.getTexto());

        return salvar(mensagem);
    }
    
}
