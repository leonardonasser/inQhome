
create table usuarios
(
    id BIGINT NOT NULL,
    tipo_usuario varchar(20) NOT NULL,
    login varchar(20) NOT NULL,
    nome varchar(220) NOT NULL,
    senha varchar(255) NOT NULL,
    situacao varchar(20) NOT NULL,
  	PRIMARY KEY (id)
);
