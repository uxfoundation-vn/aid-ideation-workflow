---
name: flow-research
description: Research 1 flow nhiều bước (login, onboarding, checkout, tìm kiếm…) trên Mobbin rồi lưu vào kho lưu trữ (data/ + research/ + index.html). Dùng khi user nhờ tìm/crawl 1 flow, 1 luồng nhiều bước trên Mobbin.
---

# Research Flow → Kho lưu trữ

Đọc `.claude/skills/_shared/ARCHIVE-CONVENTIONS.md` trước — schema, ảnh, render, đăng ký kho. Dưới đây chỉ là phần riêng cho Flow.

## Bước 1 — Search Mobbin

- `mcp__mobbin__search_flows`. Search cả `ios` lẫn `web` (2 call song song) nếu user không nói platform. User nêu tên app → đưa vào query.
- `limit` tối đa 4–5 mỗi platform: kết quả kèm ảnh preview, để cao quá output bị cắt mất thông tin flow.
- Xem ảnh để chọn đúng flow — không chọn chỉ dựa vào tên.
- Tải ảnh các flow đã chọn về `assets/shots/<slug>/` trong 1 lệnh Bash (`mkdir` + `curl` + `file` kiểm tra).

## Bước 2 — Viết `data/<slug>.json`

- `category: "flow"`. Mỗi flow = 1 section, `layout: "flow"`, tên dạng `"<App> — <tên flow> (N bước)"`.
- Mỗi màn hình 1 item, `step` tăng dần đúng thứ tự trong flow.
- `url` mọi bước = link flow trên Mobbin.
- `alt` mô tả màn hình — viết theo ảnh đã tải về, không đoán theo thứ tự preview.

## Bước 3 — Render, đăng ký, kiểm tra

Theo `_shared/ARCHIVE-CONVENTIONS.md`. Báo cáo: tên từng flow, số bước, điểm đáng chú ý.
