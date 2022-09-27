import './App.css';
// import SingIn from './pages/auth/SignIn';
// import { connect } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";  
// import publicRoutes from './routes/publicRoutes';
import { SIGN_IN } from './utils/urls';

const App = (props) => {
  const {auth, sandbox, loading} = props;

  const publicRoutes = (route, index) => {
    if (auth) {
      return null;
    }
    return (
      <Route
         key={route.path}
         path={route.path}
         component={route.component}
         exact={route.exact}
      />
    );
  };
  return (
    <div className="App">
     <BrowserRouter>
       <Routes>
          <Navigate exact path="/" to={auth ? "" : SIGN_IN}/>
          {publicRoutes.map((route, index) => publicRoutes(route, index))}
          {!auth && <Navigate path="*" to={SIGN_IN} />}
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
