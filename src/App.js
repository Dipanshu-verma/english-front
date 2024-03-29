import logo from './logo.svg';
import './App.css';
import Auth from './Components/auth/Auth';
import Navbar from './Components/Navbar/Navbar';
import { Routes,Route, useSearchParams, Navigate } from 'react-router-dom';
import Dashbaord from './Components/Dashbaord';
 
import CreatePost from './Components/CreatePost';
 
import { useSelector } from 'react-redux';
function App() {
  const {token} = useSelector(store=>store)

  return (
    <div className="">
      <Navbar/>
    <Routes>
    <Route path='/' element={token?<Dashbaord/>:<Navigate to="login" />}  />
    {
      token &&<><Route path='/dashboard' element={token?<Dashbaord/>:<Navigate to="login" />}  />
      <Route path='/createpost' element={token?<CreatePost/>:<Navigate to="login" />} />
      </>
    }
    
      <Route path='/login' element={<Auth/>}  />

    </Routes>
 
    </div>
  );
}

export default App;
