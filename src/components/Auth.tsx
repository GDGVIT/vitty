/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, getRedirectResult, GoogleAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const appleProvider = new OAuthProvider("apple.com");
  appleProvider.addScope("email");
  appleProvider.addScope("name");
  const logIn = (auth: any, provider: any) => {
    void signInWithPopup(auth, provider)
    localStorage.setItem("uuid", "something");
    getRedirectResult(auth)
      .then((result) => {
        if (result !== null) {
          localStorage.setItem("uuid", result.user.uid);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        console.log(errorCode, errorMessage, email);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center z-[4]">
      <h1 className="hidden text-3xl font-semibold md:flex mb-10">
        Welcome to VITTY
      </h1>
      <div className="m-2">
        <button
          className="bg-white text-black w-60 rounded-md outline-none my-1 py-3 px-4 font-medium flex justify-center items-center hover:cursor-pointer hover:scale-[1.01]"
          onClick={() => logIn(auth, googleProvider)}
        >
          <FcGoogle className="text-2xl mr-3" />
          Sign in with Google
        </button>
      </div>
      <div className="m-2 z-[5]">
        <button
          className="bg-white text-black w-60 rounded-md outline-none my-1 py-3 px-4 font-medium flex justify-center items-center hover:cursor-pointer hover:scale-[1.01]"
          onClick={() => logIn(auth, appleProvider)}
        >
          <FaApple className="text-2xl mr-3" />
          Sign in with Apple
        </button>
      </div>
    </div>
  );
};

export default Auth;
