package br.com.thinkproject.domain.usuario;

import br.com.thinkproject.infra.exceptions.ValidationException;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional
public class UsuarioService {

    @Inject
    UsuarioRepository repo;

    public Optional<Usuario> recuperarPorId(long idUsuario) {
        return repo.findByIdOptional(idUsuario);
    }

    public Usuario recuperarPorIdOrThrow(long idUsuario) {
        return recuperarPorId(idUsuario).orElseThrow(() -> new ValidationException("Usuario não encontrado"));
    }

    public Optional<Usuario> recuperarPorLogin(String login) {
        return repo.findByLogin(login);
    }

    public Usuario recuperarPorLoginOrThrow(String login) {
        return recuperarPorLogin(login).orElseThrow(() -> new ValidationException("Usuário não encontrado!"));
    }

    public List<Usuario> listarUsuarios(UsuarioFilter filtro) {
        List<Usuario> usuarios = repo.listByFilter(filtro);
        return usuarios;
    }

    public List<Usuario> recuperarPorStatus(Role tipo) {
        List<Usuario> usuarios = repo.findByStatus(tipo);
        return usuarios;
    }

    private Usuario salvar(Usuario usuario) {
        return repo.save(usuario);
    }

    public Usuario alterarSenha(String login, String novaSenha) {
        Usuario usuario = recuperarPorLoginOrThrow(login);
        usuario.setSenha(Password.of(novaSenha));
        if (usuario.getUltimoLogin() == null) {
            this.atualizarDataLogin(usuario);
        }
        return salvar(usuario);
    }

    public Usuario criar(CriarUsuarioDTO criarUsuario) {

        
        Usuario usuario = new Usuario(criarUsuario.getNome(),
                criarUsuario.getLogin(), Password.of(criarUsuario.getSenha()),
                criarUsuario.getTipoUsuario(), criarUsuario.getStatusUsuario());

        return salvar(usuario);
    }

    public Usuario atualizar(Long idUsuario, AtualizarUsuarioDTO dados) {
        Usuario usuario = recuperarPorIdOrThrow(idUsuario);

        usuario.setNome(dados.getNome());
        usuario.setLogin(dados.getLogin());
        usuario.setTipoUsuario(dados.getTipoUsuario());
        usuario.setStatusUsuario(dados.getStatusUsuario());
        return salvar(usuario);
    }

    public Usuario atualizarDataLogin(Usuario usuario) {
        usuario.setUltimoLogin(Calendar.getInstance().getTime());
        return salvar(usuario);
    }

    public void remover(Long idUsuario) {
        Usuario usuario = recuperarPorIdOrThrow(idUsuario);
        repo.delete(usuario);
    }

}
