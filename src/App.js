import './App.css';
// import SingIn from './pages/auth/SignIn';
// import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";  
import publicRoutes from './routes/publicRoutes';
import { SIGN_IN } from './utils/urls';
import SignIn from './pages/auth/SignIn';

const App = (props) => {
  const {auth, sandbox, loading} = props;

  const publicRoute = (route, index) => {
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
          {/* <Route exact path="/" to={auth ? "" : SIGN_IN}/> */}
          <Route exact path="/" comp={SIGN_IN}/>
          {publicRoutes.map((route, index) => publicRoute(route, index))}
          {!auth && <Route path="*" comp={SIGN_IN} />}
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
