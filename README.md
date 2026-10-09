# Bước 9 — Đánh giá flow: report UX/UI

## Prompt vừa chạy

> sau khi kéo đc flow về, tôi muốn build thêm 1 flow đánh giá các flow, về mặt UXUI, cái gì học được, cái gì hạn chế cần tránh. output là 1 report. phải đủ cấu trúc tương tự UI Component. brainstorm trước, thực thi sau

## Kết quả

Đây là bản đầy đủ của workflow — điểm cuối của chuỗi bài.

| File | Là gì |
|---|---|
| `research/places-map-search.html` + `data/places-map-search.json` | **Mới.** 9 flow tìm địa điểm từ bản đồ (36 màn) của 7 app: Places, Tock, corner, Chick-fil-A (iOS) · Airbnb, PamPam, Klook (web) — kèm khối review ở trên cùng |
| `assets/gallery.js`, `assets/gallery.css` | Sửa. Khung biết vẽ khối review flow và chip trỏ về màn hình |
| `assets/shots/places-map-search/` | **Mới.** 36 ảnh màn hình |
| `.claude/skills/_shared/source-index/` | **Mới.** Danh sách link Laws of UX + NN/g tra offline, để gắn link tham khảo cho nhận xét |
| `research/dropdown-menu.html` | Thêm 1 research component nữa (dropdown menu) để kho có nhiều mục |

Mở `index.html` → **Tìm kiếm địa điểm từ bản đồ**. Khối review trên cùng trả lời:

1. **Goal & hành trình** — từng flow bắt đầu từ đâu, kết thúc ở đâu, đặc điểm riêng
2. **Trường phái** — 9 flow chia 3 cách tiếp cận: map để khám phá · search có nhiệm vụ rõ · map như sổ tay quanh 1 điểm — mỗi phe kèm đánh đổi
3. **Trạng thái đáng chú ý** — 20 state thấy trong ảnh (query trống, autocomplete, không có kết quả…)
4. **Đáng học** — 11 ý
5. **Nên tránh / hạn chế** — 7 ý
6. **Đề xuất ngoài data** — 4 ý tưởng, ghi rõ là suy đoán, không có dẫn chứng trong ảnh

Điểm cần quan sát:

- **Mỗi ý đáng học / nên tránh đều có chip ảnh nhỏ** (vd «Places — Searching Places · b1–2») — bấm vào mở đúng màn hình đó trong lightbox. Ý nào không có dẫn chứng trong ảnh thì tách sang mục «Đề xuất ngoài data»
- Cấu trúc **giống report component ở bước 8**: tóm tắt 1 đoạn → các câu hỏi cố định → nguồn. Designer đọc 2 loại report theo cùng 1 cách
- Bot **brainstorm trước** (đề xuất các mục report, hỏi lại), bạn chốt xong mới làm — với việc cần đánh giá, để bot tự chạy thẳng thường ra report lan man

---

## Hết chuỗi bài

Từ 1 folder trống, giờ đã có 1 workflow research hoàn chỉnh: 2 nguồn (Mobbin, component.gallery), 2 skill, khung dùng chung, kho lưu trữ, report component và report đánh giá flow.

Thử tự chạy:

> Research component badge

> Tìm flow onboarding của 2 app iOS, rồi đánh giá các flow

Muốn quay lại 1 bước bất kỳ:

```
git restore . && git clean -fd && git checkout step1
```
