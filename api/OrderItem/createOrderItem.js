import { API } from "../api";

exports.createOrderItem = async(item_orders, order_id) => {

  var itemList = []
  item_orders.map((item, i) => {
    var obj = {
      order_id: order_id,
      menu_id: item.id,
      quantity: item.quantity
    }
    itemList.push(obj)
  })
  return await fetch(`${API}/order_item/create`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(itemList)
  })
  .then(res => res.json())
  .catch(err => err)
  
}