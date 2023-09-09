import { API } from "../api";

exports.getAllCategory = async() => {

  return await fetch(`${API}/category/getAll`)
  .then(res => res.json())
  .catch(err => err)
}