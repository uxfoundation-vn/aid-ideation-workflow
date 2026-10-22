# Ideation workflow — repo chỉ để chạy research

Repo này chỉ dùng để chạy workflow research UI: tìm screen/flow thật trên Mobbin, lưu vào kho (`data/` + `research/` + `index.html`). Không dùng cho việc khác.

## Mọi yêu cầu "tìm / research / kéo về / xem app nào làm X" → chạy workflow

Không search web thay thế, không trả lời từ trí nhớ. Chọn skill theo yêu cầu:

| Yêu cầu | Skill |
|---|---|
| 1 component UI (button, badge, text field, empty state…) | `component-research` |
| 1 flow nhiều bước, 1 màn hình, 1 trạng thái hay pattern của tính năng (onboarding, checkout, màn AI đang nghĩ…) | `flow-research` |
| "đánh giá flow" / review UX sau khi đã kéo flow | Thêm khối `review` vào `data/<slug>.json`, theo mẫu `data/places-map-search.json` (`tldr`, `goal`, `camps`, `states`, `good`, `avoid`, `ideas`, `note`). Mỗi ý `good`/`avoid` có chip trỏ về ảnh; ý không có dẫn chứng trong ảnh đưa vào `ideas`. Link tham khảo tra `.claude/skills/_shared/source-index/` |

Cần một trạng thái cụ thể (đang loading, đang nghĩ, lỗi…) thì dùng `search_screens` và gom theo màn (`layout: "grid"`, mẫu `data/ai-thinking-states.json`), vì `search_flows` toàn ra flow đã chạy xong. Chú chỉ bảo tìm thì chỉ kéo UI về, không viết review hay phân tích.

Yêu cầu chưa rõ là component hay flow thì chọn skill gần nhất, nói ngắn mình chọn skill nào rồi chạy luôn. Chỉ hỏi lại khi chọn sai sẽ ra kết quả vô nghĩa.

## Không chạy được thì dừng và báo, không tự đổi cách

Kiểm tra trước khi chạy: có tool `mcp__mobbin__*` (search_flows / search_screens) chưa.

- Chưa có, hoặc Mobbin báo cần authenticate → dừng, báo chú: "Mobbin chưa authorize — chạy `/mcp` để đăng nhập". Không chuyển sang search web.
- Lỗi giữa chừng (Mobbin lỗi, tải ảnh hỏng, `crawl.mjs` lỗi, validate fail) → đưa nguyên văn lỗi, nói đã làm xong tới bước nào, đề xuất cách xử lý.
- Riêng component.gallery không có component đó thì không phải lỗi, theo skill `component-research`.
- Có phần nào tự bổ sung ngoài Mobbin (suy luận, kiến thức sẵn) thì ghi rõ là "ngoài data", không trộn với dẫn chứng có ảnh.

## Quy tắc khác

- Không commit khi chưa hỏi. Không bao giờ commit `component-gallery/cache/`.
- Báo cáo cuối ngắn: kéo được những flow/màn nào, điểm đáng chú ý, mở trang nào trong `index.html`.
