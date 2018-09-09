 //list a set of menu options
 //View products for sale: ID, name, price, quantity
 //view low inventory:lower than 5
 //add to inventory:prompt add more
 //add new product

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon",
  socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    menu();
  });
  
function menu(){
    inquirer.prompt([{
        type:"list",
        name:"menu",
        message:"Hi Manager Silu, what would you like to check?",
        choices:["View Products for Sale", "Low Stock", "Add to Stock", "Add New Product"]
    }]).then(function(answer){
        switch(answer.menu){
        case "View Products for Sale":
            viewSale();
            break;
        
        case "Low Stock":
            viewLow();
            break;
        
        case "Add to Stock":
            addStock();
            break;
        
        case "Add New Product":
            addProduct();
            break;    
        }
    });
}


function viewSale (){
   connection.query("SELECT *  FROM products", function(err, res){
   console.log(res);
   menu();
   });
}

function viewLow(){
   connection.query("SELECT * FROM products", function(err, res){
     for (i=0; i< res.length; i++){
         if (res[i].stock_quantity <= 5){
             console.log(res[i]);
             menu();
         }
     }
   });
}

function addStock(){
    inquirer.prompt([{
        type:"input",
        name:"inputId",
        message:"Please enter the ID of the item you want to add!",
    },
    {
        type:"input",
        name:"inputUnit",
        message:"How many do you want to add?",
}]).then(function(add){
   connection.query("UPDATE products SET ? WHERE ?",[{
       stock_quantity:add.inputUnit
   },{
       id:add.inputId
   }], function(err, res){  
   });
   menu();
});
}

function addProduct(){
    inquirer.prompt([{
        type:"input",
        name:"name",
        message:"Please enter the name of item",
    },{
        type:"input",
        name:"department",
        message:"Please enter department name",
    },{
        type:"input",
        name:"price",
        message:"Please enter the price",
    },{
        type:"input",
        name:"stock",
        message:"Please enter the stock quantity",
    }]).then(function(answer){
        connection.query("INSERT INTO products SET ?", {
            product_name:answer.name,
            department_name:answer.department,
            price:answer.price,
            stock_quantity:answer.stock
        }, function(err,res){
            console.log(res.affectedRows + " product inserted!\n");
        });
        menu();
    });
}

