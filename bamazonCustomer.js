var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "honey82FART",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("hello");
  start();
});

// Start Shopping
function start() {
  inquirer
    .prompt({
      name: "yesOrNo",
      type: "rawlist",
      message: "Would you like to shop,today?",
      choices: ["YES", "NO"]
    })
    .then(function(answer) {
      if (answer.yesOrNo === "YES") {
        showProducts();
      } else {
        console.log("\n++++++++++++++++++");
        console.log("Oh....K-Bye...");
        console.log("\n++++++++++++++++++");
        start();
      }
    });
}

//Grabs and displays products info
function showProducts() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log("\n+++++++++++++++++++++++++++++++++++++");
    for (var i = 0; i < results.length; i++) {
      var itemId = results[i].id;
      var name = results[i].product_name;
      var price = "$" + results[i].price.toFixed(2);
      var quantity = results[i].stock_quantity;
      console.log(
        "\n" + itemId + " | " + name + " | " + price + " | " + quantity
      );
    }
    selectProduct();
  });
}

// select item and quantity to purchase
function selectProduct() {
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What Product ID are you interested in, today?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"
      }
    ])
    // find item and confirm stock
    .then(function(answer) {
      console.log(answer.product);
      connection.query(
        "SELECT * FROM products WHERE ?",
        { id: answer.product },
        function(err, results) {
          console.log("\n++++++++++++++++++++++++++++++++++");
          console.log(
            "You are inteseted in " +
              answer.quantity +
              " " +
              results[0].product_name +
              " at $" +
              results[0].price +
              " each, from the " +
              results[0].department_name +
              " department."
          );
          console.log("\n+++++++++++++++++++++++++++++++++");
          if (answer.quantity <= results[0].stock_quantity) {
            var itemStock = results[0].stock_quantity - answer.quantity;
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: itemStock
                },
                {
                  id: answer.product
                }
              ],
              function(err, results) {}
            );

            var total = results[0].price * answer.quantity;
            console.log(
              "\n Purchase Successfull! Your total is $" +
                total.toFixed(2) +
                "\n"
            );
            start();
          } else {
            console.log("\n Sorry, we do not carry that quantity.");
            start();
          }
        }
      );
    });
}
