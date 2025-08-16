import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config.js';

export default function OAuth() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {

        try
        {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch(`${getApiUrl()}/api/auth/google`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },

                body : JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    photo : result.user.photoURL,
                }),
            });

            const data = await res.json();
            dispatch(signInSuccess(data));

            navigate('/');

            

        }

         
        catch (error) {
            console.log('Could not sign in with google', error);
        }

    };

  return (
    <button
        type='button'
        className="flex items-center justify-center w-full bg-slate-300 text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={ handleGoogleClick }
    >
      <img
        src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
        alt="Google Logo"
        className="w-5 h-5 mr-2"
      />
      Continue with Google
    </button>
  );
};