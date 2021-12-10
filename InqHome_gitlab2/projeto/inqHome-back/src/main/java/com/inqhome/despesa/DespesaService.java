package com.inqhome.despesa;

import com.inqhome.casa.Casa;
import com.inqhome.casa.CasaService;
import com.inqhome.despesa.CriarDespesaDTO;
import com.inqhome.despesa.Despesa;
import com.inqhome.despesa.DespesaRepository;
import com.inqhome.usuario.Usuario;
import com.inqhome.usuario.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

@Service
public class DespesaService implements Serializable {
    private static final Long serialVersionUID = 1L;

    @Autowired
    private DespesaRepository despesaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CasaService casaservice;

    public List<Despesa> buscarDespesas() {
        return despesaRepository.findAll();
    }
    
    public List<Despesa> listarPorCasa(Long casaId) {
        Casa casa = casaservice.buscarCasaPeloId(casaId);
        return despesaRepository.findDespesaByCasa(casa);
    }

    public Despesa buscarDespesaPeloId(Long id) {
        return despesaRepository.findById(id).orElseThrow(() -> new RuntimeException());
    }

    public Despesa salvarDespesa(CriarDespesaDTO dados) {
        Casa casa = casaservice.buscarCasaPeloId(dados.getCasaId());

        Despesa despesa = new Despesa(dados.getTitulo(),casa, dados.getValor() , dados.getDataValidade());
        return despesaRepository.save(despesa);
    }

    public void deletarDespesaPeloId(Long id) {
        Despesa despesa = buscarDespesaPeloId(id);
        despesaRepository.delete(despesa);
    }

    public Despesa atualizarDespesa(Long id, CriarDespesaDTO dados) {
        Despesa despesa = buscarDespesaPeloId(id);

        despesa.setTitulo(dados.getTitulo());
        despesa.setDataValidade(dados.getDataValidade());
        despesa.setValor(dados.getValor());
        return despesaRepository.save(despesa);
    }
}
