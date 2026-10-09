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

## Bước 1c — Tóm tắt hướng dẫn UX từ resources

Nếu `prose.resources` trong cache có link: chọn tối đa 3 bài hướng dẫn UX (ưu tiên Balsamiq, Nielsen Norman Group, UI Playbook, blog chuyên gia UX; bỏ link thư viện code như uiverse.io). WebFetch từng bài, tóm tắt tiếng Việt theo 4 mục: dùng để làm gì · khác component liên quan · các state · best practice. Mục nào bài không nói thì ghi "không đề cập". Link lỗi → bỏ qua, ghi vào `report.note`.

## Bước 2 — Viết `data/<slug>.json`

- `category: "component"`, mọi section `layout: "grid"`.
- **Section Mobbin**: nhóm theo pattern, `platform: "ios"|"web"`, `url` = link screen Mobbin.
- **Section component.gallery**: nhóm theo tên gọi (vd “Input”, “Text field”, tên khác), `platform: "cg"`, `app` = tên design system, `image` = `screenshot` (link gốc), `url` = docs gốc.
- Luôn ghi nguồn "The Component Gallery" + link `component.gallery/components/<slug>/` trong `subtitle`.
- **`report`** — khối trả lời 4 câu hỏi của designer, hiện trên cùng trang (đặt trước `sections`):
  ```json
  "report": {
    "tldr": "1–2 câu tổng quát (được dùng <b>, <code>)",
    "purpose":     { "items": [{ "text": "…", "src": "Balsamiq" }] },
    "differences": { "rows": [{ "name": "Text area", "use": "…", "src": "…" }], "note": "…" },
    "states":      { "rows": [{ "name": "Focus", "desc": "…", "src": "…" }], "note": "…" },
    "naming":      { "headline": "…", "bars": [{ "name": "Input", "count": 26 }],
                     "camps": [{ "name": "“Text field”", "ds": "Material · Polaris" }], "advice": "…" },
    "bestPractices": [{ "group": "Label & placeholder", "items": [{ "text": "…", "src": "…" }] }],
    "note": "thiếu nguồn gì, bỏ link nào"
  }
  ```
  - **Mỗi ý phải có `src`** — không có nguồn thì không đưa vào. Chỗ trống ghi thật "không đề cập", không bịa.
  - **States**: gộp từ nhiều nguồn thành 1 danh sách tên chuẩn (Default, Hover, Focus, Active, Error, Disabled, Read-only…).
  - **Naming**: `bars` lấy từ `nameDistribution` (gộp biến thể viết hoa/viết liền, nhãn ngắn); `camps` = nhóm design system nổi tiếng theo tên họ dùng — đây là phần đáng giá nhất cho designer.
- **`sources`** — footer nguồn (đặt sau `sections`): `[{ "label": "Balsamiq — Text Input Guidelines", "url": "…", "note": "tóm tắt bằng máy từ bài gốc" }]`. Mọi `src` trong report phải khớp 1 nguồn ở đây.
- Chỉ lưu **tóm tắt** + link gốc, không chép nguyên văn bài viết.

## Bước 3 — Render, đăng ký, kiểm tra

Theo `_shared/ARCHIVE-CONVENTIONS.md`. Báo cáo: số ví dụ mỗi nguồn, các tên gọi khác của component.

## Lưu ý

- Không commit `component-gallery/cache/` (đã có trong `.gitignore`).
- component.gallery và Mobbin cho cùng 1 component luôn chung 1 trang, không tách 2 entry.
