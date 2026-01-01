export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)

  const day = date.getDate()
  const year = date.getFullYear()

  const month = date.toLocaleString("en-US", { month: "short" })

  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, "0")

  const ampm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12 || 12

  // Day suffix (st, nd, rd, th)
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th"

  return `${day}${suffix} ${month} ${year} : ${hours}:${minutes} ${ampm}`
}
