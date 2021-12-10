package br.com.thinkproject.domain.usuario;

import br.com.thinkproject.infra.persistence.BaseRepository;
import java.util.List;
import java.util.Optional;
import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional
public class UsuarioRepository extends BaseRepository<Usuario> {

    public Optional<Usuario> findByLogin(String login) {
        return find("login", login).singleResultOptional();
    }

    public List<Usuario> findByStatus(Role tipo) {
        return entityManager
                .createQuery("select u from Usuario u " + "where ((:tipo is null or lower(u.role) like :tipo)) ",
                        Usuario.class)
                .setParameter("tipo", tipo).getResultList();
    }

    public List<Usuario> listByFilter(UsuarioFilter filtro) {
        return entityManager
                .createQuery(
                        "select u from Usuario u " + "where ((:search is null or lower(u.nome) like :search))",
                        Usuario.class)
                .setParameter("search", match(filtro.getSearch())).getResultList();
    }

}
