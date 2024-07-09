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


