import { API } from "../api";

export const GetMenuById = async (menu_id) => {

  return await fetch(`${API}/menu/getMenuById?menu_id=${menu_id}`)
  .then(data => data.json())
  .catch(err => err)
}