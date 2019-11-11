const itemList = document.getElementById('item-list');
const totalItems = document.getElementById('total-items');
const totalCost = document.getElementById('total-cart-cost');

// Holds the items in the cart
const cart = [];

// Adds item to cart
function addItem(name, price) {
    const item = {
        name,
        price,
        quantity: 1
    };

    // Checks to see if item === item to add quantity
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity += 1;
            return;
        }
    }

    cart.push(item);
}

// Gets the amount of items in the cart
function getQuantity() {
    let quantity = 0;
    for (let i = 0; i < cart.length; i++) {
        quantity += cart[i].quantity;
    }

    return quantity;
}

// Calculates the total
function cartTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }

    return total.toFixed(2);
}

// Removes item or quantity from the cart
function removeItem(name, quantity = 0) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (quantity > 0) {
                cart[i].quantity -= quantity;
            }

            // Removes item if there 0 items
            if (cart[i].quantity < 1 || cart[i].quantity === 0) {
                cart.splice(i, 1);
            }

            //? Why does this need to be here?
            return;
        }
    }
}

function showItems() {
    let itemString = '';

    for (let i = 0; i < cart.length; i++) {
        total = cart[i].price * cart[i].quantity;

        itemString += `<li> Item: ${cart[i].name} $${cart[i].price} x ${cart[i].quantity} Total: ${total} </li>`;
    }

    totalItems.innerHTML = `You have ${getQuantity()} items in your cart`;
    itemList.innerHTML = itemString;
    totalCost.innerHTML = `Toal cost: ${cartTotal()}`;
}

addItem('Apple', 10);
addItem('Apple', 10);
addItem('Orange', 10);

showItems();
