function formatDate(date, locales = "en", options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
}) {
  return date.toLocaleDateString(locales, options).replaceAll("/", " - ");
}

export { formatDate as f };
