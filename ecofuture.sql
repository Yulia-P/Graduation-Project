--done
create table discounts(
    id int auto_increment primary key,
    discount varchar(50) not null,
    promo_code varchar(50) not null,
    count_for_dnt int not null,
    constraint discount unique (discount),
    constraint id unique (id),
    constraint promo_code unique (promo_code)
);

--done
create table marks(
    id int auto_increment primary key,
    rubbish varchar(50)  not null,
    points_per_kg int not null,
    new_from_kg float not null,
    image_link varchar(255) null,
    constraint id unique (id)
);

--done
create table check_weight(
    id int auto_increment primary key,
    rubbish_id    int          not null,
    weight        int          not null,
    key_of_weight varchar(100) not null,
    constraint id unique (id),
    constraint key_of_weight unique (key_of_weight),
    constraint check_weight_fk_marks foreign key (rubbish_id) references marks (id) on delete cascade
);
--done
create table s_keys(
    id int auto_increment primary key,
    secret_key varchar(100)  not null,
    is_used    int default 0 not null,
    constraint id unique (id),
    constraint secret_key unique (secret_key),
    constraint s_keys_ck check (`is_used` in (1, 0))
);

--done
create table users(
    id int auto_increment primary key,
    username        varchar(20)               not null,
    email           varchar(100)              not null,
    password_hash   varchar(150)              not null,
    points          int        default 0      null,
    role            varchar(5) default 'user' not null,
    is_activated    tinyint(1) default 0      null,
    activation_link varchar(150)              null,
    constraint email unique (email),
    constraint id unique (id),
    constraint username unique (username),
    constraint users_ck check (`role` in (_utf8mb4\'admin\',_utf8mb4\'user\'))
);

--done
create table articles(
    id int auto_increment primary key,
    title       varchar(100)  not null,
    text        text          not null,
    date_of_pub date          not null,
    image_url   varchar(150)  not null,
    author      int           not null,
    likes       int default 0 null,
    constraint id unique (id),
    constraint title unique (title),
    constraint articles_fk_users foreign key (author) references users (id) on delete cascade
);

--done
create table likes(
    id         int auto_increment primary key,
    user_id    int not null,
    article_id int not null,
    constraint id unique (id),
    constraint likes_fk_articles foreign key (article_id) references articles (id) on delete cascade,
    constraint likes_fk_users foreign key (user_id) references users (id) on delete cascade
);

--done
create table points(
    id           int auto_increment primary key,
    address      varchar(100) not null,
    time_of_work varchar(100) not null,
    key_id       int          not null,
    admin_id     int          not null,
    link_to_map  text         not null,
    point_name   varchar(100) not null,
    constraint address unique (address),
    constraint id unique (id),
    constraint key_id unique (key_id),
    constraint name unique (point_name),
    constraint point_name unique (point_name),
    constraint points_fk_s_keys foreign key (key_id) references s_keys (id) on delete cascade,
    constraint points_fk_users foreign key (admin_id) references users (id) on delete cascade
);

--done
create table points_marks(
    id        int auto_increment primary key,
    points_id int not null,
    marks_id  int not null,
    constraint id unique (id),
    constraint points_marks_fk_marks foreign key (marks_id) references marks (id) on delete cascade,
    constraint points_marks_fk_points foreign key (points_id) references points (id) on delete cascade
);
--done
create table ratings(
    id          int auto_increment primary key,
    article_id  int          not null,
    commentator int          not null,
    comment     varchar(500) not null,
    constraint id unique (id),
    constraint ratings_fk_articles foreign key (article_id) references articles (id) on delete cascade,
    constraint ratings_fk_users foreign key (commentator) references users (id) on delete cascade
);

--done
create table receptions(
    id          int auto_increment primary key,
    user_id     int   not null,
    weight      float not null,
    accrued     int   null,
    new_kg      int   null,
    type_waste  int   not null,
    station_key int   not null,
    weight_key  int   not null,
    constraint id unique (id),
    constraint receptions_fk_check_weight foreign key (weight_key) references check_weight (id) on delete cascade,
    constraint receptions_fk_marks foreign key (type_waste) references marks (id) on delete cascade,
    constraint receptions_fk_s_keys foreign key (station_key) references s_keys (id) on delete cascade,
    constraint receptions_fk_users foreign key (user_id) references users (id) on delete cascade
);