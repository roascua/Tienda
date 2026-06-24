import {
  createDirectus,
  rest,
  authentication,
  readItems,
  readItem,
  createItem,
  updateItem,
  deleteItem,
} from '@directus/sdk'

export interface ProductItem {
  id: number
  name: string
  brand: string
  category: string
  price: number
  image: string | null
  isNew: boolean
  discount: number | null
  status: string
  sort: number | null
  date_created: string | null
  date_updated: string | null
}

export type ProductInput = Omit<
  ProductItem,
  'id' | 'date_created' | 'date_updated'
>

type MySchema = {
  products: ProductItem[]
}

// Usa .env si existe, si no usa la IP actual de Directus
const directusUrl =
  import.meta.env.VITE_DIRECTUS_URL ||
  'http://192.168.1.4:8055'

console.log('Directus URL:', directusUrl)

export const directus = createDirectus<MySchema>(directusUrl)
  .with(authentication('json', { autoRefresh: true }))
  .with(rest())

export async function fetchProducts() {
  return directus.request(
    readItems('products', {
      filter: {
        status: {
          _eq: 'published',
        },
      },
      sort: ['sort', 'name'],
    }),
  )
}

export async function fetchAllProducts() {
  return directus.request(
    readItems('products', {
      sort: ['sort', 'name'],
    }),
  )
}

export async function fetchProduct(id: number) {
  return directus.request(readItem('products', id))
}

export async function createProduct(data: ProductInput) {
  return directus.request(createItem('products', data))
}

export async function updateProduct(
  id: number,
  data: Partial<ProductInput>,
) {
  return directus.request(
    updateItem('products', id, data),
  )
}

export async function deleteProduct(id: number) {
  return directus.request(deleteItem('products', id))
}

export async function loginAdmin(
  email: string,
  password: string,
) {
  return directus.login({
    email,
    password,
  })
}

export async function logoutAdmin() {
  return directus.logout()
}

export function getToken() {
  return directus.getToken()
}

