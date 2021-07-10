import './App.css';
import HomePage from './pages/homepage.component';
import { Route, Switch } from 'react-router-dom';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';

function HatsPage(){
  return (
    <h1>this is the hats page</h1>
  );
}
function App() {
  return (
    <div >
    <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={Shop} />
      </Switch>
      
    </div>
  );
}

export default App;
