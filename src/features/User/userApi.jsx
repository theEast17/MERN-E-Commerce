import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});


export async function getLoggedInUserOrdersById() {
  try {
    const response = await api.get(`orders/own`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getLoggedInUserById(){
  try {
    const response = await api.get(`users/own`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(user) {
  try {
    const response = await api.patch(`users/${user.id}`, user, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
