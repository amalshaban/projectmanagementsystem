export const EmailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Please enter a valid email",
  },
};

const RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{4,}$/;

export const PasswordValidation = {
  required: "Password is required",
  pattern: {
    value: RegExp,
    message:
      "Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
};



export const FieldValidation = {
  required: "this field is required",
  value: /(\+)?(\(?\d+\)?)(([\s-]+)?(\d+)){0,}/g,
  message:"The number must be entered correctly, without any letters or separators."
};


export const RequiredField = (fieldName: any) => ({
  required: `${fieldName} is required`,
});
