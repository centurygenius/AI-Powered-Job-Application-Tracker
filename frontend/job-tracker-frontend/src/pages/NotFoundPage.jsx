import React from 'react';
import home_icon2 from '../assets/home_icon2.png';
import logo_image from '../assets/logo_image.jpeg';
import job_tracking from '../assets/job_tracking.png';
import register_icon from '../assets/register_icon.png';
import login_icon from '../assets/login_icon.png';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
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

                        <div className='flex gap-4 sm:flex-wrap'>
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

                    <div className='mx-auto px-8 text-white mb-8 bg-cover bg-center' style={{ backgroundImage: "url('/backgroundImage.jpeg')" }} >
                        <br/>
                        <h1 className='text-4xl text-center'>404 Page Not Found</h1>
                        <br/>
                        <h1 className='text-2xl text-center'>The page you are looking for does not exist.</h1>
                        <br/>
                        <Link to="/" className='flex items-center justify-center'>
                            <button className='bg-red-500 hover:bg-red-600 cursor-pointer  text-white font-bold py-2 px-4 rounded-full'>
                                Return Home
                            </button>
                        </Link>
                        <br/><br/><br/><br/><br/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage;