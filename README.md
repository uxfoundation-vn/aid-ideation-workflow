# Bước 1 — Điểm xuất phát

## Prompt vừa chạy

Chưa có — đây là điểm xuất phát.

## Kết quả (hiện có trong folder)

| File | Là gì |
|---|---|
| `.mcp.json` | Đã trỏ sẵn tới Mobbin MCP — mở project bằng Claude Code và đồng ý kích hoạt server |
| `.gitignore` | Những thứ không đưa lên git |
| `README.md` | File này |

**Điều kiện:** bạn cần tài khoản Mobbin của riêng mình.

---

## Prompt 1 — Test MCP

Mở Claude, gõ:

> Test MCP Mobbin xem chạy chưa

**Cần thấy:** bot gọi được công cụ của Mobbin và có kết quả trả về (dạng JSON thô trên màn hình). **Không cần lưu gì cả** — nhìn output và thinking của bot là đủ.

## Prompt 2 — Crawl flow login, show lên html

Gõ tiếp:

> Crawl thử flow login của 2 app iOS, show lên 1 file html để check

**Cần thấy:** xuất hiện 1 file html, mở bằng browser được, ảnh các màn hình login xếp theo thứ tự bước, tách theo app.

---

## Xem đáp án + đề bài tiếp theo

```
git restore . && git clean -fd && git checkout step2
```

*(Lệnh này dọn bản bạn vừa làm và chuyển sang bản chuẩn của bước 2 — bản live của bạn khác bản mẫu là chuyện bình thường: branch là một lời giải, không phải lời giải duy nhất.)*
