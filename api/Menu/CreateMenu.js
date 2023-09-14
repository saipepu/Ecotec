import { API } from "../api";

export const CreateMenu = async (formData) => {

  console.log(formData, 'Creating Menu')
  return await fetch(`${API}/menu/create`, {
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