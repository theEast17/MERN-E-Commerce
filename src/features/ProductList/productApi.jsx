export async function fetchAllProducts() {
  const response = await fetch(`http://localhost:5000/products`);
  const data = await response.json();
  return data;
}

export async function fetchProductsByFilter(filter, sort, pagination) {
  let queryString = "";
  for (let key in filter) {
    const categoryValue = filter[key];
    if (categoryValue.length) {
      const lastCategoryValue = categoryValue[categoryValue.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  const response = await fetch("http://localhost:5000/products?" + queryString);

  
  const totalItems =await response.headers.get("X-Total-Count");

  const data = await response.json();
  return { data: { products: data, totalItems } };
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
