export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/
  if (!email || email.length === 0) return 'אימייל לא יכול להיות ריק'
  if (!re.test(email)) return 'אימייל לא תקין'
  return ''
}