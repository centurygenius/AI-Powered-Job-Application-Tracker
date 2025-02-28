import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react';
import home_icon2 from '../assets/home_icon2.png';
import logo_image from '../assets/logo_image.jpeg';
import job_tracking from '../assets/job_tracking.png';
import register_icon from '../assets/register_icon.png';
import logoutIcon from '../assets/logoutIcon.png';
import login_icon from '../assets/login_icon.png';
import deleteIcon from '../assets/deleteIcon.png';
import editIcon from '../assets/editIcon.png';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api";
import Loader from "../components/Loader";
import CustomDatePicker from "../components/CustomDatePicker";


export default function JobTrackingPage() {
  const [jobs, setJobs] = useState([]);
  const [jobtitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [query, setQuery] = useState([]);
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [loading, setLoading] = useState(false)
  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [user, setUser] = useState("");

  const navigate = useNavigate();

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


  // Handle delete function
  const handleJobDelete = async (jobId) => {
    try {
      await api.delete(`/api/job-applications/${jobId}/`);
      console.log("Job deleted successfully");
      // Remove deleted job from the UI
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      
    } catch (error) {
      console.error("Error deleting job: ", error);
    }
  }
  
  // Function to handle job submission
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setLoadingSpinner(true);

    try {
      const response = await api.post(
        "/api/job-applications/",
        {
          job_title: jobtitle,
          company: company,
          notes: notes,
          applied_date: appliedDate,
          status: status,
        },
        
      );
      console.log("Job submitted successfully: ", response.data);
      const newJob = response.data;
      setJobTitle(newJob.job_title);
      setCompany(newJob.company);
      setNotes(newJob.notes);
      setAppliedDate(newJob.applied_date);
      setStatus(newJob.status);
    } catch (error) {
      console.error("Error submitting job: ", error);
    } finally{
      setLoadingSpinner(false);
    }
  };


  // Fetch all jobs
  useEffect(() => {
    api
      .get("/api/job-applications/")
      .then((res) => res.data)
      .then(data => {setJobs(data); console.log("Available jobs: ", data);})
      .catch((err) => console.error("Error fetching jobs", err));
  }, []);

  // Function to handle resume submission
  const handleResumeSubmit = async (e) => {
    e.preventDefault();

    setSpinner(true);
    try {
      const response = await api.post(
        "/api/resume-feedback/",
        {
          resumeText: resumeText,
        },
        
      );
      console.log("Resume submit: ", response.data);
      console.log("Feedback: ", response.data.feedback);
      const newFeedback = response.data;
      setResumeText("");
      setFeedbacks(newFeedback.feedback);
    } catch (error) {
      console.error(error);
    } finally{
      setSpinner(false);
    }
  };

  // Function to handle skill submission and job recommendation
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get(
        "/api/job-recommendations/",
        
        {params: { query: query }}
        
      );
      
      const newJobRecommendations = response.data;
      const res = newJobRecommendations.recommendations;
      console.log("Skill submit: ", response.data);
      console.log("Job Recommendations: ", newJobRecommendations.recommendations);
      setQuery("");
      setJobRecommendations(res.data);
    } catch (error) {
      console.error(error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="p-4">

          {/* ==================== Header Section ======================= */}

          <header className='h-20 border flex justify-between items-center px-8 py-2'>
              <div className='flex items-center justify-center '>
                  <img src={logo_image} alt='logo-image' className='w-18' />
                  <h1 className='font-bold cursor-pointer md:block hidden'>Logo</h1>
              </div>

              <div>
                  <ul className='flex gap-4'>
                      <li className='font-bold hover:underline cursor-pointer  text-center lg:flex lg:items-center md:flex md:items-center gap-1 '><img src={home_icon2} className='w-5 h-5'  alt='home-icon'/><Link to="/">Home</Link></li>
                      <li className='font-bold hover:underline cursor-pointer text-center lg:flex lg:items-center md:flex md:items-center items-center  '><img src={job_tracking} className='w-5 h-5'  alt='home-icon'/><Link to="/job-tracking">Tracking</Link></li>
                  </ul>
              </div>

              <div className='flex gap-6  sm:flex-wrap '>
                <div className='flex items-center'>
                    <img src={login_icon} alt='login' className='w-5 h-5' />
                    <Link to="" className='font-bold '>Hi! <span className="italic text-blue-700 ">{capitalizeFirstLetter(user.username)}</span></Link>
                </div>

                <div className='lg:flex lg:items-center md:flex md:items-center'>
                    <img src={logoutIcon} alt='logout' className='w-5 h-5' />
                    <Link to="/logout" className='font-bold hover:underline cursor-pointer'>Logout</Link>
                </div>
              </div>
          </header>


          <h1 className="text-2xl font-bold text-center py-4">Welcome to your Job Dashboard</h1>
          
          {/* ==================== Add job application section ======================= */}

          <section>
            
            <h5 className="text-lg font-bold text-center py-4">Add Job Application</h5>
            <hr className="w-1/2 mx-auto"/>
            <br/>
            <div className='lg:p-8 md:p-8 bg-gray-400 lg:w-1/2 md:w-1/2 sm:w-full mx-auto rounded-2xl'>
              <form onSubmit={handleJobSubmit}>
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
                <CustomDatePicker onChange={setAppliedDate}   />
                </div>

                <div className='mt-2 flex justify-center items-center'>
                    {loadingSpinner && <Loader />}
                </div>

                <div className='flex items-center justify-center mt-2'>
                    <button type='submit' className='bg-red-500 hover:bg-red-600 cursor-pointer mb-5  text-white font-bold py-2 px-4 rounded'>
                        Take Action
                    </button>
                </div>
              </form>
            </div>
          </section>


          {/* ==================== Tracked job applications section  ======================= */}

          <section className=" ">
            <h2 className="text-xl font-bold text-center py-4">Tracked Job Applications Section</h2>
            <hr className="w-1/2 mx-auto"/>
            <br/>
            <div className='p-4 md:p-8 bg-gray-400 w-full md:w-3/4 lg:w-3/4 mx-auto rounded-2xl overflow-auto'>
              {
                jobs.length > 0 ? (
                  <table className="w-full table-auto md:table-auto">
                    <thead>
                      <tr className=" ">
                        <th className="border-2 w-8 ">#</th>
                        <th className="border-2 w-20">Job Title</th>
                        <th className="border-2 w-20">Company</th>
                        <th className="border-2 w-20 ">Status</th>
                        <th className="border-2 w-20">Applied Date</th>
                        <th className="border-2 w-20">Notes</th>
                        <th className="border-2 w-20">Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {jobs.map((job, index) => (

                        <tr key={job.id} className=" ">

                          <td className="border">{index + 1}</td>
                          <td className="border">{job.job_title}</td>
                          <td className="border">{job.company}</td>
                          <td className="border">{job.status}</td>
                          <td className="border">{job.applied_date}</td>
                          <td className="border">{job.notes}</td>
                          <td className="border ">
                            <button onClick={() => handleJobDelete(job.id)} className="cursor-pointer  text-white ">
                              <img src={deleteIcon} className="w-8 h-7 ml-1 mr-1 rounded-full" />
                              
                            </button>
                            <Link to={`/edit-job/${job.id}`}>
                              <button  className="cursor-pointer   text-white ">
                                <img src={editIcon} className="w-8 h-7 rounded-full" />
                                
                              </button>
                            </Link>
                            
                          </td>

                        </tr>

                      ))}

                    </tbody>
                  </table>
                ) : (
                      <p className="text-red-500 text-xl text-center">
                          No job found.
                          <br/>
                      </p>
                    ) 
              }
            </div>
          </section>

          {/* ==================== Resume feedback section ======================= */}

          <section>
            <h2 className="text-xl font-bold text-center py-4">Resume Feedback Section</h2>
            <hr className="w-1/2 mx-auto"/>
            <br/>
            <h6 className="text-center mb-1">Paste your resume here and we will give you feedback</h6>
            <div className='p-4 md:p-8 bg-gray-400 w-full md:w-3/4 lg:w-1/2 mx-auto rounded-2xl overflow-hidden'>
                <form onSubmit={handleResumeSubmit}>
                  <textarea
                    placeholder="Paste your resume here"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full py-2 px-4 border-gray-300 rounded-md focus:outline-none border-b" 
                    rows="6"
                  >
                  </textarea>

                  <div className='mt-2 flex justify-center items-center'>
                      {spinner && <Loader />}
                  </div>

                  <div className='flex items-center justify-center mt-2'>
                    <button type='submit' className='bg-red-500 hover:bg-red-600 cursor-pointer  text-white font-bold py-2 px-4 rounded'>
                        Get Feedback
                    </button>
                </div>
                </form>
            </div>
            <br/>
            {/* ====================== Section for resume feedback display ================================ */}
            
            <div className="lg:p-8 md:p-8 bg-gray-400 lg:w-1/2 md:w-1/2 sm:w-full sm:px-1 mx-auto rounded-2xl">
                {
                  feedbacks.length > 0 ? (
                    <div className='px-1'>
                      <h5 className="text-xl font-bold text-center py-0.5">Resume Feedback</h5>
                      <ol>
                        {feedbacks.map((item, index) => (
                          <li key={index}>{index + 1}. {item}</li>
                        ))}
                      </ol>
                      <br/>
                    </div>
                  ) : (
                        <p className="text-red-500 text-xl text-center">
                            No feedback found.
                            <br/>
                        </p>
                  )
                  
                }
            </div>
          </section>

           {/* ====================== Section for job recommendations ================================ */}

          <section>
            <h2 className="text-xl font-bold text-center py-4">Job Recommendations Section</h2>
            <hr className="w-1/2 mx-auto"/>
            <br/>
            <h5 className="text-xl font-bold text-center py-4">Enter your skill for perfect job recommendations</h5>
            <div className='lg:p-8 md:p-8 bg-gray-400 lg:w-1/2 md:w-1/2 sm:w-full sm:px-1 mx-auto rounded-2xl'>
                <form onSubmit={handleSkillSubmit}>
                  <input
                    type="text"
                    placeholder="Enter your skill"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full py-2 px-4 border-gray-300 rounded-md focus:outline-none border-b" 
                  />

                  <div className='mt-2 flex justify-center items-center'>
                      {loading && <Loader />}
                  </div>

                  <div className='flex items-center justify-center mt-2'>
                    <button type='submit' className='bg-red-500 hover:bg-red-600 cursor-pointer mb-5  text-white font-bold py-2 px-4 rounded'>
                        Get Job Recommendations
                    </button>
                  </div>
                </form>
            </div>
            <br/>
            {/* ====================== Section for job recommendations display ================================ */}
            
            {
              jobRecommendations.length > 0 ? (
                <div className='lg:p-8 md:p-8 bg-gray-400 lg:w-1/2 md:w-1/2 sm:w-full sm:px-1 mx-auto rounded-2xl'>
                  <h5 className="text-xl font-bold text-center py-0.5">Recommended Jobs</h5>
                  <p className="text-center">(Click on job title to apply)</p>
                  
                    {jobRecommendations.map((item, index) => (
                      
                      <ul key={index}>
                        <hr/>
                        <br/>
                        <span>{index + 1}.</span>
                        <li><span className="font-semibold">Employer name:</span> {item.employer_name}</li>
                        <li><a href={item.job_apply_link} target="_blank" className="text-blue-700 " ><span className="font-semibold">Job title:</span> {item.job_title}</a></li>
                        <li><span className="font-semibold">Job employment type:</span> {item.job_employment_type}</li>
                        <li><span className="font-semibold">Job location:</span> {item.job_location}</li>
                        <br/>
                        <hr/>
                      </ul>
                      
                    ))}
                  
                </div>
              ) : (
                    <p className="text-red-500 text-xl text-center">
                        No recommendation found.
                        <br/>
                    </p>
              )
              
            }

                
                
                

            
          </section>


         
      </div>
    </div>
  );
}
