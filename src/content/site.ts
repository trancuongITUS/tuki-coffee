/**
 * Thông tin quán Tuki Coffee — nguồn nội dung duy nhất cho toàn website.
 *
 * NỘI DUNG TẠM: mọi mục có chú thích `PLACEHOLDER` là giá trị mẫu để dựng
 * giao diện. Thay bằng thông tin thật của quán trước khi public.
 */

/** Giờ mở cửa trong ngày theo giờ Việt Nam, dạng "HH:MM"; `null` là nghỉ. */
export type DayHours = { open: string; close: string } | null

export type Review = {
  author: string
  /** 1–5 sao, lấy nguyên văn từ nguồn. */
  rating: number
  text: string
  /** Link tới đánh giá gốc (Google Maps). */
  sourceUrl: string
}

export type GalleryItem = {
  caption: string
  alt: string
  /** Ảnh thật trong `public/` (AVIF/WebP). Bỏ trống thì hiện khung ảnh tạm. */
  src?: string
}

export type SocialLink = { label: string; href: string }

type Site = {
  name: string
  tagline: string
  description: string
  timeZone: string
  address: { street: string; area: string; city: string }
  phone: { display: string; tel: string }
  hours: DayHours[]
  socials: SocialLink[]
  hero: { lead: string }
  story: {
    paragraphs: string[]
    values: { icon: 'bean' | 'flame' | 'hand-heart'; title: string; text: string }[]
  }
  gallery: GalleryItem[]
  reviews: Review[]
}

export const site: Site = {
  name: 'Tuki Coffee',
  tagline: 'Rang mộc · Pha tận tâm',
  description:
    'Tuki Coffee — quán cà phê rang mộc, pha tận tâm. Xem menu, giờ mở cửa và đường tới quán.',
  timeZone: 'Asia/Ho_Chi_Minh',

  // PLACEHOLDER: địa chỉ thật của quán.
  address: {
    street: '123 Lê Lợi',
    area: 'Phường Bến Thành',
    city: 'TP. Hồ Chí Minh',
  },

  // PLACEHOLDER: số điện thoại thật.
  phone: { display: '0900 000 000', tel: '+84900000000' },

  // PLACEHOLDER: giờ mở cửa thật. Chỉ số theo Date#getDay: 0 = Chủ nhật … 6 = Thứ 7.
  hours: [
    { open: '07:00', close: '22:00' },
    { open: '07:00', close: '22:00' },
    { open: '07:00', close: '22:00' },
    { open: '07:00', close: '22:00' },
    { open: '07:00', close: '22:00' },
    { open: '07:00', close: '22:00' },
    { open: '07:00', close: '22:00' },
  ],

  // PLACEHOLDER: đường dẫn trang mạng xã hội của quán.
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/' },
  ],

  hero: {
    // PLACEHOLDER: câu giới thiệu ngắn của quán.
    lead: 'Hạt rang vừa tới, pha chậm từng ly. Ghé Tuki để chậm lại một chút giữa ngày bận rộn.',
  },

  story: {
    // PLACEHOLDER: câu chuyện thật của quán.
    paragraphs: [
      'Tuki là một góc nhỏ để chậm lại. Chúng tôi chọn hạt kỹ, rang vừa tới để giữ vị ngọt tự nhiên, rồi pha từng ly bằng tay.',
      'Không vội, không ồn ào — chỉ là một ly cà phê ngon và một chỗ ngồi dễ chịu cho bạn.',
    ],
    values: [
      { icon: 'bean', title: 'Hạt chọn lọc', text: 'Hạt Việt Nam, chọn theo từng mùa.' },
      { icon: 'flame', title: 'Rang vừa tới', text: 'Giữ vị ngọt, bớt đắng gắt.' },
      { icon: 'hand-heart', title: 'Pha tận tay', text: 'Mỗi ly một lần pha, không pha sẵn.' },
    ],
  },

  // PLACEHOLDER: thay `src` bằng ảnh thật của quán; mục chưa có ảnh hiện khung tạm.
  gallery: [
    { caption: 'Quầy pha chế', alt: 'Quầy pha chế của Tuki Coffee' },
    { caption: 'Góc cửa sổ', alt: 'Bàn cạnh cửa sổ đón nắng sớm' },
    { caption: 'Máy rang', alt: 'Máy rang cà phê tại quán' },
    { caption: 'Bàn dài', alt: 'Bàn gỗ dài cho nhóm bạn' },
    { caption: 'Góc đọc sách', alt: 'Góc ghế bành và kệ sách' },
    { caption: 'Sân sau', alt: 'Sân sau có cây xanh' },
  ],

  // Chỉ thêm đánh giá thật, chép nguyên văn kèm link nguồn. Mảng rỗng thì section "Khách nói gì" tự ẩn.
  reviews: [],
}

export const fullAddress = `${site.address.street}, ${site.address.area}, ${site.address.city}`

const destination = encodeURIComponent(`${site.name}, ${fullAddress}`)
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`
export const mapEmbedUrl = `https://www.google.com/maps?q=${destination}&output=embed`
