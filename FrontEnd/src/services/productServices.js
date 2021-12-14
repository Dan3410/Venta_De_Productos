export async function getAllItems(){
    const response = await fetch('/products');
    return await response.json();
}

export async function getItemById(id){
    const response = await fetch(`/detalles/${id}`)
    return await response.json()
}