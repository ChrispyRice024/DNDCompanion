import react from 'react'
import {useState} from 'react'
import Stats from '../components/Stats'
export default function CharCreator () {

    const [stats, setStats] = useState({})
    const getStats = (data) => {
        setStats(data)
    }
    const [mods, setMods] = useState({})
    const getMods = (data) => {
        setMods(data)
    }
    console.log('mod parent', mods)
    console.log('parent', stats)

    const [combat, setCombat] = useState({})
    const getCombat = (data) => {
        setCombat(data)
    }

    return(
        <div>
            <form>
                <div>
                    <Stats functions={{sendStats:getStats, sendMods:getMods}}/>
                </div>

                <div>
                    {/* <Combat sendCombat={getCombat}/> */}
                </div>
            </form>
        </div>
    )
}