# Tuki Coffee — Nhận diện thương hiệu

Trạng thái: **đã chốt logo "Phin chữ T"** (26/09/2026, chốt tạm thời; có thể xem lại khi quán có câu chuyện riêng về tên "Tuki").

- Trang xem trước trực quan: [`preview.html`](preview.html) (mở trực tiếp bằng trình duyệt)
- File logo: [`logo/`](logo/) (SVG, chữ đã chuyển thành nét) và [`logo/png/`](logo/png/) (PNG)
- Công cụ dựng lại toàn bộ file logo: [`tools/build-logos.py`](tools/build-logos.py)
- Màu, chữ, khoảng cách, motion: theo [design system](../design-system/MASTER.md). File này không lặp lại token, chỉ quy định cách thương hiệu dùng chúng.

## 1. Nền tảng thương hiệu

| Thành phần | Nội dung |
|------------|----------|
| Tinh thần cốt lõi | **Một góc nhỏ để chậm lại.** |
| Lời hứa | Hạt Việt chọn theo mùa, rang vừa tới, pha tay từng ly, không pha sẵn. |
| Khẩu hiệu | **Rang mộc · Pha tận tâm** (đang dùng trên website, giữ nguyên). |
| Khách chính (giả định) | Người trẻ đi làm và sinh viên ở TP.HCM, tìm quán qua Google Maps, mạng xã hội hoặc QR tại bàn, muốn một chỗ ngồi dễ chịu giữa ngày bận. |

Nguồn: câu chuyện và giá trị trong `src/content/site.ts`, mục tiêu website trong design system. Phần "khách chính" là giả định, cần chủ quán xác nhận.

### Tính cách

| Tuki là | Tuki không phải |
|---------|-----------------|
| **Ấm áp**: như người quen pha cho mình ly cà phê. | Sến, khách sáo, dùng nhiều mỹ từ. |
| **Mộc**: nói thật về hạt, cách rang, cách pha. | Thô, cũ kỹ, "vintage" cho có. |
| **Chăm chút**: chi tiết nhỏ được làm kỹ. | Cầu kỳ, khó gần, "specialty" kiểu dạy đời. |
| **Vui vừa đủ**: có một chút tinh nghịch (chữ nghiêng, màu caramel). | Ồn ào, bắt trend, meme hóa. |

### Giọng nói

Xưng "chúng tôi" (hoặc "Tuki"), gọi khách là "bạn", giống nội dung hiện có trên website. Câu ngắn, động từ cụ thể, nói về ly cà phê thật.

| Nên viết | Tránh viết |
|----------|-----------|
| "Hạt rang tuần này là Cầu Đất, ngọt hậu, ít chua." | "Trải nghiệm hương vị đỉnh cao chưa từng có!" |
| "Mỗi ly một lần pha, nên bạn chờ thêm chút nhé." | "Xin quý khách vui lòng kiên nhẫn chờ đợi." |
| "Hôm nay Tuki mở đến 22:00." | "Ghé ngay kẻo lỡ!!!" |

## 2. Logo "Phin chữ T"

- **Biểu tượng:** chiếc **phin đặt trên ly**. Đĩa phin là nét ngang, ly là thân dọc, tạo thành chữ **T** ẩn. Trong ly là một giọt cà phê.
- **Chữ:** "tuki" viết thường, Fraunces 700 với trục `SOFT 100, WONK 1` (đúng `--display-variation`). Chấm của chữ **i** là cùng giọt cà phê đó, hình ảnh của việc pha chậm từng giọt.
- **Dòng phụ:** "COFFEE" bằng Be Vietnam Pro 600, giãn chữ bằng đúng chiều rộng "tuki".
- **Vì sao chọn:** phin là cách pha chậm đặc trưng của Việt Nam, khớp với "một góc nhỏ để chậm lại" và "hạt Việt"; hình khối dày nét nên vẫn rõ ở 16–32px; có biểu tượng dùng độc lập cho favicon, avatar, tem ly.

Hai hướng đã cân nhắc nhưng không chọn được giữ trong [`logo/concepts/`](logo/concepts/) để tham khảo: **A · Giọt chậm** (chỉ có chữ, thiếu biểu tượng cho kích thước nhỏ) và **C · Sticker** (chữ nghiêng trên mảng caramel, phụ thuộc nền màu).

## 3. Hệ thống logo

| Thành phần | File | Dùng cho |
|-----------|------|---------|
| Logo ngang (chính) | [`tuki-lockup-horizontal.svg`](logo/tuki-lockup-horizontal.svg) | Bảng hiệu, menu in, hóa đơn, ảnh bìa |
| Logo ngang đảo màu | [`tuki-lockup-horizontal-reverse.svg`](logo/tuki-lockup-horizontal-reverse.svg) | Nền espresso, bảng hiệu tối |
| Logo ngang một màu | [`tuki-lockup-horizontal-mono.svg`](logo/tuki-lockup-horizontal-mono.svg) | Con dấu mực, khắc laser, in một màu, nền caramel |
| Logo compact | [`tuki-lockup-compact.svg`](logo/tuki-lockup-compact.svg), [`-reverse`](logo/tuki-lockup-compact-reverse.svg) | Chỗ nhỏ: header website, footer, chữ ký email |
| Logo đứng | [`tuki-lockup-stacked.svg`](logo/tuki-lockup-stacked.svg) | Túi hạt, ly, poster, khung vuông |
| Biểu tượng | [`tuki-symbol.svg`](logo/tuki-symbol.svg) | Khi tên quán đã xuất hiện gần đó |
| Favicon | [`tuki-favicon.svg`](logo/tuki-favicon.svg) | Tab trình duyệt (website dùng bản sao ở `src/app/icon.svg`) |
| Avatar | [`tuki-avatar.svg`](logo/tuki-avatar.svg) | Facebook, Instagram, TikTok, Google Maps; biểu tượng nằm gọn trong vùng cắt tròn |
| Con dấu | [`tuki-seal.svg`](logo/tuki-seal.svg) | Tem ly, nắp hộp, túi giấy (dấu phụ, không thay logo chính) |

Bản PNG trong [`logo/png/`](logo/png/) có nền trong suốt (trừ bản đảo màu và avatar), tên file ghi kèm chiều rộng tính bằng pixel, ví dụ `tuki-avatar-1080.png` để tải lên mạng xã hội. Khi in, luôn gửi file SVG cho nhà in.

### Màu của logo

| Nền | Chữ + biểu tượng | Giọt cà phê |
|-----|------------------|-------------|
| Kem `--color-bg`, latte `--color-surface-alt`, trắng | Rang đậm `#6F3B1F` | Cam Tuki `#C2410C` |
| Espresso `--color-surface-inverse`, nền dark mode | Kem `#FBF6EE` | Caramel `#F2B544` |
| Caramel `--color-highlight`, in một màu | Espresso `#2B1A12` | Cùng màu chữ (giọt trong ly để trống, lộ nền) |

- Cam Tuki trong logo **chỉ dùng cho giọt cà phê**, không tô chữ hay biểu tượng bằng cam, để cam vẫn là màu dẫn mắt của CTA trên website.
- Trên website, component `Logo` đọc token `--color-logo` và `--color-logo-accent`, nên tự chuyển sang kem + caramel ở chế độ tối.
- Không đặt logo trực tiếp lên ảnh nhiều chi tiết; dùng mảng nền kem hoặc espresso phía sau.

### Khoảng trống và cỡ tối thiểu

- **Khoảng trống quanh logo** tối thiểu bằng chiều cao giọt cà phê trên chữ i. Không có chữ, hình hay mép giấy nào lấn vào vùng này.
- **Logo ngang và logo đứng:** rộng tối thiểu 200px trên màn hình, 30mm khi in. Nhỏ hơn thì dòng "COFFEE" không còn đọc được, chuyển sang **logo compact**.
- **Logo compact:** cao tối thiểu 28px trên màn hình, 8mm khi in.
- **Biểu tượng:** tối thiểu 24px / 8mm. Dưới 24px dùng favicon (có nền ô vuông).
- **Con dấu:** tối thiểu 25mm khi in; nhỏ hơn thì dùng biểu tượng.

### Không làm

- Không gõ lại chữ "tuki" bằng font; luôn dùng file SVG (nét chữ và vị trí giọt đã được căn chỉnh).
- Không kéo giãn, bóp méo, thêm bóng đổ, viền, gradient hay hiệu ứng.
- Không đổi màu ngoài ba cách phối ở bảng trên.
- Không xoay logo.
- Không tách giọt cà phê khỏi chữ i hay khỏi ly rồi đặt lệch chỗ.

## 4. Yếu tố đồ họa phụ

- **Giọt cà phê:** dấu đầu dòng cho giá trị quán, dấu phân cách trong menu in, điểm nhấn trên story mạng xã hội. Luôn là giọt đặc, đầu nhọn hướng lên.
- **Blob:** hình khối mềm theo `--radius-blob`, dùng làm khung ảnh; tối đa một blob mỗi bố cục, giống quy tắc trên website.
- **Con dấu vòng tròn** "TUKI COFFEE • RANG MỘC • PHA TẬN TÂM": cho bao bì, tem ly, túi giấy.
- **Chữ:** tiêu đề Fraunces, nội dung Be Vietnam Pro; dòng nhỏ viết hoa giãn chữ như "COFFEE" dùng cho eyebrow và nhãn bao bì.
- **Ảnh:** theo mục 7 của design system (ảnh thật, ánh sáng ấm, cùng một bộ lọc).

## 5. Điểm chạm

| # | Điểm chạm | File dùng | Trạng thái |
|---|-----------|-----------|-----------|
| 1 | Website: header, footer, favicon, icon iOS | Compact, `icon.svg`, `apple-icon.png` | Đã áp dụng |
| 2 | Avatar Facebook, Instagram, TikTok, Google Maps | `png/tuki-avatar-1080.png` | File sẵn sàng, chờ tải lên |
| 3 | Tem ly, ly giấy | `tuki-seal.svg` hoặc `tuki-symbol.svg` | File sẵn sàng, cần in thử |
| 4 | Bảng hiệu trước quán | `tuki-lockup-horizontal-reverse.svg` | File sẵn sàng, cần đo kích thước bảng |
| 5 | Menu giấy, thẻ QR tại bàn | `tuki-lockup-horizontal.svg` | Chưa thiết kế |
| 6 | Túi hạt, túi giấy mang đi | `tuki-lockup-stacked.svg` | Chưa thiết kế |

Trước khi in số lượng lớn: in thử con dấu 25mm và logo 30mm, kiểm tra giọt cà phê và khe giữa nắp phin với đĩa phin còn rõ.

## 6. Dựng lại file logo

Mọi file trong `logo/`, cùng `src/components/logo-paths.ts`, `src/app/icon.svg` và `src/app/apple-icon.png`, đều sinh từ `tools/build-logos.py`. Khi cần chỉnh logo, sửa script rồi chạy lại, không sửa tay các file sinh ra:

```bash
python3 -m venv .venv && .venv/bin/pip install fonttools uharfbuzz resvg-py
.venv/bin/python docs/brand/tools/build-logos.py
```

Lần chạy đầu, script tải font Fraunces và Be Vietnam Pro từ `github.com/google/fonts` bằng `curl` vào `docs/brand/tools/.fonts/` (đã có trong `.gitignore`). Cả hai font dùng giấy phép SIL Open Font License, cho phép dùng trong logo.

## Câu hỏi mở

1. Quán có pha phin thật không? Logo kể câu chuyện pha phin; nếu quán chủ yếu pha máy, nên xem lại biểu tượng.
2. "Tuki" có nghĩa hoặc câu chuyện riêng không? Nếu có, có thể kể thêm qua giọng nói và bao bì.
3. Đã kiểm tra tên và logo "Tuki Coffee" với Cục Sở hữu trí tuệ trước khi đăng ký nhãn hiệu chưa?
