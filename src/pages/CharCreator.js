import react from 'react'
import {useState} from 'react'
import Stats from '../components/Stats'
import Combat from '../components/Combat'
export default function CharCreator () {


    //STATS
    const [stats, setStats] = useState({})
    const getStats = (data) => {
        setStats(data)
    }
    //STAT MODS
    const [mods, setMods] = useState({})
    const getMods = (data) => {
        setMods(data)
    }
    //PROFICIENCIES
    const [pro, setPro] = useState({})
    const getPro = (data) => {
        setPro(data)
    }
    //COMBAT
    const [combat, setCombat] = useState({})
    const getCombat = (data) => {
        setCombat(data)
    }
    const character = {
        stats: stats,
        mods:mods,
        proficiencies:pro,
        combat: combat,
    }

    console.log('parent', combat)
    console.log('character parent', character)
    return(
        <div>
            <form>
                <div>
                    <Stats functions={{sendStats:getStats, sendMods:getMods, sendPro: getPro}}/>
                </div>

                <div>
                    <Combat sendCombat={getCombat}/>
                </div>
            </form>
        </div>
    )
}