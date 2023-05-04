SELECT * FROM ecofuture.users; -- переписано
SELECT * FROM ecofuture.articles; -- переписано
SELECT * FROM ecofuture.ratings; -- переписано
SELECT * FROM ecofuture.likes; -- переписано
SELECT * FROM ecofuture.points; -- переписано
SELECT * FROM ecofuture.s_keys; -- переписано
SELECT * FROM ecofuture.receptions; -- переписано
SELECT * FROM ecofuture.marks; -- переписано
SELECT * FROM ecofuture.check_weight; -- переписано
SELECT * FROM ecofuture.discounts; -- переписано

drop table ecofuture.points;
drop table ecofuture.s_keys;
drop table ecofuture.ratings;
drop table ecofuture.likes;
drop table ecofuture.articles;
drop table ecofuture.users;
drop table ecofuture.receptions;
drop table ecofuture.discounts;
drop table ecofuture.marks;

-- update users set `avatarUrl` = 'https://i.pinimg.com/564x/4c/41/c1/4c41c17cd8fdead090a41806f5879799.jpg' where id=2;
-- ALTER TABLE marks CHANGE Rubbish rubbish VARCHAR(50) NOT NULL;
-- ALTER TABLE marks CHANGE PointsOKg points_per_kg  int not null;
-- ALTER TABLE articles CHANGE image_url `image_url` VARCHAR(150)
-- insert articles(title, text, date_of_pub, author) values('sjdisjdijs', 'dfgijhugytrddfghbjkhjk', '2023-04-02', 7)
-- update users set `points` = 250 where id = 24

create database test_ecofuture;
-- Пользователь
CREATE TABLE IF NOT EXISTS test_ecofuture.users (
  id int NOT NULL AUTO_INCREMENT UNIQUE,
  username VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(100) not null unique,
  password_hash VARCHAR(150) NOT NULL,
  points int DEFAULT 0,
  role VARCHAR(5) NOT NULL default 'user',
  is_activated boolean default false,
  activation_link VARCHAR(150),
  constraint users_ck CHECK (role IN ('admin', 'user')),
  constraint users_pk primary key (id));
-- Статьи --
CREATE TABLE IF NOT EXISTS test_ecofuture.articles (
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    title VARCHAR(100) NOT NULL UNIQUE,
    text text not null,
    date_of_pub DATE NOT NULL,
    image_url VARCHAR(150) NOT NULL,
    author int NOT NULL,
    likes int default 0,
    constraint articles_pk primary key (id),
    constraint articles_fk_users foreign key (author) references test_ecofuture.users(id) on delete cascade);
-- Комменты --
CREATE TABLE IF NOT EXISTS test_ecofuture.ratings (
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    article_id int NOT NULL,
    commentator int NOT NULL,
    comment VARCHAR(500),
    constraint ratings_pk primary key (id),
    constraint ratings_fk_users foreign key (commentator) references test_ecofuture.users(id) on delete cascade,
    constraint ratings_fk_articles foreign key (article_id) references test_ecofuture.articles(id) on delete cascade);
-- Лайки __
CREATE TABLE IF NOT EXISTS test_ecofuture.likes(
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    user_id int NOT NULL,
    article_id int NOT NULL,
    constraint likes_pk primary key (id),
    constraint likes_fk_users foreign key (user_id) references test_ecofuture.users(id) on delete cascade,
    constraint likes_fk_articles foreign key (article_id) references test_ecofuture.articles(id) on delete cascade);
-- Секретный ключ --
create table IF NOT EXISTS test_ecofuture.s_keys(
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    secret_key VARCHAR(100) NOT NULL UNIQUE,
    is_used int not null default 0,
    constraint s_keys_ck CHECK (is_used IN (1,0)),
    constraint s_keys_pk primary key (id));
-- Пункт сдачи --
CREATE TABLE IF NOT EXISTS test_ecofuture.points(
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    address VARCHAR(100) NOT NULL UNIQUE,
    time_of_work VARCHAR(100) NOT NULL,
    key_id int not null unique,
    admin_id int not null,
    constraint points_pk primary key (id),
    constraint points_fk_users foreign key (admin_id) references test_ecofuture.users(id) on delete cascade,
    constraint points_fk_s_keys foreign key (key_id) references test_ecofuture.s_keys(id) on delete cascade);
-- Отходы --
CREATE TABLE IF NOT EXISTS test_ecofuture.marks(
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    rubbish VARCHAR(50) NOT NULL,
    points_per_kg int not null,
    new_from_kg float not null,
    image_link varchar(255),
    constraint marks_pk primary key (id));
-- Проверка веса --
CREATE TABLE IF NOT EXISTS test_ecofuture.check_weight(
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    rubbish_id int not null,
    weight int not null,
    key_of_weight VARCHAR(100) NOT NULL UNIQUE,
    constraint check_weight_pk primary key (id),
    constraint check_weight_fk_marks foreign key (rubbish_id) references test_ecofuture.marks(id) on delete cascade);
-- Сдача --
CREATE TABLE IF NOT EXISTS test_ecofuture.receptions(
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    user_id int NOT NULL,
    weight float not null,
    accrued int,
    new_kg int,
    type_waste int NOT NULL,
    station_key int NOT NULL,
    weight_key int NOT NULL,
    constraint receptions_pk primary key (id),
    constraint receptions_fk_users foreign key (user_id) references test_ecofuture.users(id) on delete cascade,
    constraint receptions_fk_s_keys foreign key (station_key) references test_ecofuture.s_keys(id) on delete cascade,
    constraint receptions_fk_marks foreign key (type_waste) references test_ecofuture.marks(id) on delete cascade,
    constraint receptions_fk_check_weight foreign key (weight_key) references test_ecofuture.check_weight(id) on delete cascade);
-- Скидки --
CREATE TABLE IF NOT EXISTS test_ecofuture.discounts(
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    discount VARCHAR(50) NOT NULL UNIQUE,
    promo_code VARCHAR(50) NOT NULL UNIQUE,
    count_for_dnt int NOT NULL,
    constraint discounts_pk primary key (id));
-- Точки сбора с отходами --
CREATE TABLE IF NOT EXISTS test_ecofuture.points_marks(
    id int NOT NULL AUTO_INCREMENT UNIQUE,
    points_id int NOT NULL,
    marks_id int NOT NULL,
    constraint points_marks_pk primary key (id),
    constraint points_marks_fk_points foreign key (points_id) references test_ecofuture.points(id) on delete cascade,
    constraint points_marks_fk_marks foreign key (marks_id) references test_ecofuture.marks(id) on delete cascade);