# Bước 7 — 2 skill: research component và research flow

## Prompt vừa chạy

> Viết 2 skill tách biệt để crawl comp và flow

## Kết quả

| File | Là gì |
|---|---|
| `.claude/skills/component-research/SKILL.md` | **Mới.** Công thức research 1 component: Mobbin + component.gallery song song |
| `.claude/skills/flow-research/SKILL.md` | **Mới.** Công thức research 1 flow trên Mobbin, nhiều bước có thứ tự |
| `.claude/skills/_shared/ARCHIVE-CONVENTIONS.md` | **Mới.** Phần dùng chung của 2 skill: data, ảnh, khung, kho |

Không có trang html nào mới — kho vẫn như bước 6.

Skill là **công thức viết bằng chữ thường** — ghi lại đúng những gì đã làm tay từ bước 1 tới bước 6. Từ giờ chỉ cần nói tự nhiên:

> Research component badge

> Tìm flow onboarding của 2 app iOS

… bot tự nhận ra skill nào hợp, làm đủ các bước, ra đúng khung, tự thêm vào kho.

Điểm cần quan sát:

- Mở 2 file `SKILL.md` ra đọc — toàn tiếng Việt, không có code. Designer tự sửa được
- Phần chung tách riêng (`_shared/`) để 2 skill không viết lặp, không lệch nhau
- Component chạy **2 nguồn song song**: Mobbin cho screen thật trong app, component.gallery cho cách các design system gọi tên

Thử ngay: gõ "Research component badge" và xem bot có tự gọi skill không.

---

## Prompt 8 — Thêm phần mô tả cho report component

Trang component hiện mới chỉ có ảnh. Gõ tiếp:

> Thêm phần mô tả report cho component: dùng để làm gì, khác gì so với các component khác, có các state gì, đặt tên như nào, và nguồn tham khảo. Test thử với text field

**Cần thấy:** trang text field có thêm 1 khối report ở trên cùng, trả lời 4 câu hỏi của designer, mỗi ý có ghi nguồn. Skill component được cập nhật để lần sau tự làm phần này.

---

## Xem đáp án

```
git restore . && git clean -fd && git checkout step8
```
