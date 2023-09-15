import { API } from "../api";

export const UpdatePoints = async (formData) => {

  var { customer_id, points } = formData
  console.log(JSON.stringify(points))
  return await fetch(`${API}/customer/updatePoints/${customer_id}`, {
    method: "PUT",
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(points)
  })
  .then(res => res.json())
  .catch(err => err)
}