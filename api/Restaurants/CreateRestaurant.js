import { API } from "../api";

export const CreateRestauant = async (formData) => {

  console.log(formData, 'here')
  return await fetch(`${API}/restaurant/create`, {
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