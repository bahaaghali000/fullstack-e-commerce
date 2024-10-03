import React from "react";

const ContinueWithGoogle = ({ text }) => {
  const signUpWithGoogle = async () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, "_self");
  };

  return (
    <button
      type="button"
      onClick={signUpWithGoogle}
      className="signup__google auth__btn"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
        alt="Google Icon"
      />{" "}
      {text}
    </button>
  );
};

export default ContinueWithGoogle;
