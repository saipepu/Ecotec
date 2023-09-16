import { API } from "../api";

export const CreateCustomerItem = (formData) => {

  return fetch(`${API}/customer_item/create`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(data => data.json())
  .catch(err => err)
}
