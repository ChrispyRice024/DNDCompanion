import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CharCreator from './pages/CharCreator.js'
import CharacterList from './pages/CharacterList.js'
import NavBar from './components/NavBar.js'

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <NavBar/>
        </div>
        <div className="App">
          
            <Routes>
              <Route exact path='/creator' element = {<CharCreator/>}/>
              <Route path='/' element={<CharacterList/>}/>
            </Routes>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
