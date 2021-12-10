package br.com.thinkproject.infra.persistence;

import java.util.Objects;

public abstract class BaseEntity<T> {

    public abstract Long getId();

    public boolean equalsById(BaseEntity<T> other) {
        return Objects.equals(getId(), other.getId());
    }

    public boolean notEqualsById(BaseEntity<T> other) {
        return !Objects.equals(getId(), other.getId());
    }

}
