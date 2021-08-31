package com.inqhome.despesas;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.inqhome.casa.Casa;

public class Despesa {
   @Id
   @GeneratedValue(strategy=GenerationType.IDENTITY)
   private long id;
  
   public Despesa(String titulo, Casa casa, double valor, Date dataAtribuida, Date dataValidade) {
	super();
	this.titulo = titulo;
	this.casa = casa;
	this.valor = valor;
	this.dataAtribuida = dataAtribuida;
	this.dataValidade = dataValidade;
   }
   
private String titulo;
   private Casa casa;
   private double valor;
   private Date dataAtribuida;
   private Date dataValidade;
   
   
public String getTitulo() {
	return titulo;
}
public void setTitulo(String titulo) {
	this.titulo = titulo;
}
public double getValor() {
	return valor;
}
public void setValor(double valor) {
	this.valor = valor;
}
public Casa getCasa() {
	return casa;
}
public Date getDataAtribuida() {
	return dataAtribuida;
}
public Date getDataValidade() {
	return dataValidade;
}
   
   
   
   
}
