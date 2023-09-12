import { API } from "../api";

export const GetOrderItemByOrderId = async (orderId) => {
  
  var ids = JSON.stringify(orderId).slice(1, -1)
  return await fetch(`${API}/order_item/getByOrderId?orderIds=${ids}`)
  .then(res => res.json())
  .catch(err => err)
}