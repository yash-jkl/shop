export class Helper {
  getTotal(items) {
    let total = 0;
    items.forEach((item) => {
      item.amount = item.product.price * item.quantity;
      total += item.amount;
    });
    return { items, total };
  }
}
