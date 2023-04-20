export const nameValidator = (name) => {
    if (!name || name.length === 0) return "שם לא תקין"
    return ''
  }
  
  export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/
    if (!email || email.length === 0) return 'שדה חובה'
    if (!re.test(email)) return 'אימייל לא תקין'
    return ''
  }
  
  export const passwordValidator = (password) => {
    if (!password || password.length < 6) return 'הסיסמה חייבת להיות באורך של 6 תווים לפחות.'
    return ''
  }