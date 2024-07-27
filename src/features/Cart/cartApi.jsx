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
    const response = await api.delete(`cart/${id}`,{
      headers: { "Content-Type": "application/json" },
    });
    return response.data.id;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
}

export async function fetchItemByUserId() {
  try {
    const response = await api.get(`cart`);
    const data = response.data;
    return data
  } catch (error) {
    throw { message: error.message };
  }
}

export async function resetCart(){
  const response = await fetchItemByUserId()
  const items=await response
  for(let item of items){
    await deleteCart(item.id)
  }
}