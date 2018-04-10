var mysql = require("mysql");

var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    user: "root",

    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    // displayBootUp();
    console.log("Displaying all products");

    console.log("#" + " |" + "Item ID#" + " |" + "Product Name" + " |" + "Department" + " |" + "Price" + " |" + "Stock Quantity");
    queryAllProducts();
    promptBuy();
    connection.end();
});



function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " |" + res[i].item_id + " |" + res[i].product_name + " |" + res[i].department_name + " |" + res[i].price + " |" + res[i].stock_quantity);
        }
        console.log("--------------------------------");
    });
}

function promptBuy() {
    inquirer.prompt([
        {
            type: "input",
            message: "Whaddya wanna buy?  Enter ID#.",
            name: "input",
        }
    ])
    .then(
        function (response){
            console.log(response.input);
            
                connection.query("select * from products where item_id='"+ response.input + "'", function (err, res) {
                    console.log("Searching for:" + response.input);
                    for (var i = 0; i < response.length; i++) {
                        console.log(response[i].id + " |" + response[i].item_id + " |" + response[i].product_name + " |" + response[i].department_name + " |" + response[i].price + " |" + response[i].stock_quantity);
                    }
                    // console.log(result);
                    console.log("--------------------------------");
                });
            
        }
    )
}