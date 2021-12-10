package com.inqhome.despesa;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/mobile/despesas")
public class DespesaResource {

    @Autowired
    private DespesaService despesaService;

    
    @GetMapping
    public List<Despesa> buscarTodos() {
        return despesaService.buscarDespesas();
    }
    
    @GetMapping("/casa/{id}")
    public List<Despesa> listarPorCasa(@PathVariable Long id) {
        return despesaService.listarPorCasa(id);
    }

    @GetMapping("/{id}")
    public Despesa buscarPeloId(@PathVariable Long id) {
        return despesaService.buscarDespesaPeloId(id);
    }

    @PostMapping
    public Despesa salvarDespesa(@RequestBody CriarDespesaDTO despesa) {
        return despesaService.salvarDespesa(despesa);
    }

    @DeleteMapping("/{id}")
    public void deletarPeloid(@PathVariable Long id) {
        despesaService.deletarDespesaPeloId(id);
    }

    @PutMapping("/{id}")
    public Despesa atualizarDespesa(@PathVariable Long id,@RequestBody CriarDespesaDTO despesa) {
        return despesaService.atualizarDespesa(id, despesa);
    }
    
}
