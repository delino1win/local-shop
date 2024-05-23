
export const subtotal = (itemAmount: number, price: string) => {
  return itemAmount * Number(price);
};

export const accumulatePrice = (receiptList: CartList[]) => {
  const listAmount = receiptList.map(item => {
    const tItem = item.totalItem
    const price = parseFloat(item.product.price)

    if(isNaN(price)) {
      console.error("Invalid!")
      return 0
    }

    const total = tItem * price
    return total

  })

  let totalPrice = 0
  // return listAmount.reduce((sum, num) => sum + num, 0)
  return listAmount.forEach(num => totalPrice = totalPrice + num)
}