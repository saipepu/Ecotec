import { API } from "../api";

export const getItemByCustomerId = (customer_id) => {

  return fetch(`${API}/customer_item/get/${customer_id}`)
  .then(data => data.json())
  .catch(err => err)
}
