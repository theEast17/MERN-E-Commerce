import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export async function createUser(userData) {
  const response = await fetch(`http://localhost:5000/users/signup`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "content-type": "application/json" },
  });
  const data = response.json();
  return data;
}


export async function checkLoggedInUser(loginInfo) {
  try {
    const response = await api.post("users/login", loginInfo, {
      headers: { "Content-Type": "application/json" },
    });

    if(response.status===201){
      const data =await response.data;
      return data
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    throw { message: error.response.data.error };
  }
}

export async function checkAuth(){
  try {
    const response = await api.get("users/check", { withCredentials: true });
    const data=await response.json()
    return data

  } catch (error) {
    throw { message: error.response.data.error };
  }
}

// eslint-disable-next-line no-unused-vars
export async function signOut(userId) {
  const response = `signout`;
  return response;
}
