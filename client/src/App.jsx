import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute.jsx';
import CreateVlog from './pages/CreateVlog.jsx';
import UpdateVlog from './pages/UpdateVlog.jsx';



export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />

        <Route element={<PrivateRoute />} >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-vlog" element={<CreateVlog />} />
          <Route path="/update-vlog/:vlogId" element={<UpdateVlog />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
