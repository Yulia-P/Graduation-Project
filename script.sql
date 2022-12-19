
SELECT * FROM ecofuture.users;
SELECT * FROM ecofuture.articles;
SELECT * FROM ecofuture.ratings;
SELECT * FROM ecofuture.points;
SELECT * FROM ecofuture.receptions;
SELECT * FROM ecofuture.discounts;
SELECT * FROM ecofuture.marks;

insert into ecofuture.ratings  (`Item`, `Commentator`, `Сomment`) values(1, 1, 'TEST COMMENTTEST COMMENTTEST COMMENTTEST COMMENTTEST COMMENTTEST COMMENT');

select * from  ecofuture.discounts where (PointD=300) or (PointD<300)


update ecofuture.users set `role` = 'admin' where id=3;

drop table ecofuture.points;
drop table ecofuture.rating;
drop table ecofuture.articles;
drop table ecofuture.users;
drop table ecofuture.receptions;
drop table ecofuture.discounts;
drop table ecofuture.marks;

delete from ecofuture.users where id=23;
delete from ecofuture.articles where id=2;

update articles set `Like` = 10 where id=1;

update users set `avatarUrl` = 'https://i.pinimg.com/564x/4c/41/c1/4c41c17cd8fdead090a41806f5879799.jpg' where id=2;

update ecofuture.articles set `Like`= `Like`+1 where Author=1;
SELECT * FROM ecofuture.articles;

 
use ecofuture;
-- Пользователь 
CREATE TABLE IF NOT EXISTS `users` (  
  `id` int NOT NULL AUTO_INCREMENT UNIQUE,
  `username` VARCHAR(20) NOT NULL UNIQUE, 
  `email` VARCHAR(20) not null unique,
  `passwordHash` VARCHAR(150) NOT NULL,
  `points` int DEFAULT 0,
  `avatarUrl` VARCHAR(150) ,
  `role` VARCHAR(5) NOT NULL,  
  PRIMARY KEY (`id`));

use ecofuture;
-- Статьи --
CREATE TABLE IF NOT EXISTS `articles` (
`id` int NOT NULL AUTO_INCREMENT UNIQUE,
`Title` VARCHAR(100) NOT NULL UNIQUE,
`Text` VARCHAR(500) not null unique,
`DatePub` DATE NOT NULL,
`ImageU` VARCHAR(150) NOT NULL,
`Author` int NOT NULL,
`Like` int default 0,
PRIMARY KEY (`id`),
foreign key (Author) references users(id));

use ecofuture;
-- Комменты --
CREATE TABLE IF NOT EXISTS `ratings` (
`id` int NOT NULL AUTO_INCREMENT UNIQUE,
`Item` int NOT NULL,
`Commentator` int NOT NULL,
`Сomment` VARCHAR(500),
PRIMARY KEY (`id`),
foreign key (Commentator) references users(id),
foreign key (Item) references articles(id));

use ecofuture;
-- Пункт сдачи --
CREATE TABLE IF NOT EXISTS `points`(
`id` int NOT NULL AUTO_INCREMENT UNIQUE,
`Address` VARCHAR(100) NOT NULL UNIQUE,
`SecretKey` VARCHAR(250) NOT NULL UNIQUE, -- тайный ключ
PRIMARY KEY (`id`));

use ecofuture;
-- Сдача --
CREATE TABLE IF NOT EXISTS `receptions`(
`id` int NOT NULL AUTO_INCREMENT UNIQUE,
`idUser` int NOT NULL,
`Weight` float not null,
`Accrued` int,
`NewKg` int,
`TypeWaste` VARCHAR(50) NOT NULL,
`StationKey` VARCHAR(250) NOT NULL,
PRIMARY KEY (`id`),
foreign key (idUser) references users(id));

use ecofuture;
-- Товары --
CREATE TABLE IF NOT EXISTS `discounts`(
`id` int NOT NULL AUTO_INCREMENT UNIQUE,
`Discount` VARCHAR(50) NOT NULL UNIQUE,
`PointD` int NOT NULL,
PRIMARY KEY (`id`));

use ecofuture;
-- Покупки 
CREATE TABLE IF NOT EXISTS `marks`(
`id` int NOT NULL AUTO_INCREMENT UNIQUE,
`Rubbish` VARCHAR(50) NOT NULL,
`PointsOKg` int not null,
`NewOKg` float not null,
PRIMARY KEY (`id`))
