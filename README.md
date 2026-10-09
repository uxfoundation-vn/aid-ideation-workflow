# Bước 5 — Text field từ component.gallery trên 1 trang html

## Prompt vừa chạy

> Crawl thử component text field, show lên file html để check

## Kết quả

| File | Là gì |
|---|---|
| `preview-text-field.html` | **Mới.** Trang html thô: danh sách tên gọi + lưới 71 ví dụ text field, mỗi ví dụ có ảnh, tên design system, link «Docs gốc» |

Bot chạy `node component-gallery/crawl.mjs fetch text-input` (script của bước 4) rồi dựng trang từ dữ liệu vừa tải. Dữ liệu thô vẫn nằm trong `component-gallery/cache/`, không lên git.

Mở `preview-text-field.html` bằng browser. Điểm cần quan sát:

- 71 ví dụ text field từ design system thật, mỗi ví dụ có link về docs gốc
- Cùng 1 component nhưng **14 tên gọi khác nhau**: Text field, Input, Text input, TextInput… — thứ designer hay cãi nhau khi đặt tên component
- Ảnh vẫn nằm trên server của component.gallery (link thẳng), không tải về — đúng ràng buộc ở bước 3

Giờ mở lại `preview.html` của bước 2 và đặt cạnh trang này: **2 trang, 2 kiểu code, 2 kiểu giao diện**. Mỗi lần crawl thứ mới bot lại viết 1 trang html từ đầu → càng crawl càng lộn xộn, không có chỗ nào xem lại tất cả.

---

## Prompt 6 — Tạo template html

Gõ tiếp:

> Tạo template html, các lần crawl sau chỉ trả về data đổ vào template

**Cần thấy:**

- 1 file template dùng chung + 1 chỗ để data riêng của từng lần crawl
- 2 trang thô ở bước 2 và bước 5 được làm lại theo template, cùng 1 giao diện
- 1 trang index liệt kê mọi lần research đã lưu, bấm vào để mở lại

---

## Xem đáp án + đề bài tiếp theo

```
git restore . && git clean -fd && git checkout step6
```
