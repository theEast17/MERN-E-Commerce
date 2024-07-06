import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});


export async function getLoggedInUserOrdersById(userId) {
  try {
    const response = await api.get(`orders/?user.id=${userId}`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
