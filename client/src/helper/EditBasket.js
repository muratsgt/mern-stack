/***
 * Save item to local storage
 * Delete item from local storage
 */
export const getBasketData = (userEmail) => {
    return JSON.parse(localStorage.getItem(userEmail ?? "default"))?.basket;
}

export const addToBasket = (itemId, userEmail) => {
    // get data from localstorage
    const userData = JSON.parse(localStorage
        .getItem(userEmail ?? "default"));

    // create basket for user if not exist
    if (!userData) {
        const newEntry = {
            basket: [
                { _id: itemId, quantity: 1 }
            ]
        };
        localStorage.setItem(userEmail ?? "default", JSON.stringify(newEntry));
        return;
    };

    // check if item exist
    const itemIndex = userData?.basket?.findIndex(item => item._id === itemId);

    // add quantity if exist
    if (itemIndex >= 0) {
        userData.basket[itemIndex].quantity++;
    } else {
        // add new if not exist
        userData.basket.push({ _id: itemId, quantity: 1 });
    };

    // update localstorage
    localStorage.setItem(userEmail ?? "default", JSON.stringify(userData));
}

export const removeFromBasket = (itemId, userEmail) => {
    // get data from localstorage
    let userData = JSON.parse(localStorage
        .getItem(userEmail ?? "default"));

    // return if user not exist
    if (!userData) {
        return;
    };

    // check if item exist
    const itemIndex = userData?.basket?.findIndex(item => item._id === itemId);

    // return if item not exist
    if (itemIndex < 0) {
        return;
    }

    // update item quantity
    const tempNum = userData.basket[itemIndex].quantity;
    if (tempNum > 1) {
        userData.basket[itemIndex].quantity = tempNum - 1
    } else {
        userData.basket.splice(itemIndex, 1);
    };


    // update localstorage
    localStorage.setItem(userEmail ?? "default", JSON.stringify(userData));
}