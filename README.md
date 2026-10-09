# Bước 3 — component.gallery: crawl được không?

## Prompt vừa chạy

> Check link này xem có crawl được không, test thử. Có hạn chế gì không?
> https://component.gallery/components/text-input

## Kết quả

**Không có file mới** — so với bước 2, chỉ README này thay đổi. Kết quả là câu trả lời của bot sau khi tự tải thử trang và đọc robots.txt, điều khoản của site:

### Crawl được, và dễ

- Site là trang tĩnh, dữ liệu của mỗi component nằm sẵn trong HTML (tên, design system, tech, tính năng, link docs, ảnh) → chỉ cần tải trang về rồi bóc chữ, không cần mở trình duyệt giả lập, không cần đăng nhập
- 1 trang danh sách ~60 component, mỗi component 1 trang riêng với vài chục ví dụ từ design system thật (Material, Carbon, GOV.UK, Polaris…)
- Ảnh screenshot mở thẳng được bằng link, không bị chặn

### Hạn chế — phần quan trọng hơn

- **Site chặn bot AI có tên** (robots.txt chặn ClaudeBot → test thật trả 403). Tải bằng tên trình duyệt trung thực thì được. Không giả mạo, không lách
- **Site ghi rõ mục đích cho phép: tham khảo (`use=reference`), cấm dùng để train AI**
- **Repo gốc không có LICENSE** → dữ liệu không mở. Chỉ dùng nội bộ để research: luôn ghi nguồn + link về trang gốc, **không tải ảnh về lưu lại**, không đăng lại nội dung, không đưa dữ liệu crawl vào repo public
- Bài viết sâu (hướng dẫn dùng, best practice) chỉ có ở ~12/60 component; phần còn lại chủ yếu là danh sách ví dụ + link tài liệu ngoài
- Lịch sự với site: chờ ~1,5 giây giữa mỗi lần tải, lưu lại kết quả để không tải lặp

Điểm cần quan sát: bot không chỉ trả lời "được/không" mà phải tự test, đọc robots.txt và điều khoản — **crawl được về kỹ thuật chưa chắc là được phép dùng**.

---

## Prompt 4 — Viết hàm để crawl

Gõ tiếp:

> Viết hàm để crawl

**Cần thấy:** xuất hiện 1 file script trong folder `component-gallery/`, chạy được 2 việc: lấy danh sách component, và tải chi tiết 1 component về máy.

---

## Xem đáp án + đề bài tiếp theo

```
git restore . && git clean -fd && git checkout step4
```
