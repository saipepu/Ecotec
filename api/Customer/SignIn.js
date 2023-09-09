import { API } from "../api"

export const SignIn = async (formData) => {
  console.log(formData)
  return await fetch(`${API}/customer/auth/signin`, {
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