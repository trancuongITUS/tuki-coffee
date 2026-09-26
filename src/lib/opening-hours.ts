import type { DayHours } from '@/content/site'

export const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

/** Thứ tự hiển thị theo thói quen Việt Nam: Thứ 2 trước, Chủ nhật cuối. */
const displayOrder = [1, 2, 3, 4, 5, 6, 0]

const weekdayIndex: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

function toMinutes(time: string) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/** "07:00" → "7:00" */
export function formatTime(time: string) {
  const [h, m] = time.split(':')
  return `${Number(h)}:${m}`
}

export function formatRange(day: DayHours) {
  return day ? `${formatTime(day.open)} – ${formatTime(day.close)}` : 'Nghỉ'
}

/** Thứ trong tuần và số phút từ nửa đêm theo múi giờ của quán, bất kể múi giờ máy khách. */
function zonedNow(now: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return {
    day: weekdayIndex[get('weekday')],
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

export type OpenStatus =
  | { isOpen: true; closesAt: string }
  /** `opensOn`: null = hôm nay, còn lại là "ngày mai" hoặc tên thứ. */
  | { isOpen: false; opensAt: string | null; opensOn: string | null }

/** Giờ mở cửa được giả định không vắt qua nửa đêm. */
export function getOpenStatus(hours: DayHours[], now: Date, timeZone: string): OpenStatus {
  const { day, minutes } = zonedNow(now, timeZone)
  const today = hours[day]

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { isOpen: true, closesAt: formatTime(today.close) }
  }
  if (today && minutes < toMinutes(today.open)) {
    return { isOpen: false, opensAt: formatTime(today.open), opensOn: null }
  }
  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (day + offset) % 7
    const next = hours[nextDay]
    if (next) {
      return { isOpen: false, opensAt: formatTime(next.open), opensOn: offset === 1 ? 'ngày mai' : dayNames[nextDay] }
    }
  }
  return { isOpen: false, opensAt: null, opensOn: null }
}

/** Gom các ngày liền nhau có cùng giờ: "Thứ 2 – Chủ nhật · 7:00 – 22:00". */
export function groupHours(hours: DayHours[]) {
  const groups: { days: string; range: string }[] = []
  let start = 0
  for (let i = 1; i <= displayOrder.length; i++) {
    const current = formatRange(hours[displayOrder[start]])
    if (i < displayOrder.length && formatRange(hours[displayOrder[i]]) === current) continue
    const first = dayNames[displayOrder[start]]
    const last = dayNames[displayOrder[i - 1]]
    groups.push({ days: start === i - 1 ? first : `${first} – ${last}`, range: current })
    start = i
  }
  return groups
}

/** Một dòng tóm tắt, dùng khi chưa tính được trạng thái theo giờ thực. */
export function hoursSummary(hours: DayHours[]) {
  const groups = groupHours(hours)
  if (groups.length === 1) return `Mở cửa ${groups[0].range} hằng ngày`
  return groups.map((g) => `${g.days}: ${g.range}`).join(' · ')
}
