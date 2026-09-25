import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const submit = async () => {
        try {
            const res = await axios.post("http://localhost:5000/auth/reset-password", { token , password});
            alert(res.data.message)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return(
        <>
        <input  type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
        <button onClick={submit}>Save Password</button>
        </>
    )
}

export default ResetPassword