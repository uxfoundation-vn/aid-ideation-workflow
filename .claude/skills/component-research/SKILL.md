---
name: component-research
description: Research 1 UI component (text field, button, badge, dropdown, empty state…) song song trên Mobbin (screen thật trong app) và component.gallery (cách các design system thật gọi tên và thiết kế) rồi lưu vào kho lưu trữ (data/ + research/ + index.html). Dùng khi user nhờ tìm/crawl/research 1 component UI.
---

# Research Component → Kho lưu trữ

Đọc `.claude/skills/_shared/ARCHIVE-CONVENTIONS.md` trước — schema, ảnh, render, đăng ký kho. Dưới đây chỉ là phần riêng cho Component.

Luôn làm **2 nguồn song song, không bên nào là chính**. Thiếu 1 bên thì trang chỉ có bên còn lại, không phải lỗi.

## Bước 1a — Mobbin

- `mcp__mobbin__search_screens`, search cả `ios` lẫn `web` nếu user không nói platform. `limit` tối đa 4–5.
- Xem ảnh, bỏ kết quả lạc đề. Tải ảnh đã chọn về `assets/shots/<slug>/`.

## Bước 1b — component.gallery

1. Tìm slug tiếng Anh của component (vd `text-input`, `badge`). Không chắc site có không → chạy `node component-gallery/crawl.mjs list`.
2. `node component-gallery/crawl.mjs fetch <slug>` — script tự dùng lại bản đã tải, không thêm `--force` trừ khi user muốn làm mới.
3. Đọc `component-gallery/cache/<slug>.json`: `nameDistribution` (các tên gọi khác), `examples[]` (ảnh + design system + link docs).

## Bước 2 — Viết `data/<slug>.json`

- `category: "component"`, mọi section `layout: "grid"`.
- **Section Mobbin**: nhóm theo pattern, `platform: "ios"|"web"`, `url` = link screen Mobbin.
- **Section component.gallery**: nhóm theo tên gọi (vd “Input”, “Text field”, tên khác), `platform: "cg"`, `app` = tên design system, `image` = `screenshot` (link gốc), `url` = docs gốc.
- Luôn ghi nguồn "The Component Gallery" + link `component.gallery/components/<slug>/` trong `subtitle`.

## Bước 3 — Render, đăng ký, kiểm tra

Theo `_shared/ARCHIVE-CONVENTIONS.md`. Báo cáo: số ví dụ mỗi nguồn, các tên gọi khác của component.

## Lưu ý

- Không commit `component-gallery/cache/` (đã có trong `.gitignore`).
- component.gallery và Mobbin cho cùng 1 component luôn chung 1 trang, không tách 2 entry.
