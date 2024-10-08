const checkValidation = (isSigninform, email, password, fullName) => {
    const isValidEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      );
    if (!isValidEmail) {
      return { message: "invalid email" };
    }
    console.log("isValidEmail", isValidEmail);
    const isValidPassword =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
    if (!isValidPassword) {
      return { message: "invalid Password" };
    }
    console.log('isSigninform',isSigninform)
    const isValidFullName =  !isSigninform && /^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName);
    if (!isValidFullName && !isSigninform) {
      return { message: "invalid first name" };
    }
  
    return null;
  };
  
  export default checkValidation;
  