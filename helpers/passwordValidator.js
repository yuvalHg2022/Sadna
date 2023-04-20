export function passwordValidator(password) {
    if (!password) return "שדה חובה"
    if (password.length < 5) return 'הסיסמה חייבת להיות באורך של 5 תווים לפחות'
    return ''
  }