import './App.css';
import HomePage from './pages/homepage.component';
import { Route, Switch } from 'react-router-dom';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/signin-and-signup/signin-and-signup.component';
import { auth, createUser } from './firebase/firebase.util';
import React from 'react';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  unSubscribeFromAuth = null;

  componentDidMount(){
    this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth =>{
      if(userAuth){
        const userRef = await createUser(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });

          console.log(this.state);
        });
      }else{
        this.setState({currentUser: userAuth});
      }
    })
  }

  componentWillUnmount(){
      this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div >
      <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/signin" component={SignInAndSignUp} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
