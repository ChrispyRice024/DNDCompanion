import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import CharCreator from './pages/CharCreator.js'
import CharacterList from './pages/CharacterList.js'
import NavBar from './components/NavBar.js'
import CharDisplay from './pages/CharDispaly.js'

function App() {

  const decideAc = (char) => {
    let baseAc = parseInt(10+char.mods.dex)

    if(char?.equipment.length > 0){
        char?.equipment.map((item, i) => {
            console.log(item)
            if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && !item.armor_class.max_bonus){
                console.log('light armor')
                baseAc = (parseInt(item.armor_class.base) + parseInt(char.mods.dex))
                console.log('AC', baseAc)
            }else if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && item.armor_class.max_bonus > 0 && char?.mods.dex >= 2){
                console.log('medium armor')
                baseAc = (parseInt(item.armor_class.base) + parseInt(item.armor_class.max_bonus))
                console.log('AC', baseAc)
            }else if(item.equipment_category.name === 'Armor' && !item.armor_class.dex_bonus){
                console.log('heavy armor')
                baseAc = (item.armor_class.base)
                console.log('AC', baseAc)
            }
        })
    }
    return baseAc
  }

  return (
    <Router>
      <div className="App">
        <div>
          <NavBar /> {/* the className of this element is nav_bar */}
        </div>
        <div className="App">
          
            <Routes>
              <Route path='/' element={<CharacterList functions={{decideAc:decideAc}}/>}/>
              <Route exact path='/creator' element = {<CharCreator functions={{decideAc:decideAc}}/>}/>
              <Route path='char/:name' element={<CharDisplay functions={{decideAc:decideAc}}/>}/>
            </Routes>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
