import { API } from "../api";

export const DeleteOrderById = (order_id) => {

  return fetch(`${API}/orders/delete/${order_id}`, {
    method: "DELETE"
  })
  .then(data => data.json())
  .catch(err => err)
}