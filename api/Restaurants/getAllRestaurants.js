import { API } from "../api";

exports.getAllRestaurants = async () => {
  
  console.log('Gettin All Restaurants')
  return await fetch(`${API}/restaurant/getAllRestaurant`)
  .then(res => res.json())
  .catch(err => err)
}