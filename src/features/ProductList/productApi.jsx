export async function fetchAllProducts(){
    const response=await fetch(`https://dummyjson.com/products?limit=70`)
    const data =await response.json()
    return data.products
}


export async function fetchProductsByFilter(filter){
    // let queryString='';
    // for(let key in filter){
    //     queryString+=`${key}=${filter[key]}&`
    // }
    const response=await fetch(`https://dummyjson.com/products/category/${filter}`)
    const data =await response.json()
    console.log(data)
    return data.products
}

