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
                // console.log(res.input);

                // connection.query("select * from products where ? item_id='" + res.input + "'", function (err, res) {
                //     console.log(res.input);
                //     for (var i = 0; i < res.length; i++) {

                //         console.log(res[i].id + " |" + res[i].item_id + " |" + res[i].product_name + " |" + res[i].department_name + " |" + res[i].price + " |" + res[i].stock_quantity);
                //         if (res[i].item_id == comparison.itemID) {
                //             var correctItem;
                //             correctItem = res[i];
                //             console.log (correctItem , res[i]);
                //         }
                //     }
                //     console.log("Your quantity is: " + response.quanity + ".");
                //     console.log("--------------------------------");


                for (var i = 0; i < res.length; i++){
                    if (res[i].item_id == comparison.itemID) {
                                    var correctItem;
                                    correctItem = res[i];
                                    console.log (correctItem , res[i]);
                                }
                }
                    if (correctItem.stock_quantity >= comparison.quanity) {
                        console.log("We have enough!  You can buy this!");
                    }
                    else {
                        console.log("We don't have enough. Come back later.")
                    }
                });

            }
        )
    // .then(
    //     function (quantity){
    //         inquirer.prompt([
    //             {
    //                 type: "input",
    //                 message: "How many?",
    //                 name: "input",
    //             }
    //         ])
    //     }
    // )
}

