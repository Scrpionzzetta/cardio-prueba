create database cardio;
use cardio;

create table users(
id_users int(45) primary key auto_increment,
nombres varchar(45) not null,
apellidos varchar(45) not null,
rut varchar(12) not null unique,
pass varchar(60) not null,
email varchar(60) not null unique,
numero_telefonico varchar(12) not null unique,
direccion varchar(45) not null,
id_profesion int(2) not null,
id_establecimiento int(2) not null,
foreign key (id_profesion) references profesion(id_profesion),
foreign key (id_establecimiento) references establecimiento(id_establecimiento)
);

drop table users;

insert into users(nombres ,apellidos, rut, pass, email, numero_telefonico, direccion, id_profesion, id_establecimiento) 
values('daniel', 'scarlazzetta', '18.360-2', 'asd', 'asd@asd.com', '12345678','casa 123', 24, 6);

select * from users;


create table profesion(
id_profesion int(2) not null primary key auto_increment,
nombre_profesion varchar(30) not null unique
);


insert into profesion(nombre_profesion) values('MEDICO');
insert into profesion(nombre_profesion) values('ENFERMARA(O)');
insert into profesion(nombre_profesion) values('PSCICOLOGO');
insert into profesion(nombre_profesion) values('KINESIOLOGO');
insert into profesion(nombre_profesion) values('NUTRICIONISTA');
insert into profesion(nombre_profesion) values('ODONTOLOGO');
insert into profesion(nombre_profesion) values('MATRON(A');
insert into profesion(nombre_profesion) values('ASISTENTE SOCIAL');
insert into profesion(nombre_profesion) values('TECNOLOGO MEDICO');
insert into profesion(nombre_profesion) values('PROFESIONES NO FORMALES');
insert into profesion(nombre_profesion) values('TERAPEUTA OCUPACIONAL');
insert into profesion(nombre_profesion) values('TECNICO ENFERMERIA N. S');
insert into profesion(nombre_profesion) values('LABORATISTA DENTAL');
insert into profesion(nombre_profesion) values('TECNICOS EN SALUD');
insert into profesion(nombre_profesion) values('QUIMICO FARMACEUTICO');
insert into profesion(nombre_profesion) values('PROFESOR DE EDUCACION FISICA');
insert into profesion(nombre_profesion) values('EDUCADORA DE PARVULOS');
insert into profesion(nombre_profesion) values('ASISTENTE DE PARVULO');
insert into profesion(nombre_profesion) values('PODOLOGO(A)');
insert into profesion(nombre_profesion) values('ASISTENTE TECNICO DENTAL');
insert into profesion(nombre_profesion) values('FONOAUDIOLOGO(A)');
insert into profesion(nombre_profesion) values('HIGIENISTA DENTAL');
insert into profesion(nombre_profesion) values('JEFE INFORMATICA');
insert into profesion(nombre_profesion) values('ADMINISTRADOR INFORMATICA');

select * from profesion;


create table establecimiento(
id_establecimiento int(2) not null primary key auto_increment,
nombre_establecimiento varchar(40) not null unique
);

insert into establecimiento(nombre_establecimiento) values('CESFAM Arrau Méndez');
insert into establecimiento(nombre_establecimiento) values('CECOSF Los Olivos');
insert into establecimiento(nombre_establecimiento) values('USAF Viña del Mar');
insert into establecimiento(nombre_establecimiento) values('USAF Buenos Aires');
insert into establecimiento(nombre_establecimiento) values('Servicio de urgencia (SAPU)');
insert into establecimiento(nombre_establecimiento) values('Departamento de Salud');

select * from establecimiento;