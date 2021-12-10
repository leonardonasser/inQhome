package com.inqhome.despesa;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.*;

import com.inqhome.casa.Casa;

import lombok.Data;

@Entity
@Table (name = "despesa")
@Data
public class Despesa {
   
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long idDespesa;
	private String titulo;
	@OneToOne
	@JoinColumn(name = "id_casa")
	private Casa casa;
	private double valor;
	private Date dataAtribuida;
	private Date dataValidade;
  
   public Despesa(String titulo, Casa casa, double valor, Date dataValidade) {
	super();
	this.titulo = titulo;
	this.casa = casa;
	this.valor = valor;
	this.dataAtribuida = Calendar.getInstance().getTime();
	this.dataValidade = dataValidade;
   }

	public Despesa() {

	}
}
