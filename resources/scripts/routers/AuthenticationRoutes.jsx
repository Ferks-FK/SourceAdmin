import { Route, Routes } from 'react-router-dom';
import LoginContainer from '@/components/pages/auth/LoginContainer';

export default () => (
  <Routes>
    <Route path='/login' element={<LoginContainer/>}/>
  </Routes>
)
