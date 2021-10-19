const stringShortener = (string: string, maxSize: number = 25) => {
  if (!string) return ""
  const shortenedString =
    string.length > maxSize ? string.substring(0, maxSize) + "..." : string
  return shortenedString
}

export default stringShortener
