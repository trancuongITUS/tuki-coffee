/**
 * Menu Tuki Coffee.
 *
 * NỘI DUNG TẠM (PLACEHOLDER): tên món, mô tả và giá dưới đây là mẫu để dựng
 * giao diện. Thay bằng menu thật trước khi public. Khi có ảnh món thật, thêm
 * `image` (AVIF/WebP trong `public/`, tỉ lệ 4:5) và minh hoạ sẽ tự được thay.
 */

export type CategoryId = 'ca-phe' | 'tra' | 'banh'

export type MenuTag = 'signature' | 'moi' | 'thuan-chay'

/** Minh hoạ tạm trong lúc chờ ảnh thật. */
export type ArtShape = 'cup' | 'glass' | 'cake'
export type ArtTone = 'caramel' | 'espresso' | 'matcha' | 'latte'

export type MenuItem = {
  id: string
  name: string
  category: CategoryId
  /** Giá theo đồng. */
  price: number
  description: string
  tags?: MenuTag[]
  /** Hiện trong section "Món đặc trưng" ở trang chủ. */
  featured?: boolean
  art: { shape: ArtShape; tone: ArtTone }
  image?: { src: string; alt: string }
}

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'ca-phe', label: 'Cà phê' },
  { id: 'tra', label: 'Trà' },
  { id: 'banh', label: 'Bánh' },
]

export const tagLabels: Record<MenuTag, string> = {
  signature: 'Signature',
  moi: 'Mới',
  'thuan-chay': 'Thuần chay',
}

export const menu: MenuItem[] = [
  {
    id: 'ca-phe-muoi',
    name: 'Cà phê muối',
    category: 'ca-phe',
    price: 45000,
    description: 'Kem muối béo nhẹ trên nền phin đậm, hậu vị mằn mặn.',
    tags: ['signature'],
    featured: true,
    art: { shape: 'cup', tone: 'caramel' },
  },
  {
    id: 'ca-phe-den',
    name: 'Cà phê phin đen',
    category: 'ca-phe',
    price: 29000,
    description: 'Robusta rang vừa, pha phin chậm, đậm mà không gắt.',
    art: { shape: 'cup', tone: 'espresso' },
  },
  {
    id: 'ca-phe-sua-da',
    name: 'Cà phê sữa đá',
    category: 'ca-phe',
    price: 32000,
    description: 'Phin đậm hoà sữa đặc, uống với đá viên.',
    art: { shape: 'glass', tone: 'latte' },
  },
  {
    id: 'bac-xiu',
    name: 'Bạc xỉu',
    category: 'ca-phe',
    price: 39000,
    description: 'Sữa nhiều, cà phê ít, ngọt dịu cho buổi chiều.',
    featured: true,
    art: { shape: 'glass', tone: 'espresso' },
  },
  {
    id: 'cold-brew-cam-sa',
    name: 'Cold brew cam sả',
    category: 'ca-phe',
    price: 52000,
    description: 'Ủ lạnh 16 giờ, thêm cam tươi và sả thơm.',
    tags: ['moi'],
    art: { shape: 'glass', tone: 'caramel' },
  },
  {
    id: 'ca-phe-dua',
    name: 'Cà phê cốt dừa',
    category: 'ca-phe',
    price: 49000,
    description: 'Cốt dừa đá xay béo mịn, rưới espresso.',
    art: { shape: 'glass', tone: 'latte' },
  },
  {
    id: 'matcha-latte',
    name: 'Matcha latte',
    category: 'tra',
    price: 49000,
    description: 'Matcha đánh tay cùng sữa tươi, vị chát thanh.',
    tags: ['moi'],
    featured: true,
    art: { shape: 'glass', tone: 'matcha' },
  },
  {
    id: 'tra-dao-cam-sa',
    name: 'Trà đào cam sả',
    category: 'tra',
    price: 45000,
    description: 'Trà đen, đào miếng, cam và sả đập dập.',
    art: { shape: 'glass', tone: 'caramel' },
  },
  {
    id: 'o-long-sua',
    name: 'Trà ô long sữa',
    category: 'tra',
    price: 42000,
    description: 'Ô long rang thơm, sữa tươi, ít ngọt.',
    art: { shape: 'cup', tone: 'latte' },
  },
  {
    id: 'tra-sen',
    name: 'Trà sen vàng',
    category: 'tra',
    price: 45000,
    description: 'Trà xanh ướp sen, hạt sen bùi, thạch củ năng.',
    tags: ['thuan-chay'],
    art: { shape: 'cup', tone: 'matcha' },
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    category: 'banh',
    price: 49000,
    description: 'Bánh ngấm espresso của quán, kem mascarpone mềm.',
    tags: ['signature'],
    featured: true,
    art: { shape: 'cake', tone: 'espresso' },
  },
  {
    id: 'banh-chuoi',
    name: 'Bánh chuối nướng',
    category: 'banh',
    price: 35000,
    description: 'Chuối chín nướng thơm, không trứng, không bơ sữa.',
    tags: ['thuan-chay'],
    art: { shape: 'cake', tone: 'caramel' },
  },
  {
    id: 'croissant',
    name: 'Croissant bơ',
    category: 'banh',
    price: 39000,
    description: 'Vỏ giòn nhiều lớp, nướng mới mỗi sáng.',
    art: { shape: 'cake', tone: 'latte' },
  },
  {
    id: 'bong-lan-trung-muoi',
    name: 'Bông lan trứng muối',
    category: 'banh',
    price: 42000,
    description: 'Bông lan mềm, sốt bơ trứng và chà bông.',
    art: { shape: 'cake', tone: 'matcha' },
  },
]

export const featuredItems = menu.filter((item) => item.featured)

const priceFormat = new Intl.NumberFormat('vi-VN')

/** 45000 → "45.000đ" */
export function formatPrice(price: number) {
  return `${priceFormat.format(price)}đ`
}
