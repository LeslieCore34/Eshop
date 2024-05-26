use mysql;
create database IF NOT EXISTS customerservicedb;
create user 'customerservice' @'localhost' identified by 'leslie';
create user 'customerservice' @'%' identified by 'leslie';
grant all privileges on customerservicedb.* to 'customerservice' @'localhost';
grant all privileges on customerservicedb.* to 'customerservice' @'%';
flush privileges;