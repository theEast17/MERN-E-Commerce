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
    // by using this api endpoint you will get the whole information about the user accordint to their email id
    const response = await api.post("users/login", loginInfo, {
      headers: { "Content-Type": "application/json" },
    });

    if(response.status===200){
      const data = await response.data;
      return data
    } else {
      throw new Error("user not found");
    }
  } catch (error) {
    throw { message: error.response.data.error };
  }
}

export async function signOut(userId) {
  const response = `signout`;
  return response;
}
