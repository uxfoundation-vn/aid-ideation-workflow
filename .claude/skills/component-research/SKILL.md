---
name: component-research
description: Research 1 UI component cụ thể (button, text field, badge, accordion, empty state...) — tìm SONG SONG trên Mobbin (search_screens, screen thật từ app production) và component.gallery (naming/aliases/variants/states/docs từ design system thật), kèm tóm tắt guideline UX/UI từ các link resources component.gallery gắn sẵn — rồi lưu vào kho lưu trữ repo (data/+research/+index.html), output là 1 trang report tổng hợp 4 câu hỏi designer + gallery ảnh. Dùng khi user yêu cầu tìm/research 1 component UI cụ thể trên Mobbin/component.gallery.
---

# Research 1 Component UI → Kho lưu trữ

Research 1 component luôn gồm **2 việc làm song song, không phân chính/phụ**:
- **Mobbin** (`mcp__mobbin__search_screens`) → screen thật trong context app production.
- **component.gallery** (`component-gallery/crawl.mjs`) → naming/aliases/variants (tech)/states (features)/docs từ design system thật.

Không bên nào là fallback hay điều kiện của bên kia. Mobbin không có kết quả tốt → vẫn lấy component.gallery bình thường, và ngược lại. Thiếu 1 bên chỉ đơn giản là research đó không có phần đó, không phải lỗi cần xử lý.

Trước khi làm từ Bước 2 trở đi, đọc `.claude/skills/_shared/ARCHIVE-CONVENTIONS.md` — có schema/quy ước chung (viết `data/`, render `research/`, đăng ký `index.html`, validate & báo cáo). Các bước dưới đây chỉ nêu phần **khác biệt riêng cho Component**.

## Bước 1a — Search trên Mobbin

- `mcp__mobbin__search_screens` → `category: "component"`.
- Search cả `ios` lẫn `web` nếu user không chỉ định platform. Nếu user nêu tên app cụ thể, đưa vào query; nếu kết quả trả về app khác, search lại riêng cho từng app.
- Xem ảnh trả về để đánh giá đúng nội dung — không mô tả chỉ dựa trên metadata. Loại bỏ kết quả lạc đề.
- **Download ngay mọi ảnh Mobbin chọn dùng về `assets/shots/<slug>/`** trước khi viết data — link ảnh Mobbin hết ~4 tuần là 410 (cơ chế + lệnh xem mục «Ảnh» trong `_shared/ARCHIVE-CONVENTIONS.md`). Riêng ảnh component.gallery giữ hotlink.

## Bước 1b — Search trên component.gallery (song song với 1a)

1. Xác định slug tiếng Anh kebab-case của component (vd "text-input", "empty-state", "badge"). Nếu không chắc site có component này, đọc `component-gallery/cache/_index.json` (danh sách 60 component); nếu file chưa tồn tại, chạy `node component-gallery/crawl.mjs list` trước.
2. Chạy `node component-gallery/crawl.mjs fetch <slug>` (từ thư mục gốc repo). Script tự cache — nếu `component-gallery/cache/<slug>.json` đã tồn tại thì skip fetch, dùng lại luôn. Không tự thêm `--force` trừ khi user yêu cầu làm mới data.
3. Nếu component không nằm trong danh sách 60 của site, bỏ qua bước này — chỉ dùng kết quả Mobbin, không phải lỗi.
4. Đọc `component-gallery/cache/<slug>.json`, lấy:
   - `aliases`, `nameDistribution` → các tên gọi khác của component này ở các design system khác nhau.
   - `techFacets`, `featureFacets` → biến thể tech/tính năng phổ biến (thống kê chéo nhiều design system, không phải props/states của 1 bản cụ thể).
   - `examples[]` có `screenshot` → dùng làm 1 section ảnh riêng (xem Bước 2).
   - `prose` — object `{ <sectionId>: <nội dung text> }`. Section quan trọng nhất: `usage-guidelines` (best practice) và `resources` (link docs/guideline ngoài, có cả với component không có bài viết sâu vd modal/badge/text-input/empty-state); ngoài ra có thể có `description`, `interactivity`, `styling`, `markup`, `footnotes`. Khi có nội dung: dùng làm đầu vào cho `report` (Bước 2) — **trích dẫn ngắn + luôn dẫn nguồn**, không copy nguyên đoạn dài (site không có LICENSE, chỉ dùng nội bộ làm tham chiếu).

### Bước 1b-2 — Tóm tắt guideline UX/UI từ resources (làm nếu `prose.resources` có link)

Đây là nguồn chính cho purpose/states/best-practice của report. **Chỉ chạy khi cache CHƯA có field `resourceSummaries`** (đã tóm rồi thì đọc lại, không fetch lại).

1. Chọn tối đa 3 link từ `prose.resources`:
   - Ưu tiên nguồn UX guideline: Balsamiq, Nielsen Norman Group, Open UI, UI Playbook, blog cá nhân của expert UX (vd adrianroselli.com, daverupert.com).
   - Bỏ link thư viện code (uiverse.io…), link dev/caniuse/css-tricks, Medium (thường 403).
2. WebFetch từng link với prompt chuẩn (thay `<tên component>`):
   > Bài viết về component `<tên>`. Tóm tắt bằng tiếng Việt theo đúng 4 mục: 1) Dùng để làm gì (purpose/use cases); 2) Khác gì so với component liên quan nếu bài có nhắc; 3) Liệt kê các state đúng tên từng state; 4) Best practice quan trọng nhất (3-6 gạch đầu dòng, cả về label/placeholder nếu bài nhắc). Mục nào không đề cập thì ghi rõ "không đề cập".
3. Link lỗi (403, timeout) → skip, ghi chú vào `report.note`.
4. **Ghi kết quả vào cache** để lần sau không fetch lại — thêm field vào `component-gallery/cache/<slug>.json`:
   ```json
   "resourceSummaries": [
     { "url": "https://balsamiq.com/...", "title": "Text Input Guidelines — Balsamiq",
       "summary": "…4 mục tiếng Việt đã tóm, giữ nguyên link ảnh nếu WebFetch trả về…" }
   ]
   ```

## Bước 2 — Viết `data/<slug>.json`

Dùng schema chung (`_shared/ARCHIVE-CONVENTIONS.md`), `category: "component"`. Riêng cho Component:

- **Section Mobbin**: nhóm theo chủ đề/pattern, `layout: "grid"` (mặc định), `platform: "ios"|"web"`, không có `step`, `image` = đường dẫn local `../assets/shots/<slug>/…`, `sourceImage` = URL gốc từ MCP, `url` = `mobbin_url` của từng screen.
- **Section component.gallery** (nếu có data ở Bước 1b): section riêng, không trộn với Mobbin — `name: "Component Gallery — cách các design system khác gọi/thiết kế <tên>"`, `layout: "grid"`, mỗi item `platform: "cg"`, `app` = `designSystem`, `image` = `screenshot`, `url` = `url` (docs gốc design system). Chọn lọc examples nổi tiếng (Material, Carbon, GOV.UK, Polaris…) thay vì nhét cả 100 — toàn bộ đã có tại `sourceUrl`.
- **`taxonomy`** (nếu có data component.gallery): thêm field top-level ngang hàng `sections`:
  ```json
  "taxonomy": {
    "source": "component.gallery",
    "sourceUrl": "https://component.gallery/components/<slug>/",
    "aliases": ["Tag", "Label", "Chip"],
    "nameDistribution": { "Badge": 45, "Tag": 32 },
    "techFacets": { "React": 78, "Vue": 11 },
    "featureFacets": { "Code examples": 106, "Accessibility": 27 }
  }
  ```
  Field này **chưa có UI hiển thị riêng** trong `research/<slug>.html` — phần hiển thị nằm trong `report.naming` (xem dưới), `taxonomy` chỉ lưu data thô đầy đủ.
- **`report`** — block tổng hợp theo **4 câu hỏi designer**, là đầu ra chính của component research. `MobbinGallery.render` tự render block này lên trên các section ảnh:
  ```json
  "report": {
    "tldr": "1 câu tổng quát về component (được phép <b>đậm</b>, <code>code</code>)",
    "purpose":       { "items": [{ "text": "…", "src": "Balsamiq" }] },
    "differences":   { "rows": [{ "name": "Text area", "use": "đoạn dài nhiều dòng", "src": "Balsamiq" }],
                       "note": "Select/Combobox: không bài nào so sánh — cần nguồn khác" },
    "states":        { "rows": [{ "name": "Focus", "desc": "…", "src": "Balsamiq · UI Playbook" }],
                       "note": "Gộp + chuẩn hoá tên state từ 2 nguồn" },
    "naming":        { "headline": "72 design system gọi component này bằng 14 tên",
                       "bars": [{ "name": "Input", "count": 26 }],
                       "camps": [{ "name": "“Text field”", "ds": "Material · Atlassian · Polaris" }],
                       "advice": "nên dùng tên nào vì sao" },
    "bestPractices": [{ "group": "Label & placeholder",
                        "items": [{ "text": "…", "src": "UI Playbook" }] }],
    "note": "gaps/thiếu nguồn gì, nguồn nào bị bỏ (403)…"
  }
  ```
  Quy tắc viết report:
  - **Mỗi fact phải có `src`** (tên nguồn: "Balsamiq", "UI Playbook", "component.gallery"…). Không có nguồn → không đưa vào, hoặc ghi rõ trong `note` là suy luận.
  - **States**: gộp chuẩn hoá từ nhiều nguồn (vd Balsamiq nói Normal/Focus/Disabled, UI Playbook nói đủ 6) thành 1 danh sách dùng tên tiếng Anh chuẩn (Default, Hover, Focus, Active, Error, Disabled, Read-only…).
  - **Naming**: `bars` = top phân bố tên từ `nameDistribution` (gộp biến thể viết hoa/thường rõ ràng, hàng cuối có thể là "còn lại N biến thể"); `camps` = synthesize nhóm design system theo tên họ gọi (đọc `examples[]`) — insight quan trọng nhất cho designer.
  - **Điểm trống ghi thật** "không đề cập" — không bịa.
  - `tldr` là chuỗi HTML duy nhất được viết tay (cho phép thẻ đơn giản); mọi text khác được escape bởi renderer.
- **`sources`** — footer nguồn & phương pháp:
  ```json
  "sources": [
    { "label": "component.gallery — <tên>", "url": "https://component.gallery/components/<slug>/", "note": "72 ví dụ, cache 2026-09-22" },
    { "label": "Balsamiq — Text Input Guidelines", "url": "https://…", "note": "tóm tắt bằng máy từ bài gốc (Tess Gadd)" }
  ]
  ```

## Bước 3–5 — Render, đăng ký, validate & báo cáo

Theo `_shared/ARCHIVE-CONVENTIONS.md`. Riêng cho Component:
- Render dùng chung template — `report` và `sources` tự hiển thị, không cần làm gì thêm.
- Validate thêm: `report` có đủ purpose/differences/states/naming (trừ khi component.gallery không có gì — khi đó vẫn giữ report với các mục có được + `note` giải thích), mọi `src` khớp tên nguồn trong `sources`.
- Báo cáo cuối: nêu `aliases`/`nameDistribution` (các tên gọi khác của component), tóm tắt `report.states` + `prose["usage-guidelines"]` nếu có, liệt kê nguồn từ `resourceSummaries` kèm `sourceUrl`.

## Lưu ý riêng

- component.gallery luôn gộp chung 1 entry với Mobbin cho cùng 1 component (không tách thành research/entry riêng).
- Repo gốc component.gallery không có LICENSE → chỉ dùng nội bộ để research, luôn giữ link `sourceUrl`/`url` về nguồn, screenshot chỉ hotlink chứ không mirror. Tương tự với các bài UX guideline: chỉ lưu **tóm tắt** + link gốc vào `resourceSummaries`, không copy nguyên văn.
- Không dùng `component-gallery/crawl.mjs to-data` — lệnh demo cũ (ghi ra `sample-output/`, không thuộc workflow). Skill chỉ dùng `fetch` + đọc thẳng `cache/<slug>.json`.
