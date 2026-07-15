# losec.io — Logo kit

Vòng tròn là chu vi phòng thủ. Nó gần khép kín — có đúng một khe hở, và khe hở đó
được đánh dấu bằng chấm cam: lỗ hổng đã được tìm thấy. Chấm giữa là tâm ngắm của
agent đang quét. Vòng tròn cũng chính là chữ "o" trong *losec*.

## Nội dung

```
svg/        Logo vector — dùng cho web, in ấn, mọi kích thước
png/        Bản raster nền trong suốt
favicon/    favicon.svg, .ico, PNG 16/32/48, apple-touch-icon 180
social/     Ảnh Open Graph 1200×630 cho link preview
```

## Chọn file nào

| Tình huống | File |
|---|---|
| Header website, nền sáng | `svg/losec-horizontal.svg` |
| Nền tối | `svg/losec-horizontal-dark.svg` |
| Slide, poster, danh thiếp (có tagline) | `svg/losec-stacked.svg` |
| Avatar, app icon, GitHub org | `svg/losec-mark-badge.svg` |
| Chỉ dùng icon trong UI | `svg/losec-mark.svg` |
| In một màu, khắc laser, dập nổi, fax | `svg/*-mono-black.svg` / `*-mono-white.svg` |

## Tagline

```
ZERO DAYS, MINUS ONE
```

Luôn viết hoa toàn bộ, tracking 2.49 tại font-size 11 (tỉ lệ 0.226em). Ở kích
thước đó tagline rộng đúng bằng wordmark `losec.io` — hai dòng flush đều hai đầu.
Nếu cần phóng to, scale cả khối; đừng chỉnh tracking riêng.

Tagline chỉ đi kèm bản dọc (`losec-stacked`) và ảnh OG. Bản ngang và mark không
có tagline — đừng tự ghép thêm.

## Màu

| Vai trò | Hex | Ghi chú |
|---|---|---|
| Teal (chính) | `#1D9E75` | Vòng tròn |
| Teal đậm | `#0F6E56` | Chấm tâm |
| Teal sáng | `#5DCAA5` | Vòng tròn trên nền tối |
| Mint | `#9FE1CB` | Chấm tâm trên nền tối |
| Coral | `#D85A30` | **Chấm breach — chỉ dùng cho điểm nhấn duy nhất** |
| Coral sáng | `#F0997B` | Chấm breach trên nền tối |
| Ink | `#14201C` | Chữ, nền tối |
| Paper | `#FFFFFF` | Chữ trên nền tối |
| Muted | `#7C8A85` | `.io`, tagline |

Coral là màu đắt nhất trong hệ. Đừng dùng nó cho nút bấm, link, hay nền. Nó chỉ
có nghĩa khi xuất hiện đúng một lần: *đây là chỗ bị thủng*.

## Clearspace

Chừa quanh logo một khoảng trống ít nhất bằng **bán kính vòng tròn** (r). Không
đặt chữ, đường kẻ, hay ảnh vào vùng này.

## Kích thước tối thiểu

| | Màn hình | In |
|---|---|---|
| Logo ngang | 120px rộng | 30mm |
| Mark | 24px | 8mm |
| Favicon | dùng `favicon/` — mark đã được vẽ dày hơn cho cỡ nhỏ |

Bản favicon có stroke dày hơn bản chuẩn. Đừng thu nhỏ `losec-mark.svg` xuống
16px — vòng tròn sẽ vỡ.

## Không được

- Xoay vòng tròn (khe hở luôn ở góc trên phải — 1–2 giờ)
- Đổi màu chấm breach sang teal (mất toàn bộ ý nghĩa)
- Bỏ khe hở, hoặc thêm khe thứ hai
- Thêm đổ bóng, gradient, viền ngoài, hiệu ứng glow
- Kéo giãn không đều tỉ lệ
- Đặt logo màu lên nền có độ tương phản thấp — dùng bản mono

## Font

Wordmark và tagline dùng **Space Grotesk** (SIL Open Font License 1.1) và **đã
được convert sang path** — file SVG không phụ thuộc font, hiển thị đúng ở mọi máy.

Nếu cần font cho website để đồng bộ: Space Grotesk trên Google Fonts.

## Favicon — snippet

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">
<meta property="og:image" content="https://losec.io/og-image-1200x630.png">
```
