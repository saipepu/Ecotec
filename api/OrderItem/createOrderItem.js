import { API } from "../api";
import AppStateContext from "../../hook/AppStateContext";
import { useContext } from "react";

const context = useContext(AppStateContext)

exports.createOrderItem = async() => {

  return await fetch(`${API}/order_item/create`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify()
  })
  .then(res => res.json())
  .catch(err => err)
}