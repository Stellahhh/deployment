import NavBar from "../elements/NavBar";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface FormData {
    firstName: string;
    lastName: string;
    nickname: string;
    email: string;
    password: string;
}

const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ firstName: '', lastName: '', nickname: '', email: '', password: '' });
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
        if (formData.nickname === '') {
            formData.nickname = formData.firstName + " " + formData.lastName;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;



        const response = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    nickname: formData.nickname,
                },
            },
        })

        if (response.data.session === null) {

            toast.error(response.error?.message)
        } else {

            navigate('/');
        }

    };

    return (
        <>
            <NavBar />
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-2 text-center">Sign Up</h2>
            <div className="flex justify-center items-center mt-10">
                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
                    <div>
                        <label htmlFor="firstName" className="sr-only">First Name</label>
                        <input name="firstName" type="text" required className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First Name" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="sr-only">Last Name</label>
                        <input name="lastName" type="text" required className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Last Name" onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="nickName" className="sr-only">Last Name</label>
                        <input name="nickName" type="text" className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Nickname (optional)" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input name="email" type="email" required className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input name="password" type="password" required className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={handleChange} />
                    </div>


                    <Button type="submit" variant="default" size="ex_lg">Sign Up</Button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default SignUpPage;
