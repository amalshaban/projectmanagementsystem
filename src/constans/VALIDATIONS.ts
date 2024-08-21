// Validation rules for the email input field:-
// Ensures the field is required and follows a standard email format
export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Please enter a valid email",
  },
};

// Validation rules for the password input field:-
// Ensures the field is required and meets complexity requirements (min 4 characters, uppercase, lowercase, number, and special character)
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{4,}$/;

export const PasswordValidation = {
  required: "Password is required",
  pattern: {
    value: passwordRegEx,
    message:
      "Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
};

// Generic validation rule for required fields:-
// Displays a custom message indicating that the specified field is required
export const RequiredField = (fieldName) => ({
  required: `${fieldName} is required`,
});
