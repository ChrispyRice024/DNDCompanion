import react from 'react'
import {useState, useEffect} from 'react'


export default function Stats({functions}) {

    const {sendStats, sendMods} = functions

    const [stats, setStats] = useState({
        str:10,
        dex:10,
        con:10,
        int:10,
        wis:10,
        cha:10
    })
    const [mods, setMods] = useState({
        strMod:0,
        deMod:0,
        conMod:0,
        intMod:0,
        wisMod:0,
        chaMod:0
    })

    useEffect(() => {
        sendStats(stats)
        sendMods(mods)
    })
    const findMod = (stat) => {
        return Math.ceil((stat - 10) / 2);
    };

    const handleChange = (e) => {
        e.preventDefault()
        
        setStats({...stats, [e.target.name]: e.target.value})
        console.log(stats)
        setMods({...mods, [`${e.target.name}Mod`]:findMod(e.target.value) })
        console.log(mods)
    }

    return(
        <div>
            
                <h2>Stats</h2>

            <p className="str">
                <label className="str" htmlFor="str">STR</label>
                <input name="str" id="str" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input  id="strMod"  readOnly value={findMod(stats.str)} className="mod str"/>
            </p>

            <p className="dex">
                <label className="dex" htmlFor="dex">DEX</label>
                <input name="dex" id="dex" type="number" defaultValue="10" className="stat"  onChange={handleChange} />
                <input  readOnly id='dexMod' value={findMod(stats.dex)} className="mod dex"/>
            </p>

            <p className="con">
                <label className="con" htmlFor="con">CON</label>
                <input name="con" id="con" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input id="conMod"  readOnly value={findMod(stats.con)} className="mod con"/>
            </p>

            <p className="int">
                <label className="int" htmlFor="int">INT</label>
                <input name="int" id="int" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input id="intMod" readOnly className="mod int" value={findMod(stats.int)} />
            </p>

            <p className="wis">
                <label className="wis" htmlFor="wis">WIS</label>
                <input type="number" id="wis" className="stat" name="wis" defaultValue="10" onChange={handleChange} />
                <input  readOnly id="wisMod" value={findMod(stats.wis)} className="mod wis"/>
            </p>

            <p className="cha">
                <label className="cha" htmlFor="cha">CHA</label>
                <input name="cha" id="cha" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input  id="chaMod" readOnly value={findMod(stats.cha)} className="mod cha"/>
            </p>
        </div>
    )
}