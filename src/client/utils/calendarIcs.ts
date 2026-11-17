/**
 * RFC 5545 Compliant iCalendar (.ics) Generator for Universal Calendar Sync
 * Works on iOS Apple Calendar, macOS Calendar, Microsoft Outlook, and Google Calendar
 */

interface CalendarEventData {
  title: string;
  description: string;
  location: string;
  startIso: string; // e.g. "2026-11-20T11:00:00+07:00"
  durationHours?: number;
  url?: string;
}

function formatDateToIcs(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function generateIcsContent(event: CalendarEventData): string {
  const startDate = new Date(event.startIso);
  const durationHours = event.durationHours || 4;
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

  const startFormatted = formatDateToIcs(startDate);
  const endFormatted = formatDateToIcs(endDate);
  const nowFormatted = formatDateToIcs(new Date());
  const uid = `marrime-${Date.now()}@marrime.pages.dev`;

  // Escape special ICS characters
  const cleanTitle = event.title.replace(/[,;\\]/g, '\\$&');
  const cleanDescription = event.description.replace(/\n/g, '\\n').replace(/[,;\\]/g, '\\$&');
  const cleanLocation = event.location.replace(/[,;\\]/g, '\\$&');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Marrime Wedding Stationery//VN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowFormatted}`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:${cleanTitle}`,
    `DESCRIPTION:${cleanDescription}`,
    `LOCATION:${cleanLocation}`,
    event.url ? `URL:${event.url}` : '',
    'STATUS:CONFIRMED',
    // 24 Hour Reminder Alarm
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Nhắc nhở: Ngày mai tham dự ${cleanTitle}`,
    'END:VALARM',
    // 2 Hour Reminder Alarm
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Nhắc nhở: 2 tiếng nữa sẽ bắt đầu ${cleanTitle}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}

export function downloadIcsFile(event: CalendarEventData, filename = 'Dam_Cuoi_Marrime.ics') {
  const icsData = generateIcsContent(event);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(event: CalendarEventData): string {
  const startDate = new Date(event.startIso);
  const durationHours = event.durationHours || 4;
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

  const startFormatted = formatDateToIcs(startDate);
  const endFormatted = formatDateToIcs(endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startFormatted}/${endFormatted}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
