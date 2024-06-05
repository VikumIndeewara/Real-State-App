import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../Components/LoadingSpinner.jsx';


const SignIn = () => {
  const navigate=useNavigate();
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({});
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
    console.log(formData);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    setLoading(true);
    axios
    .post('http://localhost:5555/auth/sign-in',formData)
    .then(()=>{
      setLoading(false);
      navigate('/');
      console.log('login success!!');
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    })
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Sign In
        </h1>
      </div>

      {loading ? (
          <LoadingSpinner/>
        ):(
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder='Enter Email'
                required
                onChange={handleChange}
                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder='Enter Password'
                required
                onChange={handleChange}
                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-full bg-red-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-[50px]"
              onClick={handleSubmit}
              disabled={loading}
            >
              Sign In
            </button>
          </div>
        </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        Do not have an account?
      <Link to={'/sign-up'} className="font-semibold leading-6 text-red-600 hover:text-red-400">Sign Up</Link>
      </p>
      </div>
        )}
    </div>
  );
};

export default SignIn;
