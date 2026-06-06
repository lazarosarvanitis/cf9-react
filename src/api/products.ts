import {type Product} from "../schemas/products"

const API_URL = import.meta.env.VITE_API_URL
const TENANT_ID = import.meta.env.VITE_TENANT_ID

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/tenants/${TENANT_ID}/products/`)
  if (!res.ok) throw new Error("Failed to fetch products")
  const data = await res.json()
  console.log("products res: " + data)
  return data;
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/tenants/${TENANT_ID}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product")
  return await res.json()
}

export async function updateProduct(
  id: number,
  data: {
    description?: string | undefined;
    image?: string | undefined;
    is_active: boolean;
    is_favorite: boolean;
    name: string;
    price: number;
    slug: string;
    sort: number;
  },
) {
  const res = await fetch(`${API_URL}/tenants/${TENANT_ID}/products/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update product")
  return await res.json()
}

export async function createProduct(data: Omit<Product, "id">): Promise<Product> {
  const res = await fetch(`${API_URL}/tenants/${TENANT_ID}/products/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create product")
  return await res.json()
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/tenants/${TENANT_ID}/products/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete product")
}