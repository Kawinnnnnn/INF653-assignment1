// Assignment1
// Kawin LY
// 6 Feb 2025

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Coffee Menu Object
const coffeeMenu = {
    "1": { name: "Espresso", price: 1.99 },
    "2": { name: "Latte", price: 2.99 },
    "3": { name: "Cappuccino", price: 3.49 },
    "4": { name: "Americano", price: 2.49 }
};

// Store orders
let orderHistory = [];

// Function to display the coffee menu
function displayCoffeeMenu() {
    console.log("\nAvailable Coffee Types:");
    Object.keys(coffeeMenu).forEach(key => {
        console.log(`${key}. ${coffeeMenu[key].name} ($${coffeeMenu[key].price.toFixed(2)})`);
    });
    console.log("5. Exit");
}

// Function to get coffee details by input (name or number)
function getCoffeeDetails(input) {
    if (coffeeMenu[input]) {
        return coffeeMenu[input];
    }
    let coffee = Object.values(coffeeMenu).find(coffee => coffee.name.toLowerCase() === input);
    return coffee || null;
}

// Function to handle coffee ordering with a while loop
function orderCoffee() {
    try {
        let ordering = true;

        const askUser = () => {
            displayCoffeeMenu();
            rl.question("Enter the number or name of the coffee you want, or type 'exit': ", function(input) {
                input = input.toLowerCase().trim();

                if (input === 'exit') {
                    confirmExit();
                    ordering = false;
                    return;
                }

                let coffee = getCoffeeDetails(input);
                if (coffee) {
                    console.log(`The price for a ${coffee.name} is $${coffee.price.toFixed(2)}.`);
                    orderHistory.push(coffee.name);
                } else {
                    console.log(`Invalid selection: '${input}'. Please enter a valid coffee number or name.`);
                    askUser(); // Ask again without adding to history
                    return;
                }

                askUser(); // Continue asking for orders
            });
        };

        askUser();
    } catch (error) {
        console.error("An unexpected error occurred:", error.message);
        rl.close();
    }
}

// Function to confirm exit and display order summary
function confirmExit() {
    if (orderHistory.length > 0) {
        console.log("\nYou ordered:");
        orderHistory.forEach((item, index) => console.log(`${index + 1}. ${item}`));
    } else {
        console.log("\nNo orders were placed.");
    }
    
    console.log("Thank you for using our coffee ordering system!");
    rl.close();
}

// Start the coffee ordering system
orderCoffee();
