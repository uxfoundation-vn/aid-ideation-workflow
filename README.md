# Bước 8 — Report component: 4 câu hỏi của designer

## Prompt vừa chạy

> Thêm phần mô tả report cho component: dùng để làm gì, khác gì so với các component khác, có các state gì, đặt tên như nào, và nguồn tham khảo. Test thử với text field

## Kết quả

| File | Thay đổi | Là gì |
|---|---|---|
| `data/text-field.json`, `research/text-field.html` | Sửa | Thêm khối `report` (4 câu hỏi + best practice) và `sources` (nguồn) |
| `assets/gallery.js` | Sửa | Khung biết vẽ khối report và phần «Nguồn & phương pháp» |
| `templates/template.html` | Sửa | Ghi chú cấu trúc data có thêm `report` và `sources` |
| `.claude/skills/component-research/SKILL.md` | Sửa | Thêm bước tóm tắt tài liệu tham khảo + cách viết report |

Để có nội dung, bot lấy 2 bài hướng dẫn mà component.gallery gắn sẵn cho text field — **Balsamiq** (Text Input Guidelines) và **UI Playbook** (TextField) — đọc rồi tóm tắt. Link Uiverse.io bị bỏ vì là thư viện code, không phải hướng dẫn UX.

Mở `index.html` → **Text Field**. Trên cùng trang giờ có khối report:

1. **Dùng để làm gì?** — 3 ý
2. **Khác gì so với component liên quan?** — Text area, Search box, Date picker
3. **Có các state gì?** — 7 state chuẩn: Default, Hover, Focus, Active, Error, Disabled, Read-only (gộp từ 2 nguồn: Balsamiq nêu 3, UI Playbook nêu 6)
4. **Đặt tên như nào?** — 72 design system, 14 cách viết, 3 phe chính (Input · Text input · Text field), kèm gợi ý nên chọn tên nào

\+ **Best practice** (label & placeholder, lỗi & bắt buộc, kích thước) và **Nguồn & phương pháp** ở cuối.

Điểm cần quan sát:

- **Mỗi ý đều có nhãn nguồn** — không có nguồn thì không đưa vào. Chỗ nào nguồn không nói thì report ghi thẳng là "không so sánh / cần nguồn khác", không bịa
- Nguồn không do bot tự nghĩ ra: lấy từ phần tài liệu tham khảo component.gallery gắn sẵn
- Skill `component-research` đã được cập nhật — lần sau research component nào cũng tự có report này

---

## Prompt 9 — Đánh giá flow

Đã kéo được flow về, giờ cho bot đánh giá. Gõ tiếp:

> sau khi kéo đc flow về, tôi muốn build thêm 1 flow đánh giá các flow, về mặt UXUI, cái gì học được, cái gì hạn chế cần tránh. output là 1 report. phải đủ cấu trúc tương tự UI Component. brainstorm trước, thực thi sau

**Cần thấy:** bot brainstorm cấu trúc report trước, chờ bạn chốt rồi mới làm. Trang flow có thêm 1 khối report ở trên cùng — giống report component ở bước này — nói rõ flow nào làm gì hay, cái gì nên tránh, và mỗi nhận xét trỏ được về đúng màn hình.

---

## Xem đáp án + đề bài tiếp theo

Đáp án của Prompt 9 là bản đầy đủ ở branch `main`:

```
git restore . && git clean -fd && git checkout main
```
