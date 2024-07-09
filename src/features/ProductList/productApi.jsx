export async function fetchAllProducts() {
  const response = await fetch(`http://localhost:5000/products?limit=70`);
  const data = await response.json();
  return data;
}

export async function fetchProductsByFilter(filter) {
  // let queryString='';
  // for(let key in filter){
  //     queryString+=`${key}=${filter[key]}&`
  // }
  const response = await fetch(
    `http://localhost:5000/products/category/${filter}`
  );
  const data = await response.json();
  return data.products;
}
export async function fetchBrands() {
  const response = await fetch(`http://localhost:5000/brands`);
  const data = await response.json();
  return data;
}
export async function fetchCategories() {
  const response = await fetch(`http://localhost:5000/categories`);
  const data = await response.json();
  return data;
}
export async function fetchProductById(id) {
  const response = await fetch(`http://localhost:5000/products/${id}`);
  const data = await response.json();
  return data;
}

export async function createProduct(product) {
  const response = await fetch("http://localhost:5000/products/", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export async function updateProduct(update) {
  const response = await fetch("http://localhost:5000/products/" + update.id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  // TODO: on server it will only return some info of user (not password)
  return data;
}
