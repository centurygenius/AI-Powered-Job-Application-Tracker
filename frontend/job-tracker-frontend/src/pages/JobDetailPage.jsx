import React from "react";
import CustomDatePicker from "../components/CustomDatePicker";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import logo_image from '../assets/logo_image.jpeg';
import home_icon2 from '../assets/home_icon2.png';
import job_tracking from '../assets/job_tracking.png';
import login_icon from '../assets/login_icon.png';
import deleteIcon from '../assets/deleteIcon.png';
import logoutIcon from '../assets/logoutIcon.png';
import api from "../api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';


const JobDetailPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [jobtitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [notes, setNotes] = useState("");
    const [appliedDate, setAppliedDate] = useState("");
    const [status, setStatus] = useState("");
    const [jobData, setJobData] = useState({});
    const [user, setUser] = useState("");
   
    // Retrieve user data from local storage
      useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Function to capitaliza the first letter of a string
    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Fetch job details
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await api.get(`/job-applications/${jobId}/`);
                const job = response.data;
                
                // Populate form with existing job data
                setJobTitle(job.job_title);
                setCompany(job.company);
                setStatus(job.status);
                setNotes(job.notes);
                setAppliedDate(job.applied_date);
                setJobData(response.data);
                console.log("Edit job detail: ", response.data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJob();
    }, [jobId]);


    // Handle form submission (update job)
    const handleSubmit = async (e) => {
        e.preventDefault();
   
        try {
            await api.put(`/job-applications/${jobId}/`, 
            {
                job_title: jobtitle, 
                company: company, 
                status: status, 
                notes: notes, 
                applied_date: appliedDate
            });
            console.log("Job updated successfully");

            // Implement toastify alert
            toast.success('🦄 Update successful!', {
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
            navigate("/job-tracking"); // Redirect after update
        } catch (error) {
            console.error("Error updating job:", error);

            // Implement toastify alert
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
    };

    return (
        <>
            <div className="container">

                 {/* ==================== Header Section ==================== */}
                 
                <header className='h-20 border flex justify-between items-center px-8 py-2'>
                    <div className='flex items-center justify-center '>
                        <img src={logo_image} alt='logo-image' className='w-18 md:block hidden' />
                        <h1 className='font-bold cursor-pointer md:block hidden'>Logo</h1>
                    </div>

                    <div>
                        <ul className='flex gap-4'>
                            <li className='font-bold hover:underline cursor-pointer  text-center lg:flex lg:items-center md:flex md:items-center gap-1  '><img src={home_icon2} className='w-5 h-5'  alt='home-icon'/><Link to="/">Home</Link></li>
                            <li className='font-bold hover:underline cursor-pointer text-center lg:flex lg:items-center md:flex md:items-center items-center  '><img src={job_tracking} className='w-5 h-5'  alt='home-icon'/><Link to="/job-tracking">Tracking</Link></li>
                        </ul>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex items-center'>
                            <img src={login_icon} alt='login' className='w-5 h-5' />
                            <Link to="" className='font-bold'>Hi! <span className="italic text-blue-700">{capitalizeFirstLetter(user.username)}</span></Link>
                        </div>

                        <div className='lg:flex lg:items-center md:flex md:items-center'>
                            <img src={logoutIcon} alt='logout' className='w-5 h-5' />
                            <Link to="/logout" className='font-bold hover:underline cursor-pointer'>Logout</Link>
                        </div>
                    </div>
                </header>

                <h1 className="text-xl font-bold text-center py-4">Edit Job Application</h1>
          
                {/* ==================== Edit job application section ======================= */}

                <section className="px-1">
            
                    <hr className="w-1/2 mx-auto"/>
                    <br/>
                    <div className='lg:p-8 md:p-8 bg-gray-400 lg:w-1/2 md:w-1/2 sm:w-full sm:px-1 mx-auto rounded-2xl'>
                        <form onSubmit={handleSubmit}>
                            <input 
                            type="text"
                            value={jobtitle}
                            onChange={(e) => setJobTitle(e.target.value)} 
                            className="w-full py-2 px-4 border-gray-300 rounded-md focus:outline-none border-b" 
                            placeholder="Job Title" 
                            />

                            <input 
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)} 
                            className="w-full py-2 px-4 border-gray-300 rounded-md focus:outline-none border-b" 
                            placeholder="Company" 
                            />

                            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full py-2 px-4 border-gray-300 rounded-md focus:outline-none border-b" >
                            <option value="applied">Applied</option>
                            <option value="interview_scheduled">Interview Scheduled</option>
                            <option value="offer_received">Offer Received</option>
                            <option value="rejected">Rejected</option>
                            </select>

                            <textarea 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)} 
                            rows="4"
                            className="w-full py-2 px-4 mb-1.5 border-gray-300 rounded-md focus:outline-none border-b" 
                            placeholder="Notes"
                            >
                            </textarea>

                            <div className="w-40 py-2 px-4 border-gray-300 rounded-md focus:outline-none border-b">
                            <CustomDatePicker onChange={(date) => setAppliedDate(date.toISOString().split("T")[0])} value={appliedDate}  />
                            </div>

                            

                            <div className='flex items-center justify-center mt-2 gap-1'>
                                <Link to="/job-tracking" className='font-bold hover:underline cursor-pointer'>
                                    <button type='submit' className='bg-red-500 hover:bg-red-600 cursor-pointer mb-5  text-white font-bold py-2 px-4 rounded'>
                                        Cancel
                                    </button>
                                </Link>
                                <button type='submit' className='bg-blue-500 hover:bg-blue-600 cursor-pointer mb-5  text-white font-bold py-2 px-4 rounded'>
                                    Update Job
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                <br/>

            </div>

        </>
    );
}

export default JobDetailPage;