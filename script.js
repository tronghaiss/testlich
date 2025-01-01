document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Ngừng hành động mặc định của form (reload trang)

    // Lấy thông tin từ các input
    const subject = document.getElementById('subject').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    // Tạo thông tin sự kiện (tạo tệp .ics)
    const startDateTime = new Date(startDate + ' ' + startTime);
    const endDateTime = new Date(startDate + ' ' + endTime);
    const endRepeatDate = new Date(endDate);  // Ngày kết thúc sự kiện
    endRepeatDate.setDate(endRepeatDate.getDate() + 1);

    // Định dạng sự kiện theo chuẩn iCalendar (.ics)
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${subject}
DTSTART;TZID=Asia/Ho_Chi_Minh:${formatDateToICS(startDateTime)}
DTEND;TZID=Asia/Ho_Chi_Minh:${formatDateToICS(endDateTime)}
RRULE:FREQ=DAILY;UNTIL=${formatDateToICS(endRepeatDate)}
END:VEVENT
END:VCALENDAR`;
    
    // Tạo tệp .ics và cung cấp liên kết tải xuống
    const blob = new Blob([icsData], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'event.txt';  // Tên tệp sẽ là 'event.ics'
    link.click();  // Mở liên kết để tải tệp xuống
});

// Hàm để định dạng ngày tháng theo chuẩn iCalendar (yyyymmddThhmmss)
function formatDateToICS(date) {
    const year = date.getFullYear(); // Sử dụng getFullYear() thay vì getUTCFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm số 0 nếu tháng có 1 chữ số
    const day = String(date.getDate()).padStart(2, '0'); // Thêm số 0 nếu ngày có 1 chữ số
    const hours = String(date.getHours()).padStart(2, '0'); // Sử dụng getHours() để lấy giờ theo múi giờ địa phương
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}
