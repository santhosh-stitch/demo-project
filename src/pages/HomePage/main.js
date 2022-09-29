import { BrowserRouter , Switch, Route } from "react-router-dom";
import HomePage from './Home';
import CreateCustomer from '../../../../project/src/HomePages/createCustomer';
import CreateCard from '../../../../project/src/HomePages/createCard';
import ViewCustomer from '../../../../project/src/HomePages/viewCustomer';
import ViewCard from '../../../../project/src/HomePages/ViewCard';
import Block from '../../../../project/src/HomePages/block';
import Unblock from '../../../../project/src/HomePages/unBlock';
// import Login from "../Login";
import LoginForm from "../../../../project/src/Login";
import store from "../../../../project/src/store/Type";
import { Redirect } from "react-router-dom";
import React from "react";
import { connect, Connect } from "react-redux";

function Main({tokenId}) {
  // const tokenId = store.getState().tokenId?.token?.tokenId;
  // console.log(tokenId)
  return (
    <BrowserRouter>
     {tokenId &&  <HomePage   />}
      <Switch>
        {!tokenId && <Route exact path='/' component={LoginForm} /> }
       {tokenId && <React.Fragment> <Route exact path='/create-customer' component={CreateCustomer} />
        <Route exact path='/create-card' component={CreateCard} />
        <Route exact path='/view-customer' component={ViewCustomer} />
        <Route exact path='/view-card' component={ViewCard} />
        <Route exact path='/block' component={Block} />
        <Route exact path='/unblock' component={Unblock} /></React.Fragment> }
        {!tokenId && <Redirect path='*' to= { '/'}/>}
      </Switch>
      {tokenId && <Redirect path='*' to= { '/create-customer'}/>}
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    tokenId: state.tokenId?.token?.tokenId,
  };
};

export default connect(mapStateToProps, null)(Main);