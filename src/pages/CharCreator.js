import react from 'react'
import {useState} from 'react'
import Stats from '../components/Stats'
import Combat from '../components/Combat'
import Skills from '../components/Skills'
import SavingThrows from '../components/SavingThrows'
export default function CharCreator () {

    const proBonus = 3

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

    //Skills
    const [skills, setSkills] =useState({
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
    const getSkills = (data) => {
        setSkills(data)
    }
    // const updateSkillValues = () => {
    //     setSkills((prevSkills) => {
    //         const updatedSkills = { ...prevSkills }
    //         for (const skillName in updatedSkills){
    //             const skill = updatedSkills[skillName]
    //             const statMod = mods[`${skill.stat}Mod`]

    //             const isProficient = pro[`${skill.stat}Pro`]
    //             const proficiencyBonus = isProficient ? proBonus : 0

    //             updatedSkills[skillName] = {
    //                 ...skill,
    //                 value: statMod + proficiencyBonus
    //             }
    //         }
    //         console.log(updatedSkills)
    //         // return updatedSkills
    //     })
    // }
// updateSkillValues()
    //Saving Throws
    const [savingThrow, setSavingThrow] = useState({})
    const getSavingThrow = (data) => {
        setSavingThrow(data)
    }

    const character = {
        stats: stats,
        mods:mods,
        proficiencies:pro,
        combat: combat,
    }



    return(
        <div>
            <form>
                <div>
                    <Stats functions={{sendStats:getStats, sendMods:getMods, sendPro: getPro, sendSkills:getSkills}}/>
                </div>

                <div>
                    <Combat sendCombat={getCombat}/>
                </div>

                <div>
                    <Skills functions={{sendSkills: getSkills, mods: mods, pro:pro, proBonus: proBonus, skills: skills, setSkills:setSkills}}/>
                </div>
                <div>
                    <SavingThrows functions= {{sendSavingThrow: getSavingThrow, mods: mods}}/>
                </div>
            </form>
        </div>
    )
}