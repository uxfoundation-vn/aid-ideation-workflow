# Quy ước chung: Kho lưu trữ research

File này **không phải 1 skill** (không có frontmatter) — chỉ đọc khi skill `component-research` hoặc `flow-research` trỏ tới đây. Gom phần dùng chung của 2 skill để không lặp và không lệch nhau.

## Kho lưu trữ gồm 3 phần — luôn cập nhật đủ cả 3

1. `data/<slug>.json` — dữ liệu của lần research (nguồn sự thật).
2. `research/<slug>.html` — trang hiển thị, copy từ `templates/template.html`.
3. `index.html` — thêm 1 entry vào mảng `ARCHIVE`.

Kết quả cuối phải mở được bằng double-click `index.html` (không cần server).

## Schema `data/<slug>.json`

```json
{
  "slug": "<slug kebab-case>",
  "date": "<YYYY-MM-DD hôm nay>",
  "category": "flow" | "component",
  "title": "Flow Refs: <Tên>" | "UI Refs: <Tên>",
  "subtitle": "Nguồn: … — <mô tả ngắn>. Bấm ảnh để phóng to, bấm link để xem bản gốc.",
  "sections": [
    {
      "name": "<tên section>",
      "layout": "flow" | "grid",
      "items": [
        { "app": "…", "platform": "ios|web|cg", "step": 1, "image": "…", "url": "…", "alt": "…" }
      ]
    }
  ]
}
```

- `platform`: `ios`/`web` = Mobbin, `cg` = component.gallery. Mỗi nguồn 1 section riêng, không trộn.
- `url`: link trang gốc (flow/screen Mobbin, docs của design system).

## Ảnh

- **Mobbin**: tải ảnh về `assets/shots/<slug>/` ngay lúc research (link ảnh Mobbin là link tạm). `image` = `../assets/shots/<slug>/NN.<đuôi>`. Kiểm tra bằng `file` — file nào không phải ảnh thì bỏ.
- **component.gallery**: **không tải về**, giữ link `screenshot` gốc (site không có LICENSE — xem README bước 3).

## Render `research/<slug>.html`

Copy `templates/template.html`, thay `<title>` và object `DATA` (cùng nội dung với file JSON). Không copy CSS/JS vào trang, không `fetch()` JSON lúc chạy.

## Đăng ký `index.html`

Thêm vào **đầu** mảng `ARCHIVE`:

```js
{ slug, category, title /* tên ngắn, không prefix */, date, itemCount /* tổng items */,
  platforms /* ["ios","web","cg"] — chỉ cái thực có */,
  thumbnail /* ảnh đặc trưng: đường dẫn local bỏ tiền tố ../, hoặc link screenshot cg */,
  href: "research/<slug>.html", dataHref: "data/<slug>.json" }
```

## Kiểm tra & báo cáo

1. `python3 -m json.tool data/<slug>.json > /dev/null`
2. `itemCount` khớp tổng items mọi section.
3. Báo cáo: file đã tạo/sửa, tóm tắt từng section, link nguồn.

Nội dung viết tiếng Việt, giữ nguyên tên app/component gốc tiếng Anh. Trùng chủ đề với entry đã có → hỏi cập nhật hay tạo mới.
