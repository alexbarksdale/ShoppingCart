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
