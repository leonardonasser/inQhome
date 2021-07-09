-- Departamentos
INSERT INTO departamentos
(`id`,`nome`)
VALUES (1, 'Departamento1');

-- Setores
INSERT INTO departamento_setores
(`id`,`id_departamento`, `nome`)
VALUES (1, 1, 'Setor1');

-- Cargo
INSERT INTO cargos (id, nome, id_setor, nivel_hierarquico)
VALUES (1, 'teste', 1, 'TATICO');

-- Pessoa
INSERT INTO pessoas (id, nome, cpf, email_primario, email_secundario, data_hora_solicitacao, situacao, telefone_pessoal, ramal, id_cargo,data_hora_validacao)
VALUES (1, 'Administrador', '1111111111111', 'adm@adm.com', 'adm@adm2.com', '2021-06-17 09:22:00', 'APROVADO','30305555','1042',1,'2021-06-18 13:06:00');

-- Pessoa Teste Para Aprovar
INSERT INTO pessoas (id, nome, cpf, email_primario, email_secundario, data_hora_solicitacao, situacao)
VALUES (2, 'TesteAprovar', '2222222222222', 'teste@teste.com', 'teste@teste2.com', '2021-06-17 09:22:00', 'APROVAR');


-- Usuários
-- Senha padrão: 123456
INSERT INTO usuarios (id, id_pessoa, tipo_usuario, login, senha, situacao, criado_em, ultimo_login)
VALUES (1, 1, 'ADMINISTRADOR', 'admin', '$2a$12$SVfIwVMosGRAkXd2.QHD/eBkxEfB7CjkvjXwv/qsiZsphGiJeBRGu', 'ATIVO', '2021-06-17 09:23:00','2021-06-17 09:23:00');


