import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export async function createUser(userData) {
  const response = await fetch(`http://localhost:5000/users`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "content-type": "application/json" },
  });
  const data = response.json();
  return data;
}

export async function checkLoggedInUser(loginInfo) {
  try {
    const email = loginInfo.email;
    const password = loginInfo.password;
    
    const response = await api.get(`users?email=${email}`);
    const data = response.data;
    
    if (data.length) {
      if (password === data[0].password) {
        return { data: data[0] };
      } else {
        throw new Error('wrong credentials');
      }
    } else {
      throw new Error('user not found');
    }
  } catch (error) {
    throw { message: error.message };
  }
}

