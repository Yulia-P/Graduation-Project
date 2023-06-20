SELECT * FROM ecofuture.users; -- переписано
SELECT * FROM ecofuture.articles; -- переписано
SELECT * FROM ecofuture.ratings; -- переписано
SELECT * FROM ecofuture.likes; -- переписано
SELECT * FROM ecofuture.points; -- переписано
SELECT * FROM ecofuture.s_keys; -- переписано
SELECT * FROM ecofuture.receptions; -- переписано
SELECT * FROM ecofuture.marks; -- переписано
SELECT * FROM ecofuture.check_weight; -- переписано


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
CREATE TABLE IF NOT EXISTS ecofuture.users (
    id int auto_increment,
    username        varchar(20)               not null,
    email           varchar(100)              not null,
    password_hash   varchar(200)              not null,
    points          int        default 0      null,
    role            varchar(5) default 'user' not null,
    is_activated    tinyint(1) default 0      null,
    activation_link varchar(150)              null,
  constraint users_ck CHECK (role IN ('admin', 'user')),
  constraint email_un unique (email),
  constraint password_hash_un unique (password_hash),
  constraint users_pk primary key (id));
-- Статьи --
CREATE TABLE IF NOT EXISTS ecofuture.articles (
    id int auto_increment,
    title       varchar(100)  not null,
    text        text          not null,
    date_of_pub date          not null,
    image_url   varchar(150)  not null,
    author      int           not null,
    likes       int default 0 null,
    constraint articles_pk primary key (id),
    constraint title_un unique (title),
    constraint articles_fk_users foreign key (author) references ecofuture.users(id) on delete cascade);
-- Комменты --
CREATE TABLE IF NOT EXISTS ecofuture.ratings (
    id          int auto_increment,
    article_id  int          not null,
    commentator int          not null,
    comment     varchar(500) not null,
    constraint ratings_pk primary key (id),
    constraint ratings_fk_users foreign key (commentator) references ecofuture.users(id) on delete cascade,
    constraint ratings_fk_articles foreign key (article_id) references ecofuture.articles(id) on delete cascade);
-- Лайки __
CREATE TABLE IF NOT EXISTS ecofuture.likes(
    id         int auto_increment,
    user_id    int not null,
    article_id int not null,
    constraint likes_pk primary key (id),
    constraint likes_fk_users foreign key (user_id) references ecofuture.users(id) on delete cascade,
    constraint likes_fk_articles foreign key (article_id) references ecofuture.articles(id) on delete cascade);
-- Секретный ключ --
create table IF NOT EXISTS ecofuture.s_keys(
    id int auto_increment,
    secret_key varchar(100)  not null,
    is_used    int default 0 not null,
    constraint s_keys_ck CHECK (is_used IN (1,0)),
    constraint s_keys_pk primary key (id));
-- Пункт сдачи --
CREATE TABLE IF NOT EXISTS ecofuture.points(
    id           int auto_increment,
    address      varchar(100) not null,
    time_of_work varchar(100) not null,
    key_id       int          not null,
    admin_id     int          not null,
    link_to_map  text         not null,
    point_name   varchar(100) not null,
    constraint address_un unique (address),
    constraint key_id_un unique (key_id),
    constraint point_name_un unique (point_name),
    constraint points_pk primary key (id),
    constraint points_fk_users foreign key (admin_id) references ecofuture.users(id) on delete cascade,
    constraint points_fk_s_keys foreign key (key_id) references ecofuture.s_keys(id) on delete cascade);
-- Отходы --
CREATE TABLE IF NOT EXISTS ecofuture.marks(
    id int auto_increment,
    rubbish varchar(50)  not null,
    points_per_kg int not null,
    new_from_kg float not null,
    image_link varchar(255) null,
    constraint marks_pk primary key (id));
-- Проверка веса --
CREATE TABLE IF NOT EXISTS ecofuture.check_weight(
    id int auto_increment,
    rubbish_id    int          not null,
    weight        int          not null,
    key_of_weight varchar(100) not null,
    constraint key_of_weight_un unique (key_of_weight),
    constraint check_weight_pk primary key (id),
    constraint check_weight_fk_marks foreign key (rubbish_id) references ecofuture.marks(id) on delete cascade);
-- Сдача --
CREATE TABLE IF NOT EXISTS ecofuture.receptions(
   id          int auto_increment,
    user_id     int   not null,
    weight      float not null,
    accrued     int   null,
    new_kg      int   null,
    type_waste  int   not null,
    station_key int   not null,
    weight_key  int   not null,
    constraint receptions_pk primary key (id),
    constraint receptions_fk_users foreign key (user_id) references ecofuture.users(id) on delete cascade,
    constraint receptions_fk_s_keys foreign key (station_key) references ecofuture.s_keys(id) on delete cascade,
    constraint receptions_fk_marks foreign key (type_waste) references ecofuture.marks(id) on delete cascade,
    constraint receptions_fk_check_weight foreign key (weight_key) references ecofuture.check_weight(id) on delete cascade);
-- Скидки --
CREATE TABLE IF NOT EXISTS ecofuture.discounts(
    id int auto_increment,
    discount varchar(50) not null,
    promo_code varchar(50) not null,
    count_for_dnt int not null,
    constraint discount_un unique (discount),
    constraint promo_code_un unique (promo_code),
    constraint discounts_pk primary key (id));
--  Промокоды --
CREATE TABLE IF NOT EXISTS test_ecofuture.promo_codes(
    id int auto_increment,
    promo_code varchar(50) not null,
    user_id int not null,
    discount_id int not null,
    date_of_add DATE not null DEFAULT '2023-05-11',
    constraint discounts_pk primary key (id),
    constraint user_discount_ids_un unique (user_id, discount_id),
    constraint promo_codes_fk_users foreign key (user_id) references users (id) on delete cascade,
    constraint promo_codes_fk_discounts foreign key (discount_id) references discounts (id) on delete cascade
);
-- Точки сбора с отходами --
CREATE TABLE IF NOT EXISTS ecofuture.points_marks(
    id        int auto_increment,
    points_id int not null,
    marks_id  int not null,
    constraint points_marks_pk primary key (id),
    constraint points_marks_fk_points foreign key (points_id) references ecofuture.points(id) on delete cascade,
    constraint points_marks_fk_marks foreign key (marks_id) references ecofuture.marks(id) on delete cascade);


