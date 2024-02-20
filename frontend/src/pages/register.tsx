import React from "react";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex w-full h-full py-[139px] justify-center items-center bg-gradient-to-b from-[#748BF8] to-[#9BD2DA]">
       <div className='flex flex-col w-[380px] h-full items-center bg-white rounded-lg'>
            <div className='mt-[12px]'>
                <img src="logo.png" alt="logo" className="w-50 h-16" />
            </div>
            <div className='mt-8'>
                <p className="font-[700]">
                    Sign Up
                </p>
            </div>
            <div className='mt-3 text-center px-5'>
                <p className="font-[400]">
                Fill out the following form to sign up
                </p>
            </div>
            <div className='mt-[48px]'>
                <RegisterForm />
            </div>
        </div>
    </div>
  );
};

export default RegisterPage;