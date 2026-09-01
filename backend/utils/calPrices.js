
const calPrices = (orderItems) => {
    const itemPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty,0)
    //shippingPrice, taxRate, taxPrice, totalPrice
    const shippingPrice = itemPrice > 100 ? 0 : 10
    const taxRate = 0.15
    const taxPrice = (itemPrice * taxRate)

    const totalPrice = (itemPrice + shippingPrice + parseFloat(taxPrice))

    return {
        itemPrice : itemPrice.toFixed(2),
        shippingPrice : shippingPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2)
    }
}

export default calPrices