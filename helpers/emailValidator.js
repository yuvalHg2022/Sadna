export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "שדה חובה"
  if (!re.test(email)) return 'אופס! נדרש כתובת דוא"ל חוקית'
  return ''
}
