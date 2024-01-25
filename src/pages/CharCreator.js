import react from 'react'
import {useState} from 'react'
import Stats from '../components/Stats'
import Combat from '../components/Combat'
export default function CharCreator () {

    const [stats, setStats] = useState({})
    const getStats = (data) => {
        setStats(data)
    }
    const [mods, setMods] = useState({})
    const getMods = (data) => {
        setMods(data)
    }
    const [pro, setPro] = useState({})
    const getPro = (data) => {
        setPro(data)
    }
    console.log('proficiency parent', pro)
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
                    <Stats functions={{sendStats:getStats, sendMods:getMods, sendPro: getPro}}/>
                </div>

                <div>
                    {/* <Combat sendCombat={getCombat}/> */}
                </div>
            </form>
        </div>
    )
}