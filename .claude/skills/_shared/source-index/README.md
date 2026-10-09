# Source index — tra link tham khảo offline

Index local của các nguồn uy tín để gắn "Tham khảo" vào report mà **không cần đoán URL / search mạng**.

## File

- `lawsofux.json` — 29 luật (name + url), crawl từ trang chủ lawsofux.com
- `nngroup-articles.json` — toàn bộ bài NN/g (slug + url, 1735 bài), crawl từ sitemap.xml

Crawl ngày 2026-09-29. **NN/g ra bài mới liên tục — cứ khoảng 1 tháng crawl lại 1 lần:**

```bash
python3 .claude/skills/_shared/source-index/crawl.py
```

Script cùng thư mục, ghi đè cả 2 file json (Laws of UX ít khi thêm luật nhưng crawl lại không tốn gì).

## Cách dùng khi cần link tham khảo cho 1 nhận xét

1. So khớp từ khóa của nhận xét với `name`/`slug` trong 2 file này (offline, 0 network call).
2. Khớp ứng viên nào thì **verify bằng 1 call Bash duy nhất**: vòng lặp `curl -s -o /dev/null -w "%{http_code}"` cho cả danh sách ứng viên — chỉ link trả 200 mới được gắn.
3. Không khớp chắc chắn 1-1 thì **không gắn** — "Tham khảo" là optional, không bắt buộc mỗi fact (khác với report component).

## Quy tắc curl-first

Khi cần verify URL (bất kỳ nguồn nào, kể cả ngoài 2 file này): **không WebFetch từng ứng viên, không đoán slug từ trí nhớ** — gom cả chục ứng viên vào 1 vòng `curl` check status code trong 1 call Bash, chỉ fetch nội dung các URL còn sống. Tiền lệ 2026-09-29: đoán slug `prevent-user-errors` 404 trong khi bài đúng (`ten-usability-heuristics`) có sẵn trong index này.
