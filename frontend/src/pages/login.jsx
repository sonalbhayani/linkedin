import { useState, useContext } from 'react';
import logo from "../assets/logo.svg";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { serverUrl } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [form, setform] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post(`${serverUrl}/api/v1/auth/signIn`, form, { withCredentials: true });
            setLoading(false);
            if (result.data.status !== 200) {
                setError(result.data.message);
            }
            else {

                setform({
                    email: "",
                    password: ""
                })
                setError("");
            }
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
            console.log(error);
        }
    }
    return (
        <div className="w-full h-screen bg-[white] flex flex-col items-center justify-start gap-10">
            <div className='flex items-center p-5 w-full h-20'>
                <img src={logo} alt="logo" />
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <form className='flex flex-col gap-5 shadow-lg border-1 border-gray-300 rounded-lg p-5' >
                <h1 className='font-normal text-3xl'>Sign In</h1>
                <input className='border-2 border-gray-400 rounded-lg px-3
                                 py-2 w-[400px] h-[50px] text-lg 
                                 placeholder:text-gray-400 outline-none 
                                 focus:border-[#004182]'
                    type="email"
                    name="email"
                    placeholder='Email'
                    onChange={(e) => { handleChange(e) }}
                    value={form.email} />
                <div className='flex items-center relative'>
                    <input className='border-2 border-gray-400 rounded-lg px-3
                                     py-2 w-[400px] h-[50px] text-lg 
                                     placeholder:text-gray-400 outline-none 
                                     focus:border-[#004182]'
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder='Password'
                        onChange={(e) => { handleChange(e) }}
                        value={form.password} />
                    <span className='absolute right-4 text-[#004182] 
                                     text-base font-normal cursor-pointer 
                                     hover:text-[#004182]'
                        onClick={handleShowPassword}>{showPassword ? 'Hide' : 'Show'}</span>
                </div>
                <button className='w-[400px] h-[50px] mt-10 
                text-lg font-bold bg-[#004182] text-white 
                rounded-lg cursor-pointer hover:bg-[#004182]'
                    disabled={loading}
                    onClick={(e) => { handleSubmit(e) }}>{loading ? "Signing In..." : "Sign In"}</button>
                <p className='text-lg font-normal text-center'>Don't have an account ? <Link to="/" className='text-[#004182] font-bold cursor-pointer hover:text-[#004182]'>Sign Up</Link></p>
            </form>
        </div>
    );
}

export default Login;
