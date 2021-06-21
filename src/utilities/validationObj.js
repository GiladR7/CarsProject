export const validation = {
  user: {
    required: true,
    requiredError: "שדה המשתמש הוא שדה חובה",
    regex: /[A-Za-z0-9א-ת]{3,}/,
    regexError: " שדה המשתמש צריך להכיל לפחות 3 תווים",
  },
  email: {
    required: true,
    requiredError: "שדה האיימיל הוא שדה חובה",
    regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    regexError: "הכנס איימיל תקין",
  },
  password: {
    required: true,
    requiredError: "שדה הסיסמא הוא שדה חובה",
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    regexError: "שדה סיסמא מכיל לפחות 8 תווים,  ספרה אחת ואות אחת באנגלית בלבד",
  },
  confirmPassword: {
    required: true,
    requiredError: "שדה אימות סיסמא הוא שדה חובה",
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    regexError: "שדה סיסמא מכיל לפחות 8 תווים, ספרה אחת ואות אחת באנגלית בלבד",
    funcValidation(password, confirmPassword) {
      return password !== confirmPassword;
    },
    customError: "סיסמא לא תואמת",
  },

  owners: {
    required: true,
  },
  year: {
    required: true,
  },
  km: {
    required: true,
  },
  color: {
    required: true,
    requiredError: "צבע הרכב הוא שדה חובה",
  },
  gear: {
    required: true,
    requiredError: "בחר את סוג תיבת ההילוכים",
  },
  codeArea: {
    required: true,
    requiredError: "בחר קידומת",
  },
  phone: {
    required: true,
    requiredError: "הכנס טלפון",
    regex: /^\d{7}$/,
    regexError: "מספר טלפון צריך להכיל 7 ספורת ",
  },
  file: {
    required: false,
    funcValidation(value) {
      return value.length > 5;
    },
    customError: "ניתן לעלות מקסימום 5 תמונות",
  },
  city: {
    required: true,
  },
  moreDetails: {
    required: false,
  },
};
