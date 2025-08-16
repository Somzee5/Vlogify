import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signInSuccess } from './redux/user/userSlice.js';
import { getApiUrl } from './config.js';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import PrivateRoute from './components/PrivateRoute.jsx';
import CreateVlog from './pages/CreateVlog.jsx';
import UpdateVlog from './pages/UpdateVlog.jsx';
import Vlog from './pages/Vlog.jsx';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${getApiUrl()}/api/auth/check-auth`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const userData = await response.json();
          dispatch(signInSuccess(userData));
        }
      } catch (error) {
        console.log('User not authenticated or error checking auth status');
      }
    };

    // Check authentication status
    checkAuthStatus();

    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loader for 3 seconds

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile/:id" element={<PublicProfile />} />
            <Route path="/vlog/:vlogId" element={<Vlog />} />

            <Route element={<PrivateRoute />} >
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-vlog" element={<CreateVlog />} />
              <Route path="/update-vlog/:vlogId" element={<UpdateVlog />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
