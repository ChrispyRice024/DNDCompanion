import react from 'react'
import {useState, useEffect} from 'react'
import {debounce} from 'lodash' 

export default function Stats({functions}) {
    const {sendCharacter,setCharacter, proBonus, character} = functions

    const findMod = (stat) => {
        return Math.ceil((stat - 10) / 2);
    }

    const handleChange = (e) => {
        const statValue = parseInt(e.target.value, 10);
        const modValue = Math.ceil((statValue - 10) / 2);
    
        setCharacter(prevCharacter => ({
            ...prevCharacter,
            stats: {
                ...prevCharacter.stats,
                [e.target.name]: statValue
            },
            mods: {
                ...prevCharacter.mods,
                [`${e.target.name}Mod`]: modValue
            },
        }));


        console.log(character)
    };

    const handleProChange = (e) => {
        setCharacter(prevCharacter => ({
            ...prevCharacter,
            proficiencies:{
                ...prevCharacter.proficiencies,
                [e.target.name]: e.target.checked
            }
        }))
        console.log(character)
    }
    console.log(character?.mods)

    useEffect(() => {
            const updatedSkills = {...character.skills}

            for(const skillName in updatedSkills){
                const skill = updatedSkills[skillName]
                const statMod = character.mods[`${skill.stat}Mod`]
                const isPro = character.proficiencies[`${skill.stat}Pro`]
                const proficiencyBonus = isPro ? proBonus : 0

                updatedSkills[skillName] = {
                    ...skill,
                    value:statMod + proficiencyBonus
                }
            }
            setCharacter(prevCharacter => ({
                ...prevCharacter,
                skills: updatedSkills
            }))
    }, [character.stats, character.mods, character.proficiencies])

    return(
        <div>
            
                <h2>Stats</h2>

            <p className="str">
                <label className="str" htmlFor="str">STR</label>
                <input name="str" id="str" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input  id="strMod"  readOnly value={character.mods.strMod} className="mod str"/>
                <input type="checkbox" onInput={handleProChange}  name="strPro"/>
                <label htmlFor="strPro">Proficient</label>
            </p>

            <p className="dex">
                <label className="dex" htmlFor="dex">DEX</label>
                <input name="dex" id="dex" type="number" defaultValue="10" className="stat"  onInput={handleChange} />
                <input  readOnly id='dexMod' value={character.mods.dexMod} className="mod dex"/>
                <input type="checkbox" onChange={handleProChange} checked={character.proficiencies.dex} name="dexPro"/>
                <label htmlFor="dexPro">Proficient</label>
            </p>

            <p className="con">
                <label className="con" htmlFor="con">CON</label>
                <input name="con" id="con" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input id="conMod"  readOnly value={character.mods.conMod} className="mod con"/>
                <input type="checkbox" onChange={handleProChange} checked={character.proficiencies.con} name="conPro"/>
                <label htmlFor="conPro">Proficient</label>
            </p>

            <p className="int">
                <label className="int" htmlFor="int">INT</label>
                <input name="int" id="int" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input id="intMod" readOnly className="mod int" value={character.mods.intMod} />
                <input type="checkbox" onChange={handleProChange} checked={character.proficiencies.int} name="intPro"/>
                <label htmlFor="intPro">Proficient</label>
            </p>

            <p className="wis">
                <label className="wis" htmlFor="wis">WIS</label>
                <input type="number" id="wis" className="stat" name="wis" defaultValue="10" onChange={handleChange} />
                <input  readOnly id="wisMod" value={character.mods.wisMod} className="mod wis"/>
                <input type="checkbox" onChange={handleProChange} checked={character.proficiencies.wis} name="wisPro"/>
                <label htmlFor="wisPro">Proficient</label>
            </p>

            <p className="cha">
                <label className="cha" htmlFor="cha">CHA</label>
                <input name="cha" id="cha" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input  id="chaMod" readOnly value={character.mods.chaMod} className="mod cha"/>
                <input type="checkbox" onChange={handleProChange} checked={character.proficiencies.cha} name="chaPro"/>
                <label htmlFor="chaPro">Proficient</label>
            </p>
        </div>
    )
}