import { API } from "../api";

exports.getAllMenu = async() => {

  return await fetch(`${API}/menu/getAll`)
  .then(res => res.json())
  .catch(err => err)
}