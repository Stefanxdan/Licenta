import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home'
import PostsPage from './components/Posts/PostsPage'
import Signup from './components/Account/Signup'
import Login from './components/Account/Login'
import Account from './components/Account/Account'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './contexts/authcontext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          < Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts" component={PostsPage} />
            <PrivateRoute exact path="/account" component={Account} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
