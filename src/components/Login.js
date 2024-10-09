import React from "react";
import { useState, useRef } from "react";
import checkValidation from "../util/checkValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../util/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../util/userSlice";
import { useDispatch, UseDispatch } from "react-redux";

const Login = () => {
  const [isSigninForm, setIsSigninForm] = useState(true);
  const [showValidationError, setShowValidationError] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signUpClick = () => {
    setIsSigninForm((prevState) => !prevState);
  };

  const handleClick = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const fullName = !isSigninForm && userNameRef.current.value;
    const isValid = checkValidation(isSigninForm, email, password, fullName);

    if (isValid !== null) {
      setShowValidationError(isValid.message);
      return
    } else {
      setShowValidationError(null);
    }

    if (!isSigninForm) {
      //-- create an account in firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          if (user) {
            const {uid, displayName, email } = user
            dispatch(addUser({uid: uid, name: displayName, email: email}))
          }

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
          if (user) {
            const {uid, displayName, email } = user
            dispatch(addUser({uid: uid, name: displayName, email: email}))
            navigate('/list')
          }
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
            onSubmit={(e) => e.preventDefault()}
          className="bg-black p-8 text-white flex flex-col space-y-4 w-full max-w-md opacity-80"
        >
          <h1 className="text-3xl font-bold">
            {isSigninForm ? "Sign In" : "Register User"}
          </h1>
          {!isSigninForm && (
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
            {isSigninForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="p-1 m-1 text-red-500">{showValidationError}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">OR</span>
          </div>
          <button
            onClick={signUpClick}
            className="bg-gray-600 p-3 rounded text-white font-bold hover:bg-gray-700"
          >
            {isSigninForm ? "sign-up" : "already signed in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
