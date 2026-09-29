# Tuki Coffee

Website của Tuki Coffee: Next.js (App Router) + Tailwind CSS v4, dựng theo
[design system](docs/design-system/MASTER.md).

## Chạy local

```bash
npm install
cp .env.example .env.local
npm run dev     # http://localhost:3000
npm run build   # build production
npm run lint
```

Khi build để public, đặt `NEXT_PUBLIC_SITE_URL` là địa chỉ thật của website (ví dụ
`https://tuki-coffee.com`). Biến này tạo URL đầy đủ cho ảnh xem trước khi chia sẻ link
(Facebook, Zalo), `robots.txt` và `sitemap.xml`; thiếu nó, các URL đó trỏ về localhost.
Trang mới cần được thêm vào danh sách trong `src/app/sitemap.ts`.

## CI

GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) chạy `npm ci`,
`npm run lint` và `npm run build` (bước build đã gồm kiểm tra kiểu TypeScript) cho mọi
pull request và mỗi lần push lên `main`. Chưa có bước deploy tự động.

## Nội dung

Toàn bộ nội dung quán nằm trong `src/content/`:

- `site.ts`: địa chỉ, số điện thoại, giờ mở cửa, mạng xã hội, câu chuyện, ảnh không gian, đánh giá.
- `menu.ts`: danh mục, món, giá, nhãn (Signature / Mới / Thuần chay), món đặc trưng.

Các giá trị đánh dấu `PLACEHOLDER` là nội dung mẫu, cần thay bằng thông tin
thật trước khi public. Section "Khách nói gì" chỉ hiện khi `site.reviews` có
đánh giá thật. Ảnh thật (AVIF/WebP) đặt trong `public/` rồi khai báo `src`
(ảnh không gian) hoặc `image` (ảnh món); minh hoạ và khung tạm sẽ tự được thay.

## Design tokens

`src/styles/tokens.css` và `src/styles/tailwind-theme.css` là bản sao từ
`docs/design-system/tokens/`. Khi đổi token, sửa ở `docs/design-system/tokens/`
rồi chép lại.

## Logo

Logo và quy tắc nhận diện nằm ở [`docs/brand/`](docs/brand/brand-identity.md).
`src/components/logo-paths.ts`, `src/app/icon.svg`, `src/app/apple-icon.png` và
`src/app/opengraph-image.png` (ảnh xem trước khi chia sẻ link) được sinh bởi `docs/brand/tools/build-logos.py`; muốn đổi logo thì sửa script
rồi chạy lại, không sửa tay các file này.
