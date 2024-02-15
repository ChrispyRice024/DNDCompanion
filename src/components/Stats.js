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
        sleightOfHand:{value:0, stat:'dex'},
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
        sendSkills(skills)
    })
    const findMod = (stat) => {
        return Math.ceil((stat - 10) / 2);
    };

    const handleChange = (e) => {
        e.preventDefault()

        const statValue = parseInt(e.target.value, 10)
        
        setStats({...stats, [e.target.name]: statValue})

        setMods({...mods, [`${e.target.name}Mod`]:findMod(statValue) })

        setSkills(prevSkills => {
            const updatedSkills = {...prevSkills}
            console.log(e.target.name)
            for (const skillName in updatedSkills){
                const skill = updatedSkills[skillName]
                // console.log('checkedPro', skill)

                if(skill.stat === e.target.name){
                    const statMod = mods[`${e.target.name}Mod`]
                    const isPro = pro[`${e.target.name}Pro`]
                    // console.log(e.target.checked)
                    const proficiencyBonus = isPro ? proBonus : 0
                    console.log(statMod)

                    updatedSkills[skillName] = {
                        ...skill,
                        value: statMod + proficiencyBonus
                    }
                }
            }
            console.log('updatedSkills', updatedSkills)
            return updatedSkills
        })


    }

    const handleInput = (e) => {
        console.log('value', e.target.value)
        console.log('checked', e.target.checked)
        console.log('pro', pro)
        console.log('skills', skills)
        console.log('mods', mods)
    }
    const handleProChange = (e) => {

        setPro((prevPro) => {
            return {...prevPro, [e.target.name]: e.target.checked}
        })
        console.log('pro', pro)

        console.log(e.target.checked)
    }


    return(
        <div>
            
                <h2>Stats</h2>

            <p className="str">
                <label className="str" htmlFor="str">STR</label>
                <input name="str" id="str" type="number" className="stat" defaultValue="10" onInput={handleChange}/>
                <input  id="strMod"  readOnly value={findMod(stats.str)} className="mod str"/>
                <input type="checkbox" onInput={handleProChange}  checked={pro.str} name="strPro"/>
                <label htmlFor="strPro">Proficient</label>
            </p>

            <p className="dex">
                <label className="dex" htmlFor="dex">DEX</label>
                <input name="dex" id="dex" type="number" defaultValue="10" className="stat"  onInput={handleChange} />
                <input  readOnly id='dexMod' value={findMod(stats.dex)} className="mod dex"/>
                <input type="checkbox" onChange={handleProChange} onInput={handleInput} checked={pro.dex} name="dexPro"/>
                <label htmlFor="dexPro">Proficient</label>
            </p>

            <p className="con">
                <label className="con" htmlFor="con">CON</label>
                <input name="con" id="con" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input id="conMod"  readOnly value={findMod(stats.con)} className="mod con"/>
                <input type="checkbox" onChange={handleProChange} checked={pro.con} name="conPro"/>
                <label htmlFor="conPro">Proficient</label>
            </p>

            <p className="int">
                <label className="int" htmlFor="int">INT</label>
                <input name="int" id="int" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input id="intMod" readOnly className="mod int" value={findMod(stats.int)} />
                <input type="checkbox" onChange={handleProChange} checked={pro.int} name="intPro"/>
                <label htmlFor="intPro">Proficient</label>
            </p>

            <p className="wis">
                <label className="wis" htmlFor="wis">WIS</label>
                <input type="number" id="wis" className="stat" name="wis" defaultValue="10" onChange={handleChange} />
                <input  readOnly id="wisMod" value={findMod(stats.wis)} className="mod wis"/>
                <input type="checkbox" onChange={handleProChange} checked={pro.wis} name="wisPro"/>
                <label htmlFor="wisPro">Proficient</label>
            </p>

            <p className="cha">
                <label className="cha" htmlFor="cha">CHA</label>
                <input name="cha" id="cha" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input  id="chaMod" readOnly value={findMod(stats.cha)} className="mod cha"/>
                <input type="checkbox" onChange={handleProChange} checked={pro.cha} name="chaPro"/>
                <label htmlFor="chaPro">Proficient</label>
            </p>
        </div>
    )
}