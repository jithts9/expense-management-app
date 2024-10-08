import React from "react";
import { useState, useRef } from "react";
import checkValidation from "../util/checkValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../util/firebase";

const Login = () => {
  const [isSinginForm, setIsSigninForm] = useState(false);
  const [showValidationError, setShowValidationError] = useState(null);
  console.log('isSinginForm',isSinginForm)

  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();
  const signUpClick = () => {
    setIsSigninForm((prevState) => !prevState);
  };

  const handleClick = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const fullName = !isSinginForm && userNameRef.current.value;
    const isValid = checkValidation(isSinginForm, email, password, fullName);

    if (isValid) {
      console.log("isValid", isValid);
      setShowValidationError(isValid.message);
    } else {
      setShowValidationError(null);
    }

    console.log("checked api call111", isSinginForm);
    if (!isSinginForm) {
      console.log("checked api call", isSinginForm);
      //-- create an account in firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("user", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setShowValidationError(error.message);
          // ..
        });
    } else {
      //- sing in
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("userSignin", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setShowValidationError(error.message);
        });
    }
  };

  return (
    <div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <form
          //   onSubmit={(e) => e.preventDefault()}
          className="bg-black p-8 text-white flex flex-col space-y-4 w-full max-w-md opacity-80"
        >
          <h1 className="text-3xl font-bold">
            {isSinginForm ? "Log In" : "Register User"}
          </h1>
          {!isSinginForm && (
            <input
              ref={userNameRef}
              type="text"
              className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
              placeholder="Full Name"
            />
          )}
          <input
            ref={emailRef}
            type="text"
            className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
            placeholder="Email or mobile number"
          />
          <input
            ref={passwordRef}
            className="p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
            type="password"
            placeholder="Password"
          />
          <button
            onClick={handleClick}
            className="bg-red-600 p-3 rounded text-white font-bold hover:bg-red-700"
          >
            {isSinginForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="p-1 m-1 text-red-500">{showValidationError}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">OR</span>
          </div>
          <button
            onClick={signUpClick}
            className="bg-gray-600 p-3 rounded text-white font-bold hover:bg-gray-700"
          >
            {isSinginForm ? "Use a sign-in code" : "already signed in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
