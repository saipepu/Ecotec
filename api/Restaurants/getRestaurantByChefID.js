import { API } from "../api";

exports.getRestaurantByChefId = async (chef_id) => {
  
  console.log('Getting Restaurant by Chef ID')
  return await fetch(`${API}/restaurant/getRestaurant?chef_id=${chef_id}`)
  .then(data => data.json())
  .catch(err => err)
}