package br.com.thinkproject.domain.auth;

import br.com.thinkproject.domain.usuario.CriarUsuarioDTO;
import br.com.thinkproject.domain.usuario.Usuario;
import javax.annotation.security.PermitAll;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
//import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
@Transactional
@PermitAll
//@Tag(name = "Auth")
public class AuthResource {

    @Inject
    AuthService authService;

    @POST
    @Path("/login")
    public AuthResponse login(@Valid AuthRequest authRequest) {
        return authService.autenticar(authRequest.getLogin(), authRequest.getSenha());
    }

    @POST
    @Path("/reset-senha")
    public void pedidoResetarSenha(@Valid PedidoResetSenha pedidoResetSenha) {
        authService.resetarSenha(pedidoResetSenha.getEmail());
    }

    @POST
    @Path("/senha")
    public AuthResponse atualizarSenha(@Valid AtualizacaoSenha atualizacaoSenha) {
        return authService.atualizarSenha(atualizacaoSenha.getToken(), atualizacaoSenha.getNovaSenha());
    }

    @POST
    @Path("/cadastrar")
    public Usuario cadastrar(@Valid CriarUsuarioDTO auth) {
        return authService.cadastrar(auth);
    }

}
