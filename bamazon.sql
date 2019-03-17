drop database if exists bamazonDB;

create database bamazonDB;

use bamazonDB;

create table products
(
    id int(11)
    auto_increment not null,
    product_name VARCHAR
    (30) not null,
    department_name VARCHAR
    (30) not null,
    price int
    (10) not null,
    stock_quantity int
    (10),
    primary key
    (id)
);

    INSERT products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("Rollerskates",
    "sports",
    "39.99",
    "15"
    ),
    ("Waffle Iron", "Kitchen", "24.99", "32"),
    ("Green Glitter", "School Supplies", "3.23", "74"),
    ("Kitchen-Aid Mixer", "Kitchen", "349.99", "13"),
    ("Turntable", "Electronics", "99.99", "21"),
    ("Bottle Water", "Grocery", "4.99", "187"),
    ("Golden Ticket", "Candy", "1000000", "1"),
    ("Panther", "Pets", "120000", "1");

    SELECT *
    FROM products;



