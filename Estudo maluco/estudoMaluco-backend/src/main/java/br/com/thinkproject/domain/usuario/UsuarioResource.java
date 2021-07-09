package br.com.thinkproject.domain.usuario;

import br.com.thinkproject.infra.exceptions.ValidationException;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/painel/usuarios")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
@Transactional
//@Tag(name = "Usuarios Painel")
@RolesAllowed(Role.ADMIN_ROLE)
public class UsuarioResource {

    @Inject
    UsuarioService usuarioService;

    @GET
    public List<UsuarioDTO> listar(@BeanParam @Valid UsuarioFilter filtro) {
        List<Usuario> usuarios = usuarioService.listarUsuarios(filtro);
        return UsuarioDTO.ofEntities(usuarios);
    }

    @GET
    @Path("/{id}")
    public UsuarioDTO get(@PathParam("id") Long idUsuario) {
        return usuarioService.recuperarPorId(idUsuario).map(UsuarioDTO::ofEntity)
                .orElseThrow(() -> new ValidationException("Não foi encontrado o usuario"));
    }

    @POST
    public UsuarioDTO criar(@Valid CriarUsuarioDTO dados) {
        Usuario usuario = usuarioService.criar(dados);
        return UsuarioDTO.ofEntity(usuario);
    }

    @PUT
    @Path("/{id}")
    public UsuarioDTO atualizar(@PathParam("id") long idUsuario, @Valid AtualizarUsuarioDTO dados) {
        Usuario usuario = usuarioService.atualizar(idUsuario, dados);
        return UsuarioDTO.ofEntity(usuario);
    }

    @DELETE
    @Path("/{id}")
    public void remover(@PathParam("id") Long idUsuario) {
        usuarioService.remover(idUsuario);
    }

}
