import './App.css';
import { useEffect } from 'react';
// import SingIn from './pages/auth/SignIn';
// import { connect } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";  
import publicRoutes from './routes/publicRoutes';
import { SIGN_IN } from './utils/urls';
import SignIn from './pages/auth/SignIn';

const App = (props) => {
  // const navigate = useNavigate();
  const {auth, sandbox, loading} = props;
  // useEffect(() => auth ? null : navigate(SIGN_IN), [auth,navigate])
  const publicRoute = (route, index) => {
    if (auth) {
      return null;
    }
    return (
      <Route
         key={route.path}
         path={route.path}
         element={route.component}
         exact={route.exact}
      />
    );
  };
  return (
    <div className="App">
     <BrowserRouter>
       <Routes>
          {/* <Route exact path="/" to={auth ? "" : SIGN_IN}/> */}
          <Route exact path="/" element={ !auth ? <Navigate to={SIGN_IN} replace/> 
          : 
          // <Navigate to={}/>
          null
          } />
          {/* <Route exact path="/" element= /> */}
          {/* {auth ? navigate(SIGN_IN) : navigate(SIGN_IN)} */}
          {publicRoutes.map((route, index) => publicRoute(route, index))}
          {!auth && <Route path="*" element={<Navigate to={SIGN_IN} replace/>} />}

       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
