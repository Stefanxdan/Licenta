import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import PostsPage from './components/Posts/PostsPage'
import PostPage from './components/Post/PostPage'
import AddPost from './components/Account/AddPost'
import EditPost from './components/Account/EditPost'
import Signup from './components/Account/Signup'
import Login from './components/Account/Login'
import Account from './components/Account/Account'
import AdminPage from './components/Admin/AdminPage'
import Map from './components/Map/Map'
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
            <Route exact path="/posts/:idPost" component={PostPage} />
            <Route exact path="/posts/Filters" component={PostsPage} />
            <Route exact path="/posts/user/:idUser" component={PostsPage} />
            <PrivateRoute exact path="/posts/add" component={AddPost} />
            <PrivateRoute exact path="/posts/edit/:idPost" component={EditPost} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/account" component={Account} />
            <PrivateRoute exact path="/admin" component={AdminPage} />
            
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
