import { useState, useContext } from 'react';
import logo from "../assets/logo.svg";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { serverUrl } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState("");
    const [form, setform] = useState({
        firstName: "",
        lastName: "",
        userName: "",
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
            const result = await axios.post(`${serverUrl}/api/v1/auth/signUp`, form, { withCredentials: true });
            setUser(result.data.user);
            setLoading(false);
            if (result.data.status !== 201) {
                setError(result.data.message);
                setUser(null)
            }
            else {
                setUser(result.data.user);
                setform({
                    firstName: "",
                    lastName: "",
                    userName: "",
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
                <h1 className='font-normal text-3xl'>Sign up</h1>
                <p className='font-normal text-base'>
                    Make your professional life simpler, more successful</p>
                <input className='border-2 border-gray-400 rounded-lg px-3
                                 py-2 w-[400px] h-[50px] text-lg 
                                 placeholder:text-gray-400 outline-none 
                                 focus:border-[#004182]' type="text"
                    name="firstName"
                    placeholder='First name'
                    onChange={(e) => { handleChange(e) }}
                    value={form.firstName} />
                <input className='border-2 border-gray-400 rounded-lg px-3
                                 py-2 w-[400px] h-[50px] text-lg 
                                 placeholder:text-gray-400 outline-none 
                                 focus:border-[#004182]'
                    type="text"
                    name="lastName"
                    placeholder='Last name'
                    onChange={(e) => { handleChange(e) }}
                    value={form.lastName} />
                <input className='border-2 border-gray-400 rounded-lg px-3
                                 py-2 w-[400px] h-[50px] text-lg 
                                 placeholder:text-gray-400 outline-none 
                                 focus:border-[#004182]'
                    type="text"
                    name="userName"
                    placeholder='User name'
                    onChange={(e) => { handleChange(e) }}
                    value={form.userName} />
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
                    onClick={(e) => { handleSubmit(e) }}>{loading ? "Signing Up..." : "Sign Up"}</button>
                <p className='text-lg font-normal text-center'>Already have an account ? <Link to="/" className='text-[#004182] font-bold cursor-pointer hover:text-[#004182]'>Sign in</Link></p>
            </form>
        </div>
    );
}

export default SignUp;
