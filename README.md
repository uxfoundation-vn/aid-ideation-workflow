# Bước 4 — Hàm crawl component.gallery

## Prompt vừa chạy

> Viết hàm để crawl

## Kết quả

| File | Là gì |
|---|---|
| `component-gallery/crawl.mjs` | **Mới.** Script crawl component.gallery, làm đúng 2 việc: `list` và `fetch` |

Cách chạy và kết quả khi chạy thử:

```
node component-gallery/crawl.mjs list              # lấy danh sách ~60 component
node component-gallery/crawl.mjs fetch text-input  # tải chi tiết 1 component
```

```
ok  text-input  — 72 examples, 0 aliases, 14 tên khác nhau, prose: resources
```

Dữ liệu tải về nằm trong `component-gallery/cache/` — folder này **không đưa lên git** (đã có trong `.gitignore`), vì dữ liệu của site không có LICENSE (xem lại bước 3). Ai cần thì tự chạy script để có bản của mình.

Điểm cần quan sát:

- Các ràng buộc ở bước 3 nằm ngay đầu file script: tên trình duyệt trung thực, chờ 1,5 giây giữa mỗi lần tải, tải rồi thì không tải lại
- Chạy `fetch` lần 2 sẽ thấy `skip (cached)` — script dùng lại bản đã tải, không làm phiền site
- Không cần cài thêm gì: chỉ cần Node 18 trở lên

---

## Prompt 5 — Crawl thử component text field, show lên html

Gõ tiếp:

> Crawl thử component text field, show lên file html để check

**Cần thấy:** 1 file html mở bằng browser được, có các ví dụ text field từ nhiều design system khác nhau, mỗi ví dụ có ảnh + tên design system + link về docs gốc.

---

## Xem đáp án + đề bài tiếp theo

```
git restore . && git clean -fd && git checkout step5
```
