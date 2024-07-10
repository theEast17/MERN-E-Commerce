import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export async function addOrder(item) {
  try {
    const response = await api.post("orders", item, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function getAllOrder(pagination) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  try {
    const response = await api.get(`orders?${queryString}`)
    const totalOrders = await response.headers.get("X-Total-Count");
    return { orders: response.data, totalItems: +totalOrders };
  } catch (error) {
    console.log(error);
  }
}
