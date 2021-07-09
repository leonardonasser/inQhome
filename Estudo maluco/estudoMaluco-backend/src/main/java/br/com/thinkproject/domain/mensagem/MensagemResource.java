package br.com.thinkproject.domain.mensagem;

import br.com.thinkproject.domain.usuario.Role;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/painel/mensagens")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
@Transactional
//@Tag(name = "Usuarios Painel")
@RolesAllowed(Role.ADMIN_ROLE)
public class MensagemResource {

    @Inject
    MensagemService mensagemService;
    
    @GET
    public List<MensagemDTO> listar(@BeanParam @Valid MensagemFilter filtro) {
        List<Mensagem> mensagens = mensagemService.listarMensagens(filtro);
        return MensagemDTO.ofEntities(mensagens);
    }
    
    @POST
    public MensagemDTO criar(@Valid CriarMensagemDTO dados) {
        Mensagem mensagem = mensagemService.criar(dados);
        return MensagemDTO.ofEntity(mensagem);
    }

}
