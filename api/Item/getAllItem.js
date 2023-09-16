import { API } from "../api";

export const getAllItem = () => {
  
  return fetch(`${API}/item/getAll`)
  .then(data => data.json())
  .catch(err => err)
}