import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '@/elements/NavBar';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

interface SignInFormData {
    email: string;
    password: string;
}

const SignInPage: React.FC = () => {
    const [formData, setFormData] = useState<SignInFormData>({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = (): boolean => {
        if (!formData.email.includes('@')) {
            toast.error('Email must contain "@"');
            return false;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;



        const response = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,

        })

        if (response.data.session === null) {
            toast.error('Login failed. Please try again.');
        } else {
            navigate('/');
        }

    };


    return (
        <>
            <NavBar />
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-2 text-center">Sign In</h2>
            <div className="flex justify-center items-center mt-10">
                <form className="space-y-6 w-full max-w-lg" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input name="email" type="email" required className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input name="password" type="password" required className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={handleChange} />
                    </div>
                    <div>


                        <Button type="submit" variant="default" size="ex_lg">Sign In</Button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default SignInPage;
