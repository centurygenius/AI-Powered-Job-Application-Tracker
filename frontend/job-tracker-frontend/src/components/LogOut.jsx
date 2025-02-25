import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login"); // Redirect after logout
    }, [navigate]);

    return null;
};

export default LogOut;
