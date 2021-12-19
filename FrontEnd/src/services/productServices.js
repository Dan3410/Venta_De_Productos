export async function getAllItems(){
    const response = await fetch('/products');
    return await response.json();
}

export async function getItemById(id){
    const response = await fetch(`/detalles/${id}`)
    return await response.json()
}

export async function updateProductDataById(id,userName, token,newData){
    const response = await fetch(`/gestion_productos/${id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userName: userName, token: token, newData: newData})
    })
    return await response.json()
}

export async function createProductById(userName, token,newData){
    const response = await fetch(`/gestion_productos`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userName: userName, token: token, newData: newData})
    })
    return await response.json()
}

export async function deleteProductById(id,userName,token){
    const response = await fetch(`/gestion_productos/${id}`,{
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userName: userName, token: token})
    })
    return await response.json
}