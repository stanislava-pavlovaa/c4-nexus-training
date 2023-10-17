function calculatePrice(quantity, price) {
    viewData.totalPrice = quantity * price;
    return viewData;
}

module.exports = {
    calculatePrice: calculatePrice,
};