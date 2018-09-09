var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon",
  socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock"
});



//connect to mysql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
  });
  
  function start() {
    connection.query("SELECT id, product_name, price FROM products", function(err, res) {
      if (err) throw err;
      // console.log(res);
      showtable();
    });
  } 

//show the data as a table on terminal to make it easier to check
function showtable(){
  var table = new Table({
    head:['ID', 'ITEM', 'PRICE'],
    colWidths:[10,20,20]
  });
  list();

  function list(){
    connection.query("SELECT * FROM products", function(err, res){
      for(i=0; i<res.length; i++){
        var itemID = res[i].id,
        name =res[i].product_name,
        price = res[i].price;

        table.push(
          [itemID, name, price]
        );
      }
        console.log(table.toString());
        startbuy();
    });
  }
}

// function which prompts the user for what action they should take
function startbuy() {
  inquirer
    .prompt([
    {
      name: "id",
      type: "input",
      message: "What is the ID of the product you want to buy?",
    },{
      name: "unit",
      type: "input",
      message: "How many do you want?"
    }
    ]).then(function(answer) {
     console.log(answer.id);
     console.log(answer.unit);
     
     var number = parseInt(answer.unit);
     var query = "SELECT stock_quantity FROM products WHERE?";
     connection.query("SELECT * FROM products WHERE id=?", answer.id, function(err, res){
      for (var i=0; i<res.length; i++){
           if (answer.unit > res[i].stock_quantity){
           console.log("===================================================");
           console.log("Sorry! Not enough in stock. Please try again later.");
           console.log("===================================================");
           showtable();
         }else {
           console.log("===================================================");
           console.log("Great, we have enough in stock!");
           console.log("==================================================="); 
           console.log("You've selected:");
           console.log("----------------");
           console.log("Item: " + res[i].product_name);
           console.log("Price: " + res[i].price);
           console.log("Quantity: " + answer.unit);
           console.log("----------------");
           console.log("Total: " + res[i].price * answer.unit);
           console.log("===================================================");
           var newStock = (res[i].stock_quantity - answer.unit);
           var purchasedID = (answer.id);
           updatestock(newStock, purchasedID);
          }
       }
     })
    });
}

//after placed order, updating stock quantity
function updatestock(newStock, purchasedID) {

          connection.query("UPDATE products SET ? WHERE ?", [{
              stock_quantity: newStock
          }, {
              id: purchasedID
          }], function(err, res) {});

          console.log("=================================");
          console.log("Transaction completed. Thank you.");
          console.log("=================================");
          showtable();
  }
