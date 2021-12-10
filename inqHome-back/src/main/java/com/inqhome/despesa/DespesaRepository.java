package com.inqhome.despesa;

import com.inqhome.casa.Casa;
import com.inqhome.inquilino.Inquilino;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    List<Despesa> findDespesaByCasa(Casa casa);

}
