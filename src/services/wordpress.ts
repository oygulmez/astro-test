import axios from 'axios'

const WORDPRESS_URL = 'http://astro-wp.local'
const CONSUMER_KEY = 'ck_af8ecd721a855a721f8c0b92c29411de1e20491f'
const CONSUMER_SECRET = 'cs_1dac92eeaea9a1ef3f7395ada5450dadbed721b8'

// WordPress REST API için
const wpApi = axios.create({
  baseURL: `${WORDPRESS_URL}/wp-json/wp/v2/`,
  timeout: 10000,
})

// WooCommerce REST API için - URL parametreleri ile
const wcApi = axios.create({
  baseURL: `${WORDPRESS_URL}/wp-json/wc/v3/`,
  timeout: 10000,
  params: {
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET
  }
})

export interface WordPressPost {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  featured_media: number
  slug: string
  date: string
  modified: string
  author: number
  categories: number[]
  tags: number[]
  _links: any
}

export interface WordPressProduct {
  id: number
  name: string
  slug: string
  type: string
  status: string
  featured: boolean
  catalog_visibility: string
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  price_html: string
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  images: Array<{
    id: number
    src: string
    name: string
    alt: string
  }>
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  stock_status: string
  stock_quantity: number | null
  attributes: any[]
  variations: number[]
  average_rating: string
  rating_count: number
  date_created: string
  date_modified: string
}

export interface WordPressCategory {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  parent: number
}

// Posts
export const getPosts = async (page: number = 1, perPage: number = 10): Promise<WordPressPost[]> => {
  try {
    const response = await wpApi.get(`posts?page=${page}&per_page=${perPage}&_embed`)
    return response.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const getPostBySlug = async (slug: string): Promise<WordPressPost | null> => {
  try {
    const response = await wpApi.get(`posts?slug=${slug}&_embed`)
    return response.data[0] || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Products - Önce WooCommerce API'yi dene, sonra WordPress posts'u kullan
export const getProducts = async (page: number = 1, perPage: number = 12): Promise<WordPressProduct[]> => {
  try {
    // Önce WooCommerce API'yi dene
    console.log('WooCommerce API deneniyor...')
    const wcResponse = await axios.get(`${WORDPRESS_URL}/wp-json/wc/v3/products`, {
      params: {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        page,
        per_page: perPage
      },
      timeout: 5000
    })
    
    if (wcResponse.data && wcResponse.data.length > 0) {
      console.log('✅ WooCommerce API çalışıyor! Gerçek ürünler yükleniyor...')
      return wcResponse.data
    }
  } catch (wcError) {
    console.log('❌ WooCommerce API çalışmıyor, WordPress posts kullanılıyor...')
  }
  
  try {
    // WooCommerce çalışmazsa WordPress blog yazılarını çek
    const response = await wpApi.get(`posts?page=${page}&per_page=${perPage}&_embed`)
    const posts = response.data
    
    // Blog yazılarını ürün formatına çevir
    const products: WordPressProduct[] = posts.map((post: any, index: number) => ({
      id: post.id,
      name: post.title.rendered,
      slug: post.slug,
      type: "simple",
      status: "publish",
      featured: index < 4, // İlk 4 ürünü öne çıkan yap
      catalog_visibility: "visible",
      description: post.content.rendered,
      short_description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
      sku: `POST-${post.id}`,
      price: `${(Math.random() * 500 + 50).toFixed(2)}`,
      regular_price: `${(Math.random() * 600 + 100).toFixed(2)}`,
      sale_price: `${(Math.random() * 400 + 50).toFixed(2)}`,
      price_html: `${(Math.random() * 500 + 50).toFixed(2)} TL`,
      on_sale: Math.random() > 0.5,
      purchasable: true,
      total_sales: Math.floor(Math.random() * 200),
      virtual: false,
      downloadable: false,
      images: [
        {
          id: post.id,
          src: `https://images.unsplash.com/photo-${1500000000000 + post.id}?w=400&h=300&fit=crop`,
          name: post.title.rendered,
          alt: post.title.rendered
        }
      ],
      categories: [
        {
          id: 1,
          name: "Blog Ürünleri",
          slug: "blog-urunleri"
        }
      ],
      stock_status: "instock",
      stock_quantity: Math.floor(Math.random() * 100) + 10,
      attributes: [],
      variations: [],
      average_rating: (Math.random() * 2 + 3).toFixed(1),
      rating_count: Math.floor(Math.random() * 50) + 5,
      date_created: post.date,
      date_modified: post.modified
    }))
    
    console.log(`${products.length} blog yazısı ürün olarak dönüştürüldü`)
    return products
    
  } catch (error: any) {
    console.error('WordPress posts da çekilemedi:', error)
    return []
  }
}

export const getProductBySlug = async (slug: string): Promise<WordPressProduct | null> => {
  try {
    const response = await wcApi.get('products', {
      params: {
        slug
      }
    })
    return response.data[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export const getFeaturedProducts = async (limit: number = 8): Promise<WordPressProduct[]> => {
  try {
    const response = await wcApi.get('products', {
      params: {
        featured: true,
        per_page: limit
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

export const getProductsByCategory = async (categoryId: number, page: number = 1, perPage: number = 12): Promise<WordPressProduct[]> => {
  try {
    const response = await wcApi.get('products', {
      params: {
        category: categoryId,
        page,
        per_page: perPage
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

// Categories
export const getCategories = async (): Promise<WordPressCategory[]> => {
  try {
    const response = await wpApi.get('categories')
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export const getProductCategories = async (): Promise<WordPressCategory[]> => {
  try {
    const response = await wcApi.get('products/categories')
    return response.data
  } catch (error) {
    console.error('Error fetching product categories:', error)
    return []
  }
}

// Test fonksiyonu - API bağlantısını test etmek için
export const testWooCommerceAPI = async (): Promise<boolean> => {
  try {
    console.log('Testing WooCommerce API connection...')
    
    // Method 1: URL Parameters
    try {
      const response1 = await axios.get(`${WORDPRESS_URL}/wp-json/wc/v3/products`, {
        params: {
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
          per_page: 1
        },
        timeout: 5000
      })
      console.log('✅ URL Parameters method works!')
      return true
    } catch (e) {
      console.log('❌ URL Parameters method failed')
    }
    
    // Method 2: Basic Auth
    try {
      const response2 = await axios.get(`${WORDPRESS_URL}/wp-json/wc/v3/products`, {
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET
        },
        params: { per_page: 1 },
        timeout: 5000
      })
      console.log('✅ Basic Auth method works!')
      return true
    } catch (e) {
      console.log('❌ Basic Auth method failed')
    }
    
    // Method 3: Authorization Header
    try {
      const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')
      const response3 = await axios.get(`${WORDPRESS_URL}/wp-json/wc/v3/products`, {
        headers: {
          'Authorization': `Basic ${credentials}`
        },
        params: { per_page: 1 },
        timeout: 5000
      })
      console.log('✅ Authorization Header method works!')
      return true
    } catch (e) {
      console.log('❌ Authorization Header method failed')
    }
    
    console.log('❌ All authentication methods failed')
    return false
  } catch (error) {
    console.error('API test failed:', error)
    return false
  }
} 