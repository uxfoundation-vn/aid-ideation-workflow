---
name: flow-research
description: Research 1 flow nhiều bước hoặc 1 màn hình cụ thể của 1 tính năng (onboarding, checkout, AI planner...) qua Mobbin (search_flows, screen thật từ app production) — rồi lưu vào kho lưu trữ repo (data/+research/+index.html). Dùng khi user yêu cầu tìm/research 1 flow/luồng nhiều bước hoặc 1 màn hình cụ thể trên Mobbin.
---

# Research Flow / Màn hình → Kho lưu trữ

Trước khi làm từ Bước 2 trở đi, đọc `.claude/skills/_shared/ARCHIVE-CONVENTIONS.md` — có schema/quy ước chung (viết `data/`, render `research/`, đăng ký `index.html`, validate & báo cáo). Các bước dưới đây chỉ nêu phần **khác biệt riêng cho Flow**.

## Bước 1 — Search trên Mobbin

- `mcp__mobbin__search_flows` → `category: "flow"`.
- **Tốc độ — `limit` mỗi platform tối đa 4–5**: output trả kèm ảnh preview inline cho từng flow, limit ~8 là vượt ngưỡng ~25k token → bị truncate, mất nguyên metadata (tên flow, `mobbin_url`, `image_url`) và phải search lại từ đầu (tiền lệ 2026-09-24: search 2 platform limit 8 đều truncate → tốn thêm cả 1 vòng search limit 4). Bị truncate thì giảm limit search lại, không retry y nguyên params cũ.
- **Tốc độ — dùng luôn ảnh preview, đừng re-read ảnh đã download**: preview trong kết quả search chính là các screen của flow — đủ để **chọn flow**. ⚠️ Nhưng **thứ tự preview KHÔNG đáng tin khi viết `alt`**: kết quả nhiều flow có thể trộn preview chéo giữa các flow, kể cả khi không truncate (tiền lệ 2026-09-25: alt viết theo preview sai 7/36 màn ở Chick-fil-A + Airbnb, lộ ra nhờ screenshot render). Viết `alt` theo **file đã download** (Read full-res) hoặc screenshot render — spot-read các màn không chắc chắn, đừng đoán theo vị trí preview.
- Search cả `ios` lẫn `web` nếu user không chỉ định platform — 2 call đặt song song trong cùng 1 lượt. Nếu user nêu tên app cụ thể, đưa vào query; nếu kết quả trả về app khác, search lại riêng cho từng app.
- Xem ảnh trả về để đánh giá đúng nội dung — không mô tả chỉ dựa trên metadata.
- **Download ngay mọi ảnh chọn dùng về `assets/shots/<slug>/`** trước khi viết data — link ảnh Mobbin hết ~4 tuần là 410 (cơ chế + lệnh xem mục «Ảnh» trong `_shared/ARCHIVE-CONVENTIONS.md`). Gom vào **1 call Bash** duy nhất: `mkdir` + `curl` tất cả ảnh + `file` kiểm tra.

## Bước 2 — Viết `data/<slug>.json`

Dùng schema chung (`_shared/ARCHIVE-CONVENTIONS.md`), `category: "flow"`. Riêng cho Flow:

- Mỗi flow là 1 section, `layout: "flow"`, mỗi màn hình 1 item có `step` tăng dần theo `position`.
- API không trả `mobbin_url` per-screen cho flow → `url` của mọi step = `mobbin_url` của flow đó.
- Không có field `taxonomy`, không dùng component.gallery.

## Bước 3–5 — Render, đăng ký, validate & báo cáo

Theo `_shared/ARCHIVE-CONVENTIONS.md`. Báo cáo cuối: tóm tắt từng flow (tên, số bước, điểm đáng chú ý về UX).

**Tốc độ — gom call** (ít call write hơn = nhanh hơn, ít dính classifier outage hơn):
- Viết `data/<slug>.json` + `research/<slug>.html` + sửa `index.html` trong **cùng 1 lượt** (3 file độc lập, gửi song song).
- Cuối cùng **1 call Bash** gom: validate JSON + screenshot tất cả các trang cần kiểm tra (research + index) trong cùng 1 lần chạy headless browser; Read các screenshot song song trong 1 lượt.

## Backlog (chưa làm ở skill này)

Đánh giá UX của flow (điểm hay/dở, đáng học hỏi, nên tránh) — dự kiến làm ở 1 bước/skill riêng sau này, chưa nằm trong scope hiện tại.
