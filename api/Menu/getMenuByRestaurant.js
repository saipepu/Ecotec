import { API } from "../api";

exports.getMenuByRestaurant = async(id) => {

  return await fetch(`${API}/menu/getAllMenu?restaurant_id=${id}`)
  .then(res => res.json())
  .catch(err => err)
}