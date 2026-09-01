
const calPrices = (orderItems) => {
    const itemPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty,0).toFixed(2)
    //shippingPrice, taxRate, taxPrice, totalPrice
    const shippingPrice = itemPrice > 100 ? 0 : 10
    const taxRate = 0.15
    const taxPrice = (itemPrice * taxRate).toFixed(2)

    const totalPrice = (itemPrice + shippingPrice + parseFloat(taxPrice).toFixed(2))

    return {
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    }
}

export default calPrices