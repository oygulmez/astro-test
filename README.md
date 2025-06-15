# E-Shop - Modern E-commerce Platform

Modern, minimal ve profesyonel e-ticaret platformu. WordPress backend ve Astro frontend ile geliştirilmiştir.

## 🚀 Teknoloji Stack

### Frontend (Astro)
- **Astro v5.9.3** - Modern web framework
- **React** - UI bileşenleri
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI component library
- **Zustand** - Lightweight state management

### Backend (WordPress)
- **WordPress** - Content management system
- **WooCommerce** - E-commerce plugin
- **REST API** - API entegrasyonu

## 📁 Proje Yapısı

```
astro-wp/
├── app/
│   └── ecommerce-frontend/     # Astro frontend uygulaması
│       ├── src/
│       │   ├── components/     # React bileşenleri
│       │   ├── pages/         # Astro sayfaları
│       │   ├── layouts/       # Layout bileşenleri
│       │   ├── stores/        # Zustand state management
│       │   └── services/      # API servisleri
│       └── public/            # Statik dosyalar
├── src/                       # WordPress kaynak dosyaları
└── conf/                      # Konfigürasyon dosyaları
```

## 🛍️ Özellikler

### E-commerce Özellikleri
- ✅ Modern ve responsive tasarım
- ✅ Ürün listeleme ve detay sayfaları
- ✅ Sepet yönetimi (tüm sayfalarda çalışır)
- ✅ Checkout sistemi
- ✅ WooCommerce API entegrasyonu
- ✅ Sipariş yönetimi
- ✅ Türkçe karakter desteği

### Teknik Özellikler
- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG)
- ✅ TypeScript desteği
- ✅ Responsive tasarım
- ✅ SEO optimizasyonu
- ✅ Modern UI/UX

## 🔧 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- WordPress + WooCommerce

### Frontend Kurulumu

```bash
cd app/ecommerce-frontend
npm install
npm run dev
```

### WooCommerce API Konfigürasyonu

1. WordPress admin panelinde WooCommerce > Settings > Advanced > REST API
2. Yeni API key oluşturun
3. `src/services/wordpress.ts` dosyasında API bilgilerini güncelleyin:

```typescript
const API_URL = 'http://your-wordpress-site.local/wp-json/wc/v3';
const CONSUMER_KEY = 'your-consumer-key';
const CONSUMER_SECRET = 'your-consumer-secret';
```

## 🎨 Tasarım

### Tasarım Prensipleri
- **Minimal**: Temiz ve sade arayüz
- **Profesyonel**: İş dünyasına uygun görünüm
- **Responsive**: Tüm cihazlarda mükemmel görünüm
- **Accessible**: Erişilebilirlik standartlarına uygun

### Renk Paleti
- **Primary**: Siyah (#000000)
- **Secondary**: Gri tonları
- **Accent**: Beyaz (#FFFFFF)
- **Success**: Yeşil
- **Error**: Kırmızı

## 📱 Sayfalar

- **Anasayfa** (`/`) - Hero section, öne çıkan ürünler
- **Ürünler** (`/products`) - Tüm ürünler listesi
- **Kategoriler** (`/categories`) - Ürün kategorileri
- **Sepet** (`/cart`) - Sepet yönetimi
- **Checkout** (`/checkout`) - Ödeme sayfası
- **Hakkımızda** (`/about`) - Şirket bilgileri
- **İletişim** (`/contact`) - İletişim formu

## 🔌 API Entegrasyonu

### WooCommerce REST API
- Ürün listeleme
- Kategori yönetimi
- Sipariş oluşturma
- Müşteri yönetimi

### Örnek API Kullanımı

```typescript
// Ürünleri getir
const products = await getProducts();

// Sipariş oluştur
const order = await createOrder({
  billing: customerData,
  line_items: cartItems
});
```

## 🚀 Deployment

### Frontend Deployment
```bash
cd app/ecommerce-frontend
npm run build
```

### Production Build
- Astro static files: `dist/` klasörü
- WordPress: Mevcut hosting üzerinde

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Geliştirici**: Ömer Yalçın Gülmez
- **GitHub**: [@oygulmez](https://github.com/oygulmez)
- **Repository**: [astro-test](https://github.com/oygulmez/astro-test)

## 🔄 Güncellemeler

### v1.0.0 (2024-06-15)
- İlk sürüm yayınlandı
- Astro + React frontend
- WooCommerce API entegrasyonu
- Minimal tasarım implementasyonu
- Türkçe karakter desteği
- Sepet ve checkout sistemi 