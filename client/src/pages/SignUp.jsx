import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../Components/LoadingSpinner.jsx';


const SignUp = () => {
  const navigate=useNavigate();
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({});
  const [errors,setErrors] = useState({});

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
    console.log(formData);
  }

  const handleFormValidation=(e)=>{
    e.preventDefault();
    const formErrors={};

    if (!formData.username){
        formErrors.username = "Please Enter a valid username"
    }
    if (!formData.email) {
      formErrors.email = "Please Enter a valid Email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email format is invalid.";
    }

    if (!formData.password) {
      formErrors.password = "A password is required.";
    } else if (formData.password.length > 0 && formData.password.length < 5) {
      formErrors.password = "Please use a strong password!";
      console.log(formData.password)
    }
    if (Object.keys(formErrors).length === 0) {
      handleSubmit();
    } else {
      setErrors(formErrors);
    }
  }

  const handleSubmit=()=>{
    setLoading(true);
    axios
    .post('http://localhost:5555/auth/sign-up',formData)
    .then(()=>{
      setLoading(false);
      navigate('/sign-in');
      setFormData({});
    })
    .catch((err)=>{
      console.log("err",err);
      setLoading(false);
    })
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h1>
      </div>

      {loading ? (
          <LoadingSpinner/>
        ):(
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
        <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                placeholder='Enter Username'
                type="text"
                required
                onChange={handleChange}
                className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.username && <p className='text-red-500'>{errors.username}</p>}
          </div>
          

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
            {errors.email && <p className='text-red-500'>{errors.email}</p>}
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
            {errors.password && <p className='text-red-500'>{errors.password}</p>}
          </div>
          

          <div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-full bg-red-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-[50px]"
              onClick={handleFormValidation}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        Have an account?
      <Link to={'/sign-in'} className="font-semibold leading-6 text-red-600 hover:text-red-400">Sign In</Link>
      </p>
      </div>
        )}
    </div>
  );
};

export default SignUp;
