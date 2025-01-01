document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Ngừng hành động mặc định của form (reload trang)

    // Lấy thông tin từ các input
    const subject = document.getElementById('subject').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    // Tạo thông tin sự kiện (chuyển thành định dạng datetime)
    const startDateTime = new Date(startDate + ' ' + startTime);
    const endDateTime = new Date(startDate + ' ' + endTime);

    // Định dạng ngày giờ cho URL Google Calendar và Apple Calendar
    const startFormatted = formatDateForCalendar(startDateTime);
    const endFormatted = formatDateForCalendar(endDateTime);

    // Cấu trúc URL cho Google Calendar
    const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(subject)}&dates=${startFormatted}/${endFormatted}`;

    // Cấu trúc URL cho Apple Calendar (iOS)
    const appleCalendarURL = `calshow://?eventTitle=${encodeURIComponent(subject)}&eventStart=${startFormatted}&eventEnd=${endFormatted}`;

    // Kiểm tra xem có phải trên iOS không (dựa vào userAgent) và mở ứng dụng lịch tương ứng
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = appleCalendarURL;  // Mở Apple Calendar nếu trên iOS
    } else {
        window.location.href = googleCalendarURL;  // Mở Google Calendar nếu trên các thiết bị khác
    }
});

// Hàm định dạng ngày giờ cho URL Google Calendar và Apple Calendar
function formatDateForCalendar(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}00Z`;  // Định dạng cho Google Calendar và Apple Calendar
}
