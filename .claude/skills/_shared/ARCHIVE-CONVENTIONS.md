# Quy ước chung: Kho lưu trữ Mobbin / component.gallery

File này **không phải 1 skill** (không có frontmatter `name`/`description`) — không tự invoke, chỉ đọc khi một skill khác (`component-research`, `flow-research`) trỏ bạn tới đây. Mục đích: gom phần dùng chung giữa 2 skill để không lặp và không lệch quy ước theo thời gian.

## Kho lưu trữ gồm 3 phần, luôn cập nhật đồng bộ cả 3

1. `data/<slug>.json` — nguồn sự thật (dữ liệu thô).
2. `research/<slug>.html` — trang hiển thị (render từ template dùng chung).
3. `index.html` — đăng ký entry vào mảng `ARCHIVE` để hiện trong kho lưu trữ.

Kết quả cuối cùng phải mở được bằng double-click `index.html` (không server, không Figma).

## Schema `data/<slug>.json` (khung chung — skill gọi bạn tới đây sẽ nói field riêng)

```json
{
  "slug": "<slug>",
  "date": "<YYYY-MM-DD hôm nay>",
  "category": "flow" | "component",
  "title": "Flow Refs: <Tên>" | "UI Refs: <Tên>",
  "subtitle": "Nguồn: ... — <mô tả ngắn>. Bấm ảnh để copy, bấm link để xem bản gốc.",
  "sections": [
    {
      "name": "<tên section>",
      "layout": "flow" | "grid",
      "items": [
        { "app": "...", "platform": "ios|web|cg", "step": 1, "image": "../assets/shots/<slug>/01.webp", "sourceImage": "<URL ảnh gốc Mobbin>", "url": "<source_url>" }
      ]
    }
  ]
}
```

Quy tắc chung:
- `slug`: kebab-case ngắn gọn.
- Mỗi nguồn (Mobbin / component.gallery) luôn nằm trong section riêng — **không trộn items khác nguồn vào cùng 1 section**.
- **Ảnh Mobbin BẮT BUỘC download về repo** (link short `mobbin.com/api/mcp/short/…` hết ~4 tuần là 410 — cả kho từng chết ảnh vì hotlink, 2026-09-23). Xem mục [Ảnh](#ảnh--download-về-repo-bắt-buộc-với-mobbin) dưới đây.
- `platform` phải khớp đúng nguồn: `ios`/`web` = Mobbin, `cg` = component.gallery.
- URL nguồn (`url` = `mobbin_url` / docs gốc design system) vẫn giữ nguyên — link trang không hết hạn, chỉ ảnh mới hết hạn.
- Field riêng theo loại research: component-research có thêm `report` (block 4 câu hỏi designer) + `sources` (footer nguồn) + `taxonomy` (data thô chưa render) — schema chi tiết trong `component-research/SKILL.md`.

## Ảnh — download về repo (BẮT BUỘC với Mobbin)

Link ảnh Mobbin từ MCP (`mobbin.com/api/mcp/short/<id>`) là **link tạm, hết ~4 tuần trả 410 Gone**. Hotlink từng làm chết ảnh toàn bộ kho (2026-09-23) → quy tắc mới: **lúc research, tải ảnh về repo ngay**.

1. Tạo thư mục `assets/shots/<slug>/` và tải từng ảnh theo thứ tự section → item:
   ```bash
   mkdir -p assets/shots/<slug>
   curl -sL -o assets/shots/<slug>/01.webp "<image_url>"
   ```
2. **Verify**: `file assets/shots/<slug>/*.webp` — mọi file phải là `Web/P` hoặc image, dung lượng > 0. File nào là text/HTML (410, lỗi) → search lại lấy ảnh khác hoặc bỏ item, không được để ảnh chết vào data.
3. Trong `data/<slug>.json`:
   - `image` = **đường dẫn local** tính từ trang `research/<slug>.html`, vd `../assets/shots/<slug>/01.webp`.
   - `sourceImage` = URL ảnh gốc trả về từ MCP (để dẫn nguồn/tìm lại).
   - `url` = `mobbin_url` của screen/flow (link trang, không hết hạn).
4. Đăng ký `index.html`: `thumbnail` dùng cùng đường dẫn nhưng **bỏ tiền tố `../`** (index nằm ở gốc repo), vd `assets/shots/<slug>/01.webp`.
5. Ảnh component.gallery (`platform: "cg"`) **giữ hotlink** `screenshot` gốc — link ổn định, và etiquette crawl với site không LICENSE là không mirror.

## Render `research/<slug>.html`

Copy shell từ `templates/template.html`: trang chỉ gồm `<link href="../assets/gallery.css">`, `<script src="../assets/gallery.js">`, header có back-link `Kho lưu trữ` về `../index.html`, và 1 object `DATA` inline (cùng nội dung với JSON ở bước viết data) rồi gọi `MobbinGallery.render(DATA)`.

`MobbinGallery.render` đọc `title`/`subtitle`/`sections` — ngoài ra tự render `report` (block tổng hợp, nằm TRÊN các section ảnh) và `sources` (footer) nếu DATA có. Card `view-link` theo platform: ios/web → "Xem trên Mobbin →", `cg` → "Xem docs gốc →".

**Tuyệt đối không copy lại nội dung CSS/JS vào trang** — chỉ tham chiếu shared assets. Không `fetch()` JSON lúc runtime (vỡ trên `file://`).

## Đăng ký vào `index.html`

Thêm 1 entry vào **đầu** mảng `ARCHIVE`:

```js
{
  slug: "<slug>",
  category: "flow" | "component",
  title: "<Tên ngắn, không prefix 'Flow Refs:'/'UI Refs:'>",
  date: "<YYYY-MM-DD>",
  itemCount: <tổng số items mọi section>,
  platforms: ["ios", "web"],   // chỉ những platform thực có; thêm "cg" nếu có section component.gallery
  thumbnail: "assets/shots/<slug>/NN.webp — chọn ảnh đặc trưng nhất, cùng ảnh với data nhưng bỏ tiền tố ../",
  href: "research/<slug>.html",
  dataHref: "data/<slug>.json"
}
```

## Pinterest (đã ngừng dùng)

Pinterest đã bị **gỡ khỏi workflow** (2026-09-23): MCP server đã disconnect, các bước Pinterest đã bị xoá khỏi 2 skill. Không tự ý dùng lại. Nếu sau này muốn cải tiến và bật lại: code render còn giữ platform `pinterest` (dormant) trong `assets/gallery.js`, thư mục server + data đã park ở `.pinterest-mcp-own/`.

## Kiểm tra & báo cáo

1. Validate JSON: `python3 -m json.tool data/<slug>.json > /dev/null`.
2. Đếm lại `itemCount` khớp tổng items mọi section.
3. Báo cáo cho user: liệt kê file đã tạo/sửa, tóm tắt từng section (nguồn, số lượng, điểm đáng chú ý), kèm link gốc từng nguồn đã dùng.

## Lưu ý chung

- Ngôn ngữ nội dung (title, subtitle, section name, báo cáo): tiếng Việt, giữ nguyên tên app/component/flow gốc tiếng Anh.
- Nếu research trùng chủ đề với entry đã có trong `ARCHIVE`, hỏi user muốn cập nhật entry cũ hay tạo mới trước khi ghi đè.
- Kết quả lạc đề nhưng đáng tham khảo (app tương tự) → nhắc trong báo cáo, không tự ý thêm vào gallery trừ khi user muốn.
