const totalItems = document.getElementById('total-items');
const totalCartCost = document.getElementById('total-cart-cost');
const itemName = document.getElementById('item-name');
const itemPrice = document.getElementById('item-price');
const addForm = document.getElementById('add-form');
const itemList = document.getElementById('item-list');

//! --------[EVENT HANDLERS]-------- \\

// Adds item to list
addForm.onsubmit = event => {
    event.preventDefault();
    const name = itemName.value;
    const price = itemPrice.value;

    addItem(name, price);
};

// Handle clicks on list
itemList.onclick = event => {
    if (event.target && event.target.classList.contains('remove')) {
        //                       ..dataset.(x)   x = data-(x)=""
        const name = event.target.dataset.name; // data-name=""

        removeItem(name);
    } else if (event.target && event.target.classList.contains('add-one')) {
        const name = event.target.dataset.name;
        addItem(name);
    } else if (event.target && event.target.classList.contains('remove-one')) {
        const name = event.target.dataset.name;
        removeItem(name, 1);
    }
};

// Handle change events on update input
itemList.onchange = event => {
    if (event.target && event.target.classList.contains('update')) {
        const name = event.target.dataset.name;
        const quantity = parseInt(event.target.value);

        updateCart(name, quantity);
    }
};

//! --------[FUNCTIONS]-------- \\
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
            showItems();
            return;
        }
    }
    cart.push(item);
    showItems();
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
            if (cart[i].quantity < 1 || quantity === 0) {
                cart.splice(i, 1);
            }

            showItems();

            //? Why does this need to be here?
            return;
        }
    }
}

function updateCart(name, quantity) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (cart[i].quantity <= 0) {
                removeItem(name);
                //? Why does this need to be here?
                return;
            }

            cart[i].quantity = quantity;
            showItems();

            //? Why does this need to be here?
            return;
        }
    }
}

function showItems() {
    // Holds cart items
    let itemString = '';

    for (let i = 0; i < cart.length; i++) {
        /*
        Cart object (cart[i]): {name: 'Apple', price: 1, quantity: 2}
            - If the variables match the names of cart[i], it will take the values and
            assign them to the variables
        */
        const { name, price, quantity } = cart[i];
        const total = (cart[i].price * cart[i].quantity).toFixed(2);

        itemString += `
        <li> 
        <span>
        Item: ${name} $${price} x ${quantity} <br> - Total: $${total} 
        </span>
        
        <span>
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}">+</button>
        <button class="remove-one" data-name="${name}">-</button>
        <input class="update" type="number" min="0" data-name="${name}"></input>
        </span>
        </li>`;
    }

    totalItems.innerHTML = `You have ${getQuantity()} items in your cart`;
    itemList.innerHTML = itemString;
    totalCartCost.innerHTML = `Toal cost: ${cartTotal()}`;
}

addItem('Apple', 10.674);
addItem('Apple', 10);
addItem('Orange', 10);
removeItem('Apple', 1);

showItems();
