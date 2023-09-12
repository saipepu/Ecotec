import { API } from "../api"

export const getOrderByCustomerId = async (customer_id) => {

  return await fetch(`${API}/orders/get/${customer_id}`)
  .then(res => res.json())
  .catch(err => err)
}
