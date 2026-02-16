export async function getProducts() {
  const data = await fetch('http://localhost:4000/api/products');
  return data.json();
}

export async function getProduct(id: number) {
  const res = await fetch(`http://localhost:4000/api/products/${id}`);
  
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch product: ${res.statusText}`);
  }
  
  return res.json();
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

export async function updateProduct(id: number, productData: any) {
  const res = await fetch(`http://localhost:4000/api/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  return res.json();
}

export async function deleteProduct(id: number) {
  const res = await fetch(`http://localhost:4000/api/products/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

