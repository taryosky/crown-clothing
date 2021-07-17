import './App.css';
import HomePage from './pages/homepage.component';
import { Route, Switch } from 'react-router-dom';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/signin-and-signup/signin-and-signup.component';
import { auth, createUser } from './firebase/firebase.util';
import React from 'react';
import setCurrentUser from './redux/user/user.action';
import { connect } from 'react-redux';

class App extends React.Component {
  unSubscribeFromAuth = null;
  
  componentDidMount(){
    const { setCurrentUser } = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth =>{
      if(userAuth){
        const userRef = await createUser(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          });
        });
      }else{
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount(){
      this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div >
      <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}
const mapDispatchToProp = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(null, mapDispatchToProp)(App);
