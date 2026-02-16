export async function getProducts() {
  const data = await fetch('http://localhost:4000/api/products');
  return data.json();
}

export async function getProduct(id: number) {
  const data = await fetch(`http://localhost:4000/api/products/${id}`);
  return data.json();
}

export async function createProduct(productData: any) {
  const res = await fetch('http://localhost:4000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  // return data;
  console.log(data);
}

export async function deleteProduct(id: number) {
  const res = await fetch(`http://localhost:4000/api/products/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

