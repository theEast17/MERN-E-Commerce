export async function fetchAllProducts(){
    const response=await fetch(`http://localhost:3000/products?limit=70`)
    const data =await response.json()
    return data
}


export async function fetchProductsByFilter(filter){
    // let queryString='';
    // for(let key in filter){
    //     queryString+=`${key}=${filter[key]}&`
    // }
    const response=await fetch(`http://localhost:3000/products/category/${filter}`)
    const data =await response.json()
    console.log(data)
    return data.products
}

export async function fetchBrands(){
    const response=await fetch(`http://localhost:3000/brands`)
    const data =await response.json()
    return data
}
export async function fetchProductById(id){
    const response=await fetch(`http://localhost:3000/products/${id}`)
    const data =await response.json()
    console.log(data)
    return data
}

export async function fetchCategories(){
    const response=await fetch(`http://localhost:3000/categories`)
    const data =await response.json()
    return data
}

