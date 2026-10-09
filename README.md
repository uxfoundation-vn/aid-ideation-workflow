# Bước 6 — Template dùng chung + kho lưu trữ

## Prompt vừa chạy

> Tạo template html, các lần crawl sau chỉ trả về data đổ vào template

## Kết quả

| File | Thay đổi | Là gì |
|---|---|---|
| `templates/template.html` | Mới | Khung trang dùng chung — chỉ cần thay object `DATA` |
| `assets/gallery.css`, `assets/gallery.js`, `assets/fonts/` | Mới | Giao diện dùng chung: card, dải flow có số bước, phóng to ảnh, link nguồn |
| `data/login-ios.json` | Mới | Data flow login (từ bước 2) |
| `data/text-field.json` | Mới | Data text field (từ bước 5), nhóm theo tên gọi: Input · Text input · Text field · tên khác |
| `research/login-ios.html`, `research/text-field.html` | Mới | 2 trang = khung + data tương ứng |
| `index.html` | Mới | Kho lưu trữ: liệt kê mọi research, chia Flow / UI Component |
| `shots/` → `assets/shots/login-ios/` | Chuyển chỗ | 10 ảnh login của bước 2 |
| `preview.html`, `preview-text-field.html` | **Xoá** | 2 trang thô đã được làm lại theo khung |

Mở `index.html` bằng browser — đây là cửa vào duy nhất từ giờ.

Project giờ chia làm 3 phần, mỗi phần 1 việc:

| Phần | Ở đâu | Làm gì |
|---|---|---|
| Khung | `templates/` + `assets/` | Giao diện dùng chung |
| Data | `data/<tên>.json` | Riêng của từng lần crawl: tên, nguồn, danh sách ảnh + link |
| Kho | `index.html` | Liệt kê mọi research đã lưu |

Điểm cần quan sát:

- 2 trang giờ cùng 1 giao diện, dù 1 trang là flow (có thứ tự bước), 1 trang là component (lưới ảnh)
- Lần crawl sau bot **không viết html nữa** — chỉ trả data, đổ vào khung, thêm 1 dòng vào kho
- Muốn đổi giao diện cả kho chỉ cần sửa 1 chỗ trong `assets/`

---

## Prompt 7 — Viết 2 skill

Gõ tiếp:

> Viết 2 skill tách biệt để crawl comp và flow

**Cần thấy:** 2 skill trong `.claude/skills/` — 1 cho component, 1 cho flow — ghi lại đúng các bước đã làm từ đầu tới giờ để lần sau chỉ cần nói "research component X" hoặc "tìm flow Y" là bot tự làm đủ, ra đúng khung, tự thêm vào kho.

---

## Xem đáp án + đề bài tiếp theo

```
git restore . && git clean -fd && git checkout step7
```
