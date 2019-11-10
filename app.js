const cart = [];
function test(test, test2) {}

function addItem(name, price) {
    const item = {
        name: name,
        price: price,
        quantity: 1
    };

    cart.push(item);
}

function showItems() {
    console.log(`You have ${cart.length} items in your cart`);

    for (let i = 0; i < cart.length; i++) {
        console.log(`Item: ${cart[i].name} $${cart[i].price} x ${cart[i].quantity}`);
    }
}

addItem('Apple', 10);
addItem('Orange', 10);

showItems();
