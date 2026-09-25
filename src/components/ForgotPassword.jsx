import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const submit = async () => {
        try {
            const res = await axios.post("http://localhost:5000/auth/forgot-password", {email})
            alert(res.data.message)
        } catch (err) {
            alert(err.response.data.message)
        }
    }
    return(
        <>
        <input type="email" placeholder="Email" value={email} 
        onChange={(e) => setEmail(e.target.value)}/>
        <button onClick={submit}>
            Send Link
        </button>
        </>
    )
}

export default ForgotPassword