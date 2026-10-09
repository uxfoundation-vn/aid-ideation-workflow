# Bước 2 — Flow login của 2 app iOS trên 1 trang html

## Prompt vừa chạy

**Prompt 1**

> Test MCP Mobbin xem chạy chưa

**Prompt 2**

> Crawl thử flow login của 2 app iOS, show lên 1 file html để check

## Kết quả

**Sau Prompt 1** — không có file nào. Bot gọi công cụ tìm kiếm của Mobbin và in ra kết quả thô (JSON): tên app, tên flow, link flow trên Mobbin, link ảnh từng màn hình. Thấy được là MCP đã chạy.

**Sau Prompt 2** — thêm 2 thứ:

| File | Là gì |
|---|---|
| `preview.html` | Trang html thô: 2 app, mỗi app 1 hàng ảnh theo thứ tự bước, kèm link «Xem flow trên Mobbin» |
| `shots/grubhub/01–06.jpg` | 6 màn hình login của Grubhub |
| `shots/dicks/01–04.jpg` | 4 màn hình login của DICK'S Sporting Goods |

Mở `preview.html` bằng browser. Điểm cần quan sát:

- Cùng một mục tiêu (login) nhưng mỗi app một cách giải: Grubhub 6 bước, DICK'S 4 bước, một app nhúng cả webview vào app native
- Thứ tự màn hình chính là hành trình người dùng — vì thế ảnh phải giữ đúng thứ tự bước

---

## Prompt 3 — Nguồn thứ 2: component.gallery

Dán link này vào Claude kèm câu hỏi:

> Check link này xem có crawl được không, test thử. Có hạn chế gì không?
> https://component.gallery/components/text-input

**Cần thấy:** bot tự tải thử trang, đọc điều khoản của site, rồi trả lời được 2 ý: crawl được không về kỹ thuật, và được phép dùng tới đâu.

---

## Xem đáp án + đề bài tiếp theo

```
git restore . && git clean -fd && git checkout step3
```
