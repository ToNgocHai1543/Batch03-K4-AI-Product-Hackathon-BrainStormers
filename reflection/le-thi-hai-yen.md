# Reflection — Lê Thị Hải Yến

## Vai trò trong nhóm

Tôi đảm nhiệm vai trò **Người 2 — Spec & Design Lead**. Trách nhiệm chính của tôi là chuyển bài toán của nhóm thành một lát cắt sản phẩm rõ ràng, xác định ranh giới AI được phép làm, thiết kế hành vi khi hệ thống không chắc chắn hoặc thất bại, và bảo đảm `spec.md` nhất quán với prototype thực tế.

## Phần mình làm

Tôi phụ trách chính các phần §3–§6 và §9 trong `spec.md`:

- Nghiên cứu NotebookLM, Khanmigo và ChatGPT Study Mode theo bốn tiêu chí: flow, điểm đáng học, điểm cần tránh và điểm khác biệt của AI Learning Bridge.
- Chốt lát cắt: khi học viên mở buổi mới, hệ thống đề xuất recap buổi trước và các bridge có trích dẫn để học viên nắm lại mạch kiến thức trong tối đa ba phút.
- Chọn mức **augment** thay vì automate. AI đề xuất nội dung, còn học viên có quyền kiểm tra nguồn, phản hồi hoặc bỏ qua vì recap/bridge sai có thể khiến học viên ôn sai kiến thức.
- Áp dụng các nguyên tắc HAX/PAIR như G2, G8, G9, G10, G11 và G15 vào citation, cảnh báo thiếu dữ liệu, nút bỏ qua, giải thích bridge và luồng phản hồi.
- Xây dựng bốn lớp rủi ro, chín kịch bản cụ thể và các đường đi happy, low-confidence, failure, correction và out-of-scope.
- Đối chiếu spec với source code, phân biệt rõ phần AI thật và phần prebaked/mock, đồng thời ghi lại các sai lệch cần xử lý trong changelog.
- Tích hợp kết quả khảo sát 27 học viên vào phần evidence và impact: 85% gặp vấn đề mất tính liên tục giữa các buổi, 74% gặp tình trạng ở ít nhất khoảng một nửa số buổi và 96% chắc chắn hoặc có thể sử dụng tính năng nếu được tích hợp vào VLearn.
- Làm reviewer độc lập thứ hai cho 13 case eval, chấm theo bốn chiều: citation support, bridge logic, domain correctness và useful size.

## AI hỗ trợ thế nào

Tôi sử dụng AI như một công cụ hỗ trợ tổng hợp và phản biện, không dùng AI để tự quyết định thay mình. AI giúp tôi:

- Đối chiếu yêu cầu trong đề bài, rubric và tài liệu phân công để tránh bỏ sót deliverable.
- Tổng hợp tài liệu chính thức của các sản phẩm tương tự thành một bảng so sánh có cấu trúc.
- Kiểm tra tính nhất quán giữa lát cắt, non-goals, mức automation, các nguyên tắc HAX/PAIR và hành vi trong prototype.
- Rà soát source code để xác định phần nào chạy thật, phần nào mock và vị trí cụ thể của citation, feedback, fallback và trace.
- Hỗ trợ kiểm tra số liệu khảo sát và định dạng tài liệu.

Tôi vẫn trực tiếp quyết định nội dung spec, mức automation và kết quả chấm từng case. Với phần eval, tôi đọc output cùng các đoạn nguồn trước khi ghi `pass`, `fail` hoặc `na`, thay vì lấy kết quả validator tự động làm kết luận.

## Một bài học từ case fail của chính nhóm

Case giúp tôi học nhiều nhất là `hard_domain_01`. Output có citation tồn tại và recap về attention/Transformer đúng, nên validator tự động có thể xem kết quả là hợp lệ. Tuy nhiên, bridge từ **Transformer sang hệ thống LMS** và từ **chi phí token sang vận hành giáo dục** chỉ ghép hai khái niệm nghe có vẻ liên quan; tài liệu nguồn không chứng minh đây là quan hệ nền tảng thực sự. Vì vậy tôi chấm `fail` cho `bridge_logic`.

Từ case này, tôi nhận ra rằng **citation đúng địa chỉ chưa đồng nghĩa với lập luận đúng**. Một bridge cần đồng thời đáp ứng ba điều kiện: hai đầu khái niệm đều được nguồn hỗ trợ, quan hệ giữa chúng có ý nghĩa học tập thật, và lời giải thích không bổ sung một kết luận vượt quá tài liệu. Đây cũng là lý do sản phẩm cần human review cho quan hệ ngữ nghĩa, bên cạnh validator tự động kiểm schema và mã citation.

Nếu có thêm thời gian, tôi sẽ ưu tiên xây semantic gate cho bridge: khi quan hệ giữa hai buổi không đủ mạnh, hệ thống nên trả low-overlap hoặc không tạo bridge, thay vì cố sinh một liên kết nghe hợp lý. Bài học lớn nhất của tôi là trong sản phẩm AI giáo dục, một failure được phát hiện và giải thích trung thực có giá trị hơn một con số pass đẹp nhưng che giấu quan hệ kiến thức yếu.
