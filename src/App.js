import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import PostedJobs from './pages/PostedJobs';
import CreatePost from './pages/CreatePost';
import Applicants from './pages/Applicants';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/postedjobs" component={PostedJobs} />
          <Route exact path="/createpost" component={CreatePost} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/jobposts/:postId" component={SinglePost} />
          <Route exact path="/applicants/:postId" component={Applicants} />
        </Container>
      </Router>
    </AuthProvider>
  );
}


export default App;