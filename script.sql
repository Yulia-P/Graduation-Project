SELECT * FROM ecofuture.users; -- переписано
SELECT * FROM ecofuture.articles; -- переписано
SELECT * FROM ecofuture.ratings; -- переписано
SELECT * FROM ecofuture.points; -- переписано
SELECT * FROM ecofuture.s_keys; -- переписано
SELECT * FROM ecofuture.receptions; -- переписано
SELECT * FROM ecofuture.marks; -- переписано
SELECT * FROM ecofuture.check_weight; -- переписано
SELECT * FROM ecofuture.discounts; -- переписано
SELECT * FROM ecofuture.used_discounts; -- переписано

delete from users where id=8;

drop table ecofuture.points;
drop table ecofuture.s_keys;
drop table ecofuture.ratings;
drop table ecofuture.articles;
drop table ecofuture.users;
drop table ecofuture.receptions;
drop table ecofuture.discounts;
drop table ecofuture.marks;

# update users set `avatarUrl` = 'https://i.pinimg.com/564x/4c/41/c1/4c41c17cd8fdead090a41806f5879799.jpg' where id=2;


-- Пользователь
CREATE TABLE IF NOT EXISTS `users` (  
  `id` int NOT NULL AUTO_INCREMENT UNIQUE,
  `username` VARCHAR(20) NOT NULL UNIQUE, 
  `email` VARCHAR(100) not null unique,
  `password_hash` VARCHAR(150) NOT NULL,
  `points` int DEFAULT 0,
  `avatar_url` VARCHAR(150) ,
  `role` VARCHAR(5) NOT NULL,
   `is_activated` boolean default false,
  `activation_link` VARCHAR(150),
  PRIMARY KEY (`id`));
-- Статьи --
CREATE TABLE IF NOT EXISTS `articles` (
    `id` int NOT NULL AUTO_INCREMENT UNIQUE,
    `title` VARCHAR(100) NOT NULL UNIQUE,
    `text` VARCHAR(600) not null,
    `date_of_pub` DATE NOT NULL,
    `image_url` VARCHAR(150) NOT NULL,
    `author` int NOT NULL,
    `like` int default 0,
    PRIMARY KEY (`id`),
    foreign key (Author) references users(id));
-- Комменты --
CREATE TABLE IF NOT EXISTS `ratings` (
    `id` int NOT NULL AUTO_INCREMENT UNIQUE,
    `article_id` int NOT NULL,
    `commentator` int NOT NULL,
    `comment` VARCHAR(500),
    PRIMARY KEY (`id`),
    foreign key (Commentator) references users(id),
    foreign key (article_id) references articles(id));
-- Пункт сдачи --
CREATE TABLE IF NOT EXISTS `points`(
    `id` int NOT NULL AUTO_INCREMENT UNIQUE,
    `address` VARCHAR(100) NOT NULL UNIQUE,
    `time_of_work` VARCHAR(100) NOT NULL,
    `key_id` int not null unique,
    `admin_id` int not null,
    foreign key (admin_id) references users(id),
    foreign key (key_id) references s_keys(id),
    PRIMARY KEY (`id`));
-- Секретный ключ --
create table IF NOT EXISTS `s_keys`(
    `id` int NOT NULL AUTO_INCREMENT UNIQUE,
    `secret_key` VARCHAR(100) NOT NULL UNIQUE,
    `used` int not null default 0,
    CONSTRAINT ck_used CHECK (used IN (1,0)),
    PRIMARY KEY (`id`));
-- Сдача --
CREATE TABLE IF NOT EXISTS `receptions`(
    `id` int NOT NULL AUTO_INCREMENT UNIQUE,
    `id_user` int NOT NULL,
    `weight` float not null,
    `accrued` int,
    `new_kg` int,
    `type_waste` int NOT NULL,
    `station_key` int NOT NULL,
    `weight_key` int NOT NULL,
    PRIMARY KEY (`id`),
    foreign key (id_user) references users(id),
    foreign key (type_waste) references marks(id),
    foreign key (station_key) references s_keys(id),
    foreign key (weight_key) references check_weight(id));
-- Скидки --
CREATE TABLE IF NOT EXISTS `discounts`(
    `id` int NOT NULL AUTO_INCREMENT UNIQUE,
    `discount` VARCHAR(50) NOT NULL UNIQUE,
    `count_for_dnt` int NOT NULL,
    PRIMARY KEY (`id`));
-- Используемые скидки --
CREATE TABLE IF NOT EXISTS `used_discounts`(
    `id` int NOT NULL AUTO_INCREMENT UNIQUE,
    `discount_id` int NOT NULL,
    `user_id` int not null,
    `used` int not null default 0,
    PRIMARY KEY (`id`),
    CONSTRAINT check_used CHECK (used IN (1,0)),
    foreign key (user_id) references users(id),
    foreign key (discount_id) references discounts(id));
-- Покупки --
CREATE TABLE IF NOT EXISTS `marks`(
    `id` int NOT NULL AUTO_INCREMENT UNIQUE,
    `rubbish` VARCHAR(50) NOT NULL,
    `points_per_kg` int not null,
    `new_from_kg` float not null,
    PRIMARY KEY (`id`));
-- Проверка веса --
CREATE TABLE IF NOT EXISTS `check_weight`(
    `id` int NOT NULL AUTO_INCREMENT UNIQUE,
    `id_rubbish` int not null,
    `weight` int not null,
    `key_of_weight` VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (`id`),
    foreign key (id_rubbish) references marks(id));

-- ALTER TABLE marks CHANGE Rubbish rubbish VARCHAR(50) NOT NULL;
-- ALTER TABLE marks CHANGE PointsOKg points_per_kg  int not null;
ALTER TABLE articles CHANGE image_url `image_url` VARCHAR(150)

insert articles(title, text, date_of_pub, author) values('sjdisjdijs', 'dfgijhugytrddfghbjkhjk', '2023-04-02', 7)