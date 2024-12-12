export async function getProducts() {
  const response = await fetch("http://localhost:3001/products");
  if (response.ok) return response.json();
  throw response;
}
export async function getCartItems() {
  const response = await fetch("http://localhost:3001/cart/items");
  if (response.ok) return response.json();
  throw response;
}
