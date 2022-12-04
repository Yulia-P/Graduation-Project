
SELECT * FROM ecofuture.users;
SELECT * FROM ecofuture.articles;

drop table users;
drop table ecofuture.articles;

delete from ecofuture.users where id=1;
delete from ecofuture.articles where id=3;
 
use ecofuture;
CREATE TABLE IF NOT EXISTS `users` ( 
  `id` int NOT NULL AUTO_INCREMENT UNIQUE,
  `username` VARCHAR(20) NOT NULL UNIQUE, 
  `email` VARCHAR(20) not null unique,
  `passwordHash` VARCHAR(150) NOT NULL,
  `avatarUrl` VARCHAR(150) NOT NULL,
  `role` VARCHAR(5) NOT NULL,  
  PRIMARY KEY (`id`));

use ecofuture;
CREATE TABLE IF NOT EXISTS `articles` (
`id` int NOT NULL AUTO_INCREMENT UNIQUE,
`Title` VARCHAR(100) NOT NULL UNIQUE,
`Text` VARCHAR(500) not null unique,
`DatePub` DATE NOT NULL,
`ImageU` VARCHAR(150) NOT NULL,
`Author` int NOT NULL,
PRIMARY KEY (`id`),
foreign key (Author) references users(id));