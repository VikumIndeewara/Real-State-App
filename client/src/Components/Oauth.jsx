import { getAuth, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import app from '../firebase/firebase.js';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInSuccess } from '../redux/user/userSlice.js';


const Oauth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick=async(e)=>{
        e.preventDefault();
        try{
            const provider = new GoogleAuthProvider;
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
            axios
            .post('https://real-state-app-server.onrender.com/auth/google',{
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            })
            .then((res)=>{
                dispatch(signInSuccess(res));
              navigate('/');
              console.log('login success!!');
            })
            .catch((err)=>{
              console.log(err);
            })
        }catch(err){
            console.log(err);
        }
    }
  return (
    <button 
    onClick={handleGoogleClick}
    type="button"
    className="flex w-full justify-center rounded-full bg-orange-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-[15px]">
        Continue With Google
    </button>
  )
}

export default Oauth;