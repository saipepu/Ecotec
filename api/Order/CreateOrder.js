import { API } from "../api";

export const createOrder = async (orders) => {

  return await fetch(`${API}/orders/create`,{
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orders)
  })
  .then(res => res.json())
  .catch(err => err)
}
