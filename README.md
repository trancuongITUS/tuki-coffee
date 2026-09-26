# Tuki Coffee

Website của Tuki Coffee: Next.js (App Router) + Tailwind CSS v4, dựng theo
[design system](docs/design-system/MASTER.md).

## Chạy local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build production
npm run lint
```

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
`src/components/logo-paths.ts`, `src/app/icon.svg` và `src/app/apple-icon.png`
được sinh bởi `docs/brand/tools/build-logos.py`; muốn đổi logo thì sửa script
rồi chạy lại, không sửa tay các file này.
