import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export async function addToCart(item) {
  try {
    const response = await api.post("cart", item, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCart(item) {
  try {
    const response = await api.patch(`cart/${item.id}`, item, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteCart(id) {
  try {
    const response = await api.delete(`cart/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchItemByUserId(userId) {
  try {
    const response = await api.get(`cart?user=${userId}`);
    const data = response.data;
    return data
  } catch (error) {
    throw { message: error.message };
  }
}

export async function resetCart(id){
  const response = await fetchItemByUserId(id)
  const items=await response
  for(let item of items){
    await deleteCart(item.id)
  }
}