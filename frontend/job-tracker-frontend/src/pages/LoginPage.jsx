import React, { useState } from 'react';
import home_icon2 from '../assets/home_icon2.png';
import logo_image from '../assets/logo_image.jpeg';
import job_tracking from '../assets/job_tracking.png';
import register_icon from '../assets/register_icon.png';
import login_icon from '../assets/login_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api";
import Loader from "../components/Loader";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../contants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // ==================== Handle Submit Function ====================
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/token/", {email, password});
            if(res){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                const userData = res.data.user;

                // Store user data
                localStorage.setItem("user", JSON.stringify(userData));

                // Implement alert using toastify
                if (res.status === 200) {
                    toast.success('🦄 Login successful!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                }

                navigate("/job-tracking");
                console.log("Login successful!", res.data);
                console.log("User data: ", userData);
                console.log("Response: ", res);
            }else{
                navigate("/");
                console.log("Login failed!");
            }
        } catch (error){
            console.log("Error response: ", error);
            // Implement alert using toastify
            if (error.response.status === 401) {
                toast.error('❌ Something went wrong!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
            navigate("/");
        } finally{
            setLoading(false);
        }
    }

    return (
        <>
            <div className='container mx-auto'>
                <div className='p-4  items-center justify-center'>

                    {/* ==================== Header Section ==================== */}

                    <header className='h-20 border flex items-center justify-between lg:px-8 md:px-4 sm:px-0 py-2 '>

                        {/* Logo Section */}

                        <div className='flex items-center justify-center '>
                            <img src={logo_image} alt='logo-image' className='w-18' />
                            <h1 className='font-bold cursor-pointer md:block hidden'>Logo</h1>
                        </div>

                        {/* Desktop Navigation */}

                        <div>
                            <ul className='flex gap-4'>
                                <li className='font-bold hover:underline cursor-pointer  text-center lg:flex lg:items-center md:flex md:items-center gap-1 '><img src={home_icon2} className='w-5 h-5'  alt='home-icon'/><Link to="/">Home</Link></li>
                                <li className='font-bold hover:underline cursor-pointer text-center lg:flex lg:items-center md:flex md:items-center items-center  '><img src={job_tracking} className='w-5 h-5'  alt='home-icon'/><Link to="/job-tracking">Tracking</Link></li>
                            </ul>
                        </div>

                        <div className='flex gap-4 sm:flex-wrap '>
                            <div className='lg:flex lg:items-center md:flex md:items-center '>
                                <img src={register_icon} alt='register' className='w-5 h-5' />
                                <Link to="/register" className='font-bold hover:underline cursor-pointer'>Register</Link>
                            </div>

                            <div className='lg:flex lg:items-center md:flex md:items-center'>
                                <img src={login_icon} alt='login' className='w-5 h-5' />
                                <Link to="/login" className='font-bold hover:underline cursor-pointer'>Login</Link>
                            </div>
                        </div>
                    </header>

                    {/* ==================== Content Section ==================== */}

                    <div className='mx-auto px-8 mb-8 bg-cover bg-center' style={{ backgroundImage: "url('/backgroundImage.jpeg')" }} >
                        <br/>
                        <div className='lg:p-8 md:p-8 bg-white lg:w-1/2 md:w-1/2 sm:w-full sm:px-1 mx-auto rounded-2xl'>
                            <br/>
                            <h1 className='text-3xl text-center  font-bold'>Login</h1>
                            <br/>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="email" 
                                    name='email' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email" 
                                    className="w-full py-2 px-4 border-gray-300 rounded-md focus:outline-none border-b" 
                                    required 
                                />

                                <input 
                                    type="password" 
                                    name='password' 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password" 
                                    className="w-full py-2 px-4 border-gray-300 rounded-md focus:outline-none border-b" 
                                    required 
                                />
                                
                                <div className='mt-2 flex justify-center items-center'>
                                    {loading && <Loader />}
                                </div>

                                <div className='flex items-center justify-center mt-2'>
                                    <button type='submit' className='bg-red-500 hover:bg-red-600 mb-5 cursor-pointer  text-white font-bold py-2 px-4 rounded'>
                                        Take Action
                                    </button>
                                </div>
                            </form>
                        </div>
                        <br/><br/><br/><br/><br/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;