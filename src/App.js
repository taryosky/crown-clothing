import './App.css';
import HomePage from './pages/homepage.component';
import { Route, Switch } from 'react-router-dom';

function HatsPage(){
  return (
    <h1>this is the hats page</h1>
  );
}
function App() {
  return (
    <div >
      <switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/hats" component={HatsPage} />
      </switch>
      
    </div>
  );
}

export default App;
