# Tuki Coffee — Design System (Master)

Nguồn chuẩn cho mọi quyết định giao diện của website Tuki Coffee. Khi dựng một
trang cụ thể, đọc file này trước; nếu có `pages/<tên-trang>.md` thì các quy tắc
trong đó ghi đè Master.

- Tokens (CSS, nguồn giá trị duy nhất): [`tokens/tokens.css`](tokens/tokens.css)
- Cầu nối Tailwind v4 (đăng ký token thành utility): [`tokens/tailwind-theme.css`](tokens/tailwind-theme.css)
- Motion tokens (DTCG, nguồn gốc của phần motion): [`tokens/motion.tokens.json`](tokens/motion.tokens.json)
- Trang xem trước trực quan: [`preview.html`](preview.html) (mở trực tiếp bằng trình duyệt)

Quy tắc cứng: component chỉ đọc biến CSS. Mã hex hay giá trị `ms` viết thẳng
trong component là lỗi cần sửa khi review.

## 1. Mục tiêu website

| # | Mục tiêu | Tiêu chí kiểm được |
|---|----------|--------------------|
| 1 | Giao diện bắt mắt | Mỗi màn hình có một điểm nhấn màu (khối espresso hoặc cam Tuki) và một ảnh sản phẩm lớn; tiêu đề dùng Fraunces cỡ lớn. |
| 2 | Chuyển động mượt mà | Chỉ animate `transform`, `opacity`, `clip-path`; mọi thời lượng lấy từ token; có nhánh reduced-motion; giữ 60fps trên điện thoại tầm trung. |
| 3 | Thông tin thiết yếu trong một chạm | Giờ mở cửa, trạng thái "Đang mở / Đã đóng", địa chỉ + nút chỉ đường, menu có giá đều truy cập được từ header hoặc màn hình đầu tiên trên mobile. |
| 4 | Nhanh trên điện thoại | Phần lớn khách mở web từ Google Maps, mạng xã hội hoặc QR tại bàn. LCP < 2.5s, CLS < 0.1, INP < 200ms trên 4G. |
| 5 | Ảnh sản phẩm là nhân vật chính | Ảnh thật, ánh sáng ấm, tỉ lệ cố định (card 4:5, hero 16:9 desktop / 4:5 mobile); AVIF/WebP, lazy-load ngoài màn hình đầu. |
| 6 | Dễ tiếp cận, tiếng Việt chuẩn | WCAG 2.2 AA; font có bộ dấu tiếng Việt đầy đủ; bàn phím dùng được toàn bộ; focus ring luôn nhìn thấy. |
| 7 | Hành động chính rõ ràng | CTA chính của toàn site là **"Xem menu"** (cam Tuki). Mỗi màn hình chỉ thấy đúng một CTA chính; "Chỉ đường" là CTA phụ. |

Mục 3–7 là đề xuất bổ sung cho mục "…" trong yêu cầu ban đầu.

## 2. Phong cách: "Warm Craft Bold"

Kết hợp hai hướng mà bộ phân tích gợi ý:

- **Nature Distilled** (ấm, thủ công): nền kem, tông nâu rang, lớp grain rất nhẹ, bóng đổ ngả nâu thay vì xám, hình khối bo mềm dạng "blob".
- **Vibrant & Block-based** (bắt mắt): khối màu lớn tương phản cao (section espresso nền tối xen kẽ section kem), chữ tiêu đề rất lớn, khoảng trắng rộng (48px+).

Lý do không dùng nguyên "Vibrant & Block-based": phong cách đó nhắm tới gaming/startup và palette gốc là xanh dương, không hợp cảm giác quán cà phê. Giữ lại phần "khối màu + chữ lớn" để bắt mắt, còn chất liệu và màu lấy từ Nature Distilled để giữ sự ấm áp.

**Không làm:** glassmorphism, gradient neon, 3D/WebGL nặng, emoji làm icon, ảnh stock mờ nhạt, ẩn giờ mở cửa trong footer.

### Logo tạm thời

Tuki chưa có logo; logo chính thức sẽ được thiết kế sau, dựa trên design system này. Trong lúc chờ:

- Dùng wordmark chữ **"Tuki Coffee"** bằng Fraunces 700, `font-variation-settings: var(--display-variation)`, màu `--color-primary`.
- Đặt wordmark trong một component `Logo` duy nhất để thay logo thật ở một chỗ.
- Brief cho logo sau này: dùng palette ở mục 3 (rang đậm + cam Tuki hoặc caramel), chạy được ở một màu trên cả nền kem lẫn nền espresso, đọc rõ ở 32px (favicon, header mobile).

## 3. Màu sắc

Mọi cặp chữ/nền dưới đây đã đo theo công thức WCAG.

### Light — "quán sáng" (mặc định)

| Token | Hex | Vai trò | Tương phản |
|-------|-----|---------|-----------|
| `--color-bg` | `#FBF6EE` | Nền trang (kem sữa) | — |
| `--color-surface` | `#FFFFFF` | Card, form | — |
| `--color-surface-alt` | `#F3E8D8` | Section xen kẽ (latte) | chữ 13.8:1 |
| `--color-surface-inverse` | `#2B1A12` | Khối espresso nổi bật | chữ kem 15.5:1 |
| `--color-text` | `#2B1A12` | Chữ chính | 15.5:1 |
| `--color-text-muted` | `#6B5646` | Chữ phụ, mô tả | 6.4:1 |
| `--color-primary` | `#6F3B1F` | Link, tiêu đề nhấn, nút phụ | 8.4:1 |
| `--color-accent` | `#C2410C` | **CTA chính** (cam Tuki) | chữ trắng 5.2:1 |
| `--color-highlight` | `#F2B544` | Nền nhãn "Signature", gạch chân trang trí | — |
| `--color-on-highlight` | `#2B1A12` | Chữ trên nền caramel | 9.1:1 |
| `--color-fresh` | `#4F6B3A` | Nhãn "Mới", "Thuần chay" | chữ trắng 6.0:1 |
| `--color-border` | `#E6D6C1` | Đường kẻ trang trí | chỉ trang trí |
| `--color-border-strong` | `#9A7F68` | Viền input, control | 3.5:1 (đạt 1.4.11) |

### Dark — "quán đêm"

Tự bật theo `prefers-color-scheme`, có thể ép bằng `data-theme="dark|light"` trên `<html>`.

| Token | Hex | Tương phản |
|-------|-----|-----------|
| `--color-bg` | `#1A110C` | — |
| `--color-surface` | `#26190F` | chữ 14.8:1 |
| `--color-text` | `#F7EDE0` | 16.1:1 |
| `--color-text-muted` | `#C9B6A3` | 9.5:1 |
| `--color-primary` | `#E8B98A` | 10.4:1 |
| `--color-accent` | `#F07A45` | chữ espresso 6.7:1 |
| `--color-fresh` | `#9CBB84` | 8.7:1 |
| `--color-border-strong` | `#7D644F` | 3.4:1 |

Quy tắc dùng màu:

- Cam Tuki chỉ dành cho CTA chính và focus ring. Dùng nhiều sẽ mất tác dụng dẫn mắt.
- Caramel `--color-highlight` là màu nền, không dùng làm màu chữ trên nền kem (không đủ tương phản). Chữ trên caramel luôn dùng `--color-on-highlight`.
- Trạng thái "Đang mở cửa" dùng màu **kèm chữ và icon**, không chỉ dựa vào màu.

## 4. Typography

| Vai trò | Font | Lý do |
|---------|------|-------|
| Display / tiêu đề | **Fraunces** (variable: `opsz`, `wght`, `SOFT`, `WONK`, có italic) | Serif mềm, có "cá tính" thủ công; trục `SOFT 100` cho nét bo ấm áp. Hỗ trợ tiếng Việt. |
| Body / UI | **Be Vietnam Pro** 400–700 | Thiết kế riêng cho tiếng Việt, dấu đặt chuẩn, rất dễ đọc trên mobile. |

Website hiện chỉ có tiếng Việt: `<html lang="vi">`, chỉ tải subset `latin` + `vietnamese` (cần cả `latin` cho ký tự không dấu và số).

Bộ phân tích gợi ý Playfair Display SC + Karla, nhưng **Karla không có bộ ký tự tiếng Việt** (chỉ latin, latin-ext), dấu sẽ rơi sang font dự phòng và lệch nét. Vì vậy thay bằng cặp trên (đã kiểm subset trong dữ liệu Google Fonts).

| Token | Cỡ | Dùng cho |
|-------|----|---------|
| `--text-display` | 48 → 112px | Headline hero |
| `--text-3xl` | 40 → 72px | Tiêu đề section lớn |
| `--text-2xl` | 32 → 48px | Tiêu đề section |
| `--text-xl` | 24 → 32px | Tên món trong trang chi tiết, tiêu đề card lớn |
| `--text-lg` | 18 → 22px | Lead paragraph, tên món trên card |
| `--text-base` | 16 → 18px | Nội dung |
| `--text-sm` | 14px | Giá phụ, meta |
| `--text-xs` | 13px | Chú thích ảnh, không dùng cho đoạn văn |

- Line-height: body `1.65`, tiêu đề tối thiểu `1.15`. Tiếng Việt có dấu chồng trên và dưới (Ấ, Ộ, ỵ); line-height 1.0 sẽ cắt dấu.
- Tiêu đề: `font-variation-settings: var(--display-variation)`, `letter-spacing: var(--tracking-display)`.
- Eyebrow (dòng nhỏ trên tiêu đề): Be Vietnam Pro 600, `--text-sm`, chữ hoa, `--tracking-eyebrow`.
- Độ dài dòng tối đa `--measure` (65ch).
- Giá tiền: `font-variant-numeric: tabular-nums`, định dạng `45.000đ`.

## 5. Layout và khoảng cách

- Nhịp 4px: `--space-1` (4) … `--space-32` (128). Không dùng giá trị lẻ ngoài thang.
- Padding section: `--space-section` (64 → 128px).
- Container tối đa 1200px, gutter 16 → 32px.
- Breakpoint (mobile-first): dùng mặc định của Tailwind — base (từ 375), `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Kiểm thêm ở 1440px.
- Lưới menu: 1 cột (<640), 2 cột (≥640), 3 cột (≥1024), 4 cột (≥1280).
- Vùng chạm tối thiểu 44×44px (`--tap-target`), cách nhau ≥ 8px.
- Không cuộn ngang ở 375px; ảnh luôn có `aspect-ratio` hoặc `width/height` để CLS < 0.1.

## 6. Hình khối, bóng đổ, chất liệu

- Bo góc: `--radius-sm` 8 (input, chip), `--radius-md` 16 (card), `--radius-lg` 24 (ảnh lớn, khối nổi bật), `--radius-xl` 40 (section bo tròn), `--radius-pill` (nút).
- `--radius-blob` cho khung ảnh trang trí ở hero và "Câu chuyện Tuki"; tối đa một blob mỗi màn hình.
- Bóng đổ ngả nâu (`--shadow-sm/md/lg`), không dùng bóng xám.
- Grain: SVG noise tĩnh phủ toàn trang, `opacity: var(--grain-opacity)`, `pointer-events: none`. Không animate grain.

## 7. Icon và hình ảnh

- Icon: **Lucide** (SVG), stroke 1.75, cỡ 20/24px, màu `currentColor`. Không dùng emoji làm icon.
- Nút chỉ có icon phải có `aria-label` (ví dụ nút menu mobile: "Mở menu").
- Ảnh món: nền đồng nhất hoặc bàn gỗ, ánh sáng ấm, chụp 45° hoặc từ trên xuống; mọi ảnh cùng một bộ lọc màu.
- Ảnh hero: `fetchpriority="high"`, không lazy-load; mọi ảnh khác `loading="lazy"`.
- `alt` mô tả món thật ("Cà phê muối Tuki trong ly thủy tinh"), không ghi "ảnh 1".

## 8. Motion

Sinh bằng `web-motion-design`, genre **marketing-landing** (tempo neutral, amplitude expressive, character organic). Lý do chọn: mỗi khách xem website vài lần mỗi ngày trở xuống (chi phí mỗi lần chuyển động thấp, có thể mang cảm xúc thương hiệu), và con trỏ dừng lâu trên từng card lớn chứ không quét bảng dày đặc (cho phép scale nhẹ).

### Giá trị

| Token | Giá trị | Reduced motion |
|-------|---------|----------------|
| `--motion-duration-feedback` | 100ms | 100ms |
| `--motion-duration-orientation-near / mid / far` | 300 / 400 / 450ms | 200ms |
| `--motion-duration-causality-near / mid / far` | 250 / 300 / 400ms | 200ms |
| `--motion-duration-attention-near / mid / far` | 250 / 300 / 400ms | 200ms |
| `--motion-continuity-delay` | 200ms | 200ms |
| `--motion-easing-enter` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | — |
| `--motion-easing-exit` | `cubic-bezier(0.3, 0, 0.8, 0.15)` | — |
| `--motion-translate` | 32px (tối đa) | 0px |
| `--motion-scale-max` | 1.05 | 1 |
| `--motion-stagger-step` | 60ms, tổng ≤ 500ms | giữ nguyên |
| `--motion-hover-lift` | -4px | 0px |
| `--motion-press-scale` | 0.97 | 1 |

Feedback bị giới hạn cứng 150ms bất kể genre: nút phản hồi chậm sẽ bị cảm nhận là hỏng chứ không phải sang. Không dùng `linear` cho bất cứ thứ gì di chuyển; `linear` chỉ dành cho vòng lặp liên tục (spinner, marquee).

### Vai trò của từng chuyển động

Mỗi chuyển động phải có đúng một vai trò. Chuyển động không gọi tên được vai trò là trang trí và bị bỏ, trừ **một brand moment mỗi trang**.

| Chuyển động | Vai trò | Token | Cách làm |
|-------------|---------|-------|----------|
| Hover/press nút | Feedback | feedback, easing-enter | Đổi màu nền; press `scale(var(--motion-press-scale))`. |
| Hover card món | Feedback | feedback | Chỉ cho card **bấm được** (card "Món đặc trưng" ở trang chủ dẫn tới `/menu`). Card `translateY(var(--motion-hover-lift))`; ảnh bên trong `scale(var(--motion-scale-max))`; bóng đổ đổi bằng `opacity` của pseudo-element, không animate `box-shadow`. Món trong trang `/menu` không bấm được nên không có hiệu ứng hover. |
| CTA "Xem menu" trên header | Orientation | orientation-near | Ẩn (`opacity: 0` + `visibility: hidden`) khi CTA trong hero còn trên màn hình, hiện ra khi CTA hero đã cuộn khỏi viewport; nhờ vậy luôn chỉ có một CTA chính. |
| Focus ring | Feedback | feedback | `outline` 3px `--color-ring`, offset 3px; chỉ với `:focus-visible`. |
| Header khi cuộn | Orientation | orientation-near | Nền header hiện bằng `opacity` của lớp nền; không đổi chiều cao header. |
| Drawer menu mobile | Orientation | vào: orientation-far + easing-enter; ra: orientation-near + easing-exit | Trượt từ **phải** (nút mở nằm bên phải); scrim fade; khóa cuộn nền; Esc để đóng; focus trả về nút mở. |
| Chuyển tab danh mục (Cà phê / Trà / Bánh) | Orientation | orientation-near | Thanh chỉ báo trượt bằng `transform`; danh sách cross-fade. |
| Section hiện ra khi cuộn | Orientation (thứ tự đọc) | orientation-mid + stagger | Chỉ lần đầu vào viewport; `opacity` 0→1 + `translateY(var(--motion-translate))`; không ẩn lại khi cuộn lên. Trạng thái ẩn chỉ áp khi JS đã chạy, để nội dung vẫn hiện nếu JS lỗi. |
| Ảnh đang tải | Continuity | continuity-delay | Skeleton cùng tỉ lệ ảnh, chỉ hiện sau 200ms. |
| **Hero** (brand moment duy nhất) | Brand | orientation-far + stagger | Headline hiện từng dòng (stagger 60ms), ảnh ly cà phê scale 0.96→1; khói bay từ ly lặp tối đa ~4.5s rồi dừng (dưới ngưỡng 5s của WCAG 2.2.2). |
| Cuộn tới anchor | Orientation | — | `scroll-behavior: smooth`, tắt dưới reduced-motion. |

Causality và Attention hiện **chưa dùng**: website không có giỏ hàng, đặt món hay thông báo. Token của hai vai trò vẫn giữ sẵn để dùng khi có tính năng đó (ví dụ form đặt bàn cần báo lỗi hoặc xác nhận).

**Không dùng:** parallax, scroll-jacking, carousel tự chạy, hiệu ứng con trỏ tùy biến, `animate-bounce` lặp vô hạn.

### Các cổng kiểm tra (gates)

Hiện chưa có code nên các cổng dưới đây là **điều kiện bắt buộc cho phần triển khai**, chưa phải kết quả đã kiểm.

| Gate | Yêu cầu | Trạng thái |
|------|---------|-----------|
| 1. Reduced motion | Khối `prefers-reduced-motion` đã có trong `tokens.css`: bỏ translate/scale, giữ opacity và stagger, kẹp thời lượng ≤ 200ms. Khói hero và smooth scroll tắt hẳn. | Token: đạt. Component: kiểm khi code. |
| 2. Chỉ thuộc tính compositor | Chỉ `transform`, `opacity`, `filter`, `clip-path`. Accordion dùng `grid-template-rows: 0fr → 1fr`. `will-change` chỉ gắn khi sắp animate. | Kiểm khi code. |
| 3. Ngắt được giữa chừng | Feedback và Orientation dùng CSS transition (không keyframe) để đổi hướng giữa chừng; drawer đóng ngay khi bấm lúc đang mở. | Kiểm khi code. |
| 4. Ngân sách tần suất | Website có tần suất xem thấp nên dải thời lượng hiện tại hợp lý; không có nội dung tự chuyển động > 5s; không nhấp nháy > 3 lần/giây. | Đạt theo spec. |

## 9. Component cốt lõi

| Component | Quy tắc |
|-----------|---------|
| Nút chính | Nền `--color-accent`, chữ `--color-on-accent`, pill, cao ≥ 48px, Be Vietnam Pro 600. Hover `--color-accent-hover`. Nội dung mặc định: **"Xem menu"**. Tối đa một nút chính mỗi màn hình. |
| Nút phụ | Viền 1.5px `--color-primary`, chữ `--color-primary`, nền trong suốt; hover nền `--color-surface-alt`. |
| Nút ghost / link | Chữ `--color-primary`, gạch chân offset 4px, dày 1.5px. |
| Card món | Nền `--color-surface`, `--radius-md`, ảnh 4:5 bo `--radius-md`, tên `--text-lg` Fraunces, mô tả 2 dòng `--color-text-muted`, giá tabular. Toàn card là một link, vùng chạm cả card. |
| Chip / nhãn | `--radius-pill`, `--text-xs` 600. Signature: nền highlight + chữ `--color-text`. Mới: nền fresh + chữ on-fresh. |
| Eyebrow + tiêu đề section | Eyebrow cam hoặc primary, tiêu đề Fraunces, một từ khóa in nghiêng italic để tạo nhịp. |
| Khối giờ mở cửa | Icon đồng hồ + chữ "Đang mở cửa · đóng lúc 22:00" + chấm màu fresh; khi đóng: "Đã đóng · mở lúc 7:00" + chấm danger. Giờ tính theo `Asia/Ho_Chi_Minh`. |
| Input (form liên hệ/đặt bàn) | Label luôn hiện phía trên, viền `--color-border-strong`, lỗi hiển thị ngay dưới ô, `aria-describedby`. |
| Header | Sticky, cao 64px (mobile) / 72px (desktop); logo (wordmark) trái, nav giữa, CTA "Xem menu" phải (chỉ hiện khi CTA hero đã khuất); mobile: logo + CTA + nút mở drawer. |

## 10. Cấu trúc trang chủ đề xuất

Mẫu "Hero-Centric + Conversion", chỉnh cho quán cà phê:

1. **Header** sticky, có CTA chính.
2. **Hero**: headline lớn + ảnh món đặc trưng + CTA chính "Xem menu" + CTA phụ "Chỉ đường" + dòng trạng thái giờ mở cửa. Đây là brand moment duy nhất.
3. **Món đặc trưng**: 3–4 card dẫn tới `/menu`, cuối section là nút phụ "Xem toàn bộ menu".
4. **Câu chuyện Tuki**: khối espresso (nền tối) với ảnh blob, tạo tương phản mạnh giữa trang.
5. **Không gian quán**: lưới ảnh 2–3 cột, không dùng carousel tự chạy.
6. **Khách nói gì**: 3 đánh giá thật, kèm nguồn (Google Maps).
7. **Ghé Tuki**: giờ mở cửa, địa chỉ, bản đồ (lazy-load iframe khi cuộn tới), nút "Chỉ đường".
8. **Footer**: liên hệ, mạng xã hội, giờ mở cửa lặp lại.

Section xen kẽ nền `--color-bg` và `--color-surface-alt`, với đúng một khối `--color-surface-inverse` để tạo điểm nhấn.

## 11. Checklist trước khi bàn giao mỗi trang

- [ ] Không có hex hoặc `ms` viết thẳng trong component.
- [ ] Không emoji làm icon; icon đồng bộ Lucide.
- [ ] Mọi phần tử bấm được có `cursor: pointer`, trạng thái hover/active/focus-visible.
- [ ] Chữ ≥ 4.5:1, control ≥ 3:1 ở **cả light và dark** (kiểm riêng từng chế độ).
- [ ] Bật reduced-motion: không còn chuyển động trượt/phóng, nội dung vẫn hiện đủ.
- [ ] Kiểm ở 375, 768, 1024, 1440px; không cuộn ngang.
- [ ] Ảnh có `alt`, `aspect-ratio`, định dạng AVIF/WebP.
- [ ] Điều hướng hoàn toàn bằng bàn phím; drawer có focus trap và Esc.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95.

## 12. Tích hợp Next.js + Tailwind v4

Stack: **Next.js (App Router) + Tailwind CSS v4** (đã kiểm với Tailwind 4.3.3). Tailwind v4 cấu hình bằng CSS (`@theme`), không dùng `tailwind.config.js`.

Khi dựng project, chép `tokens/tokens.css` và `tokens/tailwind-theme.css` vào `src/styles/`, rồi trong `src/app/globals.css`:

```css
@import "tailwindcss";
@import "../styles/tokens.css";
@import "../styles/tailwind-theme.css";
```

Font qua `next/font/google` (tự host, không chặn render):

```ts
// src/app/fonts.ts
import { Be_Vietnam_Pro, Fraunces } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin', 'vietnamese'],
  axes: ['SOFT', 'WONK', 'opsz'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
})
// <html lang="vi" className={`${fraunces.variable} ${beVietnamPro.variable}`}>
```

Cách `tailwind-theme.css` hoạt động:

- Dùng `@theme inline reference`: utility đọc thẳng biến trong `tokens.css` (`.bg-bg { background-color: var(--color-bg) }`) mà không khai báo lại giá trị, nên dark mode và reduced-motion trong `tokens.css` vẫn tự áp dụng.
- `--color-*: initial` xoá palette mặc định: `bg-blue-500` không tồn tại, chỉ có màu Tuki.
- Khoảng cách mặc định của Tailwind (bước 0.25rem) trùng nhịp 4px, nên `p-4` = `--space-4`. Thêm `py-section`, `px-gutter`, `min-h-tap`, `max-w-page`, `max-w-measure`.
- `dark:` theo cùng quy tắc với tokens (hệ điều hành, hoặc `data-theme` nếu có). Ưu tiên token ngữ nghĩa thay vì `dark:`.

Bảng tra nhanh utility:

| Nhu cầu | Utility |
|---------|---------|
| Màu | `bg-bg`, `bg-surface`, `bg-surface-alt`, `bg-surface-inverse`, `text-text`, `text-text-muted`, `bg-accent text-on-accent`, `hover:bg-accent-hover`, `border-border-strong`, `outline-ring` |
| Chữ | `font-display`, `font-body`, `text-display` … `text-xs`, `leading-tight`, `tracking-display`, `tracking-eyebrow` |
| Hình khối | `rounded-sm/md/lg/xl`, `rounded-pill`, `rounded-blob`, `shadow-sm/md/lg` |
| Motion | `transition-colors duration-feedback ease-enter`, `transition-transform duration-orientation-mid ease-enter`, `hover:hover-lift`, `active:press-scale`, `reveal-offset`, `stagger-delay` (đọc `--i`) |

Quy tắc motion với Tailwind: dùng `transition-colors`, `transition-opacity`, `transition-transform` thay vì `transition` trơn (utility `transition` trơn chuyển cả `box-shadow` và `filter`). Không viết `duration-300`, `ease-in-out` hay giá trị tuỳ ý như `duration-[250ms]`; chỉ dùng utility theo vai trò ở trên.

## 13. Quyết định đã chốt (26/09/2026)

| Câu hỏi | Quyết định | Ảnh hưởng |
|---------|-----------|-----------|
| CTA chính | "Xem menu" | Hero + sticky header; không có giỏ hàng nên bỏ Causality/Attention khỏi phạm vi hiện tại. |
| Logo | Chưa có, thiết kế sau dựa trên design system | Dùng wordmark Fraunces tạm thời trong component `Logo`. |
| Ngôn ngữ | Chỉ tiếng Việt (tạm thời) | `lang="vi"`, font subset `latin` + `vietnamese`; chưa cần i18n. |
| Stack | Next.js + Tailwind | Tailwind v4 qua `tailwind-theme.css`; font qua `next/font`. |
