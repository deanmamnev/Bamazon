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

});



function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " |" + res[i].item_id + " |" + res[i].product_name + " |" + res[i].department_name + " |" + res[i].price + " |" + res[i].stock_quantity);
        }
        console.log("--------------------------------");






        inquirer.prompt([
            {
                type: "input",
                message: "Whaddya wanna buy?  Enter ID#.",
                name: "itemID",
            },

            // Shout out to Jaysen for helping out here with followup prompts.
            {
                type: "input",
                message: "How many?",
                name: "quantity",
            }
        ])
            .then(
                function (comparison) {

                    for (var i = 0; i < res.length; i++) {
                        if (res[i].item_id == comparison.itemID) {
                            var correctItem;
                            correctItem = res[i];
                            console.log(correctItem, res[i]);
                        }
                    }
                    console.log(correctItem.stock_quantity, comparison.quantity)
                    if (correctItem.stock_quantity >= comparison.quantity) {
                        console.log("We have enough!  You can buy this!");

                        connection.query(
                            "Update Products set ? where ?",
                            [
                                {
                                    stock_quantity: correctItem.stock_quantity - comparison.quantity
                                },
                                {
                                    item_id: comparison.itemID
                                }

                            ]
                        )
                        console.log("Total: " + correctItem.price * comparison.quantity)
                    }
                    else {
                        console.log("We don't have enough. Come back later.")
                    }
                    connection.end();
                }


            )
    });
}