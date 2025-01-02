document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const subject = document.getElementById('subject').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    const startDateTime = new Date(startDate + ' ' + startTime);
    const endDateTime = new Date(startDate + ' ' + endTime);
    const endRepeatDate = new Date(endDate);
    endRepeatDate.setDate(endRepeatDate.getDate() + 1);

    // Lấy danh sách các ngày trong tuần được chọn
    const selectedDays = Array.from(document.querySelectorAll('.repeat-day:checked')).map(input => input.value);
    const rruleDays = selectedDays.join(',');

    if (selectedDays.length === 0) {
        alert('Vui lòng chọn ít nhất một ngày lặp lại!');
        return;
    }

    // Định dạng sự kiện theo chuẩn iCalendar (.ics)
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${subject}
DTSTART;TZID=Asia/Ho_Chi_Minh:${formatDateToICS(startDateTime)}
DTEND;TZID=Asia/Ho_Chi_Minh:${formatDateToICS(endDateTime)}
RRULE:FREQ=WEEKLY;BYDAY=${rruleDays};UNTIL=${formatDateToICS(endRepeatDate)}
END:VEVENT
END:VCALENDAR`;

    // Tạo tệp .ics và cung cấp liên kết tải xuống
    const blob = new Blob([icsData], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'event.ics';
    link.click();
});

function formatDateToICS(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

