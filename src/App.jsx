import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CharCreator from './pages/CharCreator.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element = {<CharCreator/>}/> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
