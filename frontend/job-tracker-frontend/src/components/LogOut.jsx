import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const LogOut = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        setUser(null);
        navigate("/login"); // Redirect after logout
        

        // Implement alert using toastify
        toast.success('🦄 Logout successful!', {
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
    }, [navigate]);

    return null;
    
};

export default LogOut;
