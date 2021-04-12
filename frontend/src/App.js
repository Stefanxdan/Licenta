import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home'
import Posts from './components/Posts/Posts'


function App() {
  return (
    <Router>
      <div className="App">
        < Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
