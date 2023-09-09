import { API } from "../api";

exports.createOrderItem = async(item_orders) => {

  console.log(item_orders)
  return await fetch(`${API}/order_item/create`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(item_orders)
  })
  .then(res => res.json())
  .catch(err => err)
  
}