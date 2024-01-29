import react from 'react'
import {useState, useEffect} from 'react'


export default function Stats({functions}) {

    const {sendStats, sendMods, sendPro, sendSkills, proBonus} = functions

    const [skills, setSkills] = useState({
        acrobatics:{value:0, stat:'dex'},
        animalHandling:{value:0, stat:'wis'},
        arcana:{value:0, stat:'int'},
        athletics:{value:0, stat:'str'},
        deception:{value:0, stat:'cha'},
        history:{value:0, stat:'int'},
        insight:{value:0, stat:'wis'},
        intimidation:{value:0, stat:'cha'},
        investigation:{value:0, stat:'int'},
        medicine:{value:0, stat:'wis'},
        nature:{value:0, stat:'int'},
        perception:{value:0, stat:'wis'},
        performance:{value:0, stat:'cha'},
        persuassion:{value:0, stat:'cha'},
        religion:{value:0, stat:'int'},
        slightOfHand:{value:0, stat:'dex'},
        stealth:{value:0, stat:'dex'},
        survival:{value:0, stat:'wis'}
    })

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
        dexMod:0,
        conMod:0,
        intMod:0,
        wisMod:0,
        chaMod:0
    })
    const [pro, setPro] = useState({
        strPro:false,
        dexPro:false,
        conPro:false,
        intPro:false,
        wisPro:false,
        chaPro:false
    }) 

    useEffect(() => {
        sendStats(stats)
        sendMods(mods)
        sendPro(pro)
    })
    const findMod = (stat) => {
        return Math.ceil((stat - 10) / 2);
    };

    const handleChange = (e) => {
        e.preventDefault()

        const statValue = parseInt(e.target.value, 10)
        
        setStats({...stats, [e.target.name]: statValue})

        setMods({...mods, [`${e.target.name}Mod`]:findMod(statValue) })

        setSkills((prevSkills) => {
            const updatedSkills = { ...prevSkills }
            for (const skillName in updatedSkills){
                const skill = updatedSkills[skillName]
                const statMod = mods[`${skill.stat}Mod`]

                const isProficient = pro[`${skill.stat}Pro`]
                const proficiencyBonus = isProficient === true ? proBonus : 0
                // console.log('isProficient', proficiencyBonus)
                updatedSkills[skillName] = {
                    ...skill,
                    value: statMod + 3
                }
            }
            // console.log(updatedSkills)
            return updatedSkills
        })

    }
    const handleProChange = (e) => {
        e.preventDefault()
        
        const isChecked = e.target.checked

        if(isChecked === false){

        }
        setPro((prevPro) => {
            return {...prevPro, [e.target.name]: isChecked}
        })
        // if(e.target.value === 'on'){
        //     setPro({...pro, [e.target.name]: true})
        // }else{
        //     setPro({...pro, [e.target.name]: false})
        // }
        console.log(pro)
    }


    return(
        <div>
            
                <h2>Stats</h2>

            <p className="str">
                <label className="str" htmlFor="str">STR</label>
                <input name="str" id="str" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input  id="strMod"  readOnly value={findMod(stats.str)} className="mod str"/>
                <input type="checkbox" onChange={handleProChange} checked={pro.strPro} name="strPro"/>
                <label htmlFor="strPro">Proficient</label>
            </p>

            <p className="dex">
                <label className="dex" htmlFor="dex">DEX</label>
                <input name="dex" id="dex" type="number" defaultValue="10" className="stat"  onChange={handleChange} />
                <input  readOnly id='dexMod' value={findMod(stats.dex)} className="mod dex"/>
                <input type="checkbox" onChange={handleProChange} checked={pro.dexPro} name="dexPro"/>
                <label htmlFor="dexPro">Proficient</label>
            </p>

            <p className="con">
                <label className="con" htmlFor="con">CON</label>
                <input name="con" id="con" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input id="conMod"  readOnly value={findMod(stats.con)} className="mod con"/>
                <input type="checkbox" onChange={handleProChange} checked={pro.conPro} name="conPro"/>
                <label htmlFor="conPro">Proficient</label>
            </p>

            <p className="int">
                <label className="int" htmlFor="int">INT</label>
                <input name="int" id="int" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input id="intMod" readOnly className="mod int" value={findMod(stats.int)} />
                <input type="checkbox" onChange={handleProChange} checked={pro.intPro} name="intPro"/>
                <label htmlFor="intPro">Proficient</label>
            </p>

            <p className="wis">
                <label className="wis" htmlFor="wis">WIS</label>
                <input type="number" id="wis" className="stat" name="wis" defaultValue="10" onChange={handleChange} />
                <input  readOnly id="wisMod" value={findMod(stats.wis)} className="mod wis"/>
                <input type="checkbox" onChange={handleProChange} checked={pro.wisPro} name="wisPro"/>
                <label htmlFor="wisPro">Proficient</label>
            </p>

            <p className="cha">
                <label className="cha" htmlFor="cha">CHA</label>
                <input name="cha" id="cha" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input  id="chaMod" readOnly value={findMod(stats.cha)} className="mod cha"/>
                <input type="checkbox" onChange={handleProChange} checked={pro.chaPro} name="chaPro"/>
                <label htmlFor="chaPro">Proficient</label>
            </p>
        </div>
    )
}