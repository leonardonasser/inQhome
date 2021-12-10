package com.inqhome.contato;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/mobile/contato")
public class ContatoResource {

    @Autowired
    private ContatoService contatoService;


    @GetMapping("/{idUsuario}")
    private List<Contato> listarContatos(@PathVariable Long idUsuario){
        return contatoService.buscarContatos(idUsuario);
    }
    
 //   @GetMapping("/listar")
   // private List<Contato> listarContatos(){
    //    return contatoService.buscarContatos();
    //}
    
   // @PostMapping
  //  private Contato criar(@RequestBody CriarContatoDTO contato) {
   //     System.out.println(contato);
  //      return contatoService.criar(contato);
   // }
    
    @DeleteMapping("/{id}")
    private void deletar(@PathVariable Long id){
         contatoService.deletar(id);
    }
}