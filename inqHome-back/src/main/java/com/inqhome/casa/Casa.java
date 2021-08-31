package com.inqhome.casa;

import static org.assertj.core.api.Assertions.assertThatIllegalStateException;

import java.util.ArrayList;

import javax.annotation.Generated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.inqhome.usuario.Usuario;
import com.inqhome.usuario.UsuarioService;

public class Casa {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
    private Usuario usuarioResponsavel;
    private long valorAluguel;
    
     
    
    
    public Casa(Usuario usuarioResponsavel,long valorAluguel) {
    this.usuarioResponsavel = usuarioResponsavel;
    this.valorAluguel = valorAluguel;
    }
    
	
	public Usuario getUsuarioResponsavel() {
		return usuarioResponsavel;
	}
	
	public void setUsuarioResponsavel(Usuario usuarioResponsavel) {
		this.usuarioResponsavel = usuarioResponsavel;
	}
	
	public long getValorAluguel() {
		return valorAluguel;
	}
	
	public void setValorAluguel(long valorAluguel) {
		this.valorAluguel = valorAluguel;
	}
    
    
    
}
