package br.com.thinkproject.infra.persistence;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Sort;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public abstract class BaseRepository<T extends BaseEntity<T>> implements PanacheRepository<T> {

    @PersistenceContext
    protected EntityManager entityManager;

    public T save(T entity) {
        if (entity.getId() == null) {
            persist(entity);
            return entity;
        }

        return entityManager.merge(entity);
    }

    protected static String match(String param) {
        return param != null ? "%" + param.toLowerCase() + "%" : null;
    }

    public PanacheQuery<T> findLike(String column, String param) {
        String query = column + " like ?1";
        return find(query, match(param));
    }

    public PanacheQuery<T> findLike(String column, Sort sort, String param) {
        String query = column + " like ?1";
        return find(query, sort, match(param));
    }

    public T merge(T entity) {
        entityManager.merge(entity);
        return entity;
    }
}
