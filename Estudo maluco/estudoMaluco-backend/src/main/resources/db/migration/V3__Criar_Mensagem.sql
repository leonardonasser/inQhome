
create table mensagens
(
    id BIGINT NOT NULL ,
    usuario_cria_id BIGINT NOT NULL,
    usuario_recebe_id BIGINT NOT NULL,
    data_hora timestamp NOT NULL,
    texto varchar(1000) NOT NULL,
    lido BIT NOT NULL,
  	PRIMARY KEY (id),
  	
  	FOREIGN KEY(usuario_cria_id) REFERENCES usuarios (id)
  	 ON DELETE RESTRICT ON UPDATE RESTRICT,
  	 
  	FOREIGN KEY(usuario_recebe_id) REFERENCES usuarios (id)
  	 ON DELETE RESTRICT ON UPDATE RESTRICT
);
