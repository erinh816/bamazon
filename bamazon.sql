DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
     id INT NOT NULL AUTO_INCREMENT,
     product_name VARCHAR (200) NULL,
     department_name VARCHAR (200) NULL,
     price DECIMAL(10,2) NULL,
     stock_quantity INTEGER NULL,
     PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Face sticker", "Rave accessory", 12, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Neon paint", "Rave accessory", 13.3, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LED bracelet", "Rave accessory", 2, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oreo", "food", 3.56, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Peachy eye shadow palette", "Makeup", 45, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sequin tank top", "Clothing", 34, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kids ride on car", "Toy", 146, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shelf", "Furniture", 77.3, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cotton Rounds", "Makeup", 1.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hands wash", "Cleaning supplies", 2.99, 25);