import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { registerRequest } from '../../../api/auth';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { login } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';

const RegisterForm = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();

    const validateForm = () => {
    
        if (!username.trim()) {
            toast.error("Username cannot be empty.");
            return false; 
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return false; 
        }
    
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must be at least 8 characters long and include at least one number and one letter.");
            return false; 
        }
    
        return true; 
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
     
        if (validateForm()) {
            try {
                const user = {
                    username,
                    email,
                    password,
                };
                const res = await registerRequest(user);
                dispatch(login({ token: res?.data?.token }));
                router.push("/");
            } catch (error) {   
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data?.message);
                }
            }
        }
    };

    return (
        <div className='flex flex-col justify-center text-center'>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
                <input
                    type="text"
                    placeholder="Username"
                    className='border border-gray-300 rounded-full px-3 h-11 focus:outline-none'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Email"
                    className='border border-gray-300 rounded-full px-3 h-11 focus:outline-none'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className='border border-gray-300 rounded-full px-3 h-11 focus:outline-none'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div>
                    <button 
                        type='submit' 
                        className='w-[316px] mb-11 h-[48px] rounded-lg text-[white] bg-blue-500 transition hover:bg-blue-600 duration-300 ease-in-out'
                    >
                        Sign Up
                    </button>
                </div> 
            </form>
        </div> 
    );
};

export default RegisterForm;