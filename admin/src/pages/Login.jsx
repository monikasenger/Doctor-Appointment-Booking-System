import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/adminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendUrl } = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)

    const onSubmitHandle = async (event) => {
        event.preventDefault()
        try {

            if (state === 'Admin') {
const {data}= await axios.post(backendUrl + '/api/admin/login', {email,password})
if(data.success){
    localStorage.setItem('aToken',data.token)
    setAToken(data.token);
    
}else{
    toast.error(data.message)
}

            } else {

const {data}= await axios.post(backendUrl + '/api/doctor/login', {email,password})
if(data.success){
    localStorage.setItem('dToken',data.token)
    setDToken(data.token);
    console.log(data.token);
    
    
}else{
    toast.error(data.message)
}
            }
        }
        catch (error) {
            toast.error(error.message)

        }
    }



    return (
        <form onSubmit={onSubmitHandle}
            className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <div className="flex flex-col gap-6 mx-auto items-start p-8 w-full max-w-sm sm:max-w-md border rounded-2xl text-gray-700 text-sm shadow-2xl bg-white">
                <h2 className="text-2xl font-bold text-gray-900 w-full text-center">{state} Login</h2>

                <div className="w-full">
                    <label className="block mb-2 font-medium text-gray-800">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email}
                        type="email"
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="w-full">
                    <label className="block mb-2 font-medium text-gray-800">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password}
                        type="password"
                        required
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md">
                    Login
                </button>

                {state === 'Admin' ? (
                    <p className="text-center text-sm text-gray-600 w-full">
                        Doctor Login? <span onClick={() => setState('Doctor')} className="text-blue-500 cursor-pointer hover:underline">Click here</span>
                    </p>
                ) : (
                    <p className="text-center text-sm text-gray-600 w-full">
                        Admin Login? <span onClick={() => setState('Admin')} className="text-blue-500 cursor-pointer hover:underline">Click here</span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;