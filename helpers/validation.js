export const nameValidator = (name) => {
    if (!name || name.length === 0) return "שם לא תקין"
    return ''
  }
  
  export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/
    if (!email || email.length === 0) return 'אימייל לא יכול להיות ריק'
    if (!re.test(email)) return 'אימייל לא תקין'
    return ''
  }
  
  export const passwordValidator = (password) => {
    if (!password || password.length < 6) return 'סיסמה חייבת להיות לפחות 6 תווים'
    return ''
  }