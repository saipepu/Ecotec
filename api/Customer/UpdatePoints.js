import { API } from "../api";

export const UpdatePoints = async ({customer_id, points}) => {

  return await fetch(`${API}/customer/update/${customer_id}`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .catch(err => err)
}