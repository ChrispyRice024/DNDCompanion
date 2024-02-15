import react from 'react'
import {useState, useEffect} from 'react'
import Stats from '../components/Stats'
import Combat from '../components/Combat'
import Skills from '../components/Skills'
import SavingThrows from '../components/SavingThrows'
export default function CharCreator () {

    // const seedData = {
    //     'hit_die': 8,
    //     proficencyChoices: [
    //         {
    //             "desc": "Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival",
    //             "choose": 2,
    //             "type": "proficiencies",
    //             "from": {
    //                 "option_set_type": "options_array",
    //                 "options": [
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-arcana",
    //                             "name": "Skill: Arcana",
    //                             "url": "/api/proficiencies/skill-arcana"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-animal-handling",
    //                             "name": "Skill: Animal Handling",
    //                             "url": "/api/proficiencies/skill-animal-handling"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-insight",
    //                             "name": "Skill: Insight",
    //                             "url": "/api/proficiencies/skill-insight"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-medicine",
    //                             "name": "Skill: Medicine",
    //                             "url": "/api/proficiencies/skill-medicine"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-nature",
    //                             "name": "Skill: Nature",
    //                             "url": "/api/proficiencies/skill-nature"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-perception",
    //                             "name": "Skill: Perception",
    //                             "url": "/api/proficiencies/skill-perception"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-religion",
    //                             "name": "Skill: Religion",
    //                             "url": "/api/proficiencies/skill-religion"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-survival",
    //                             "name": "Skill: Survival",
    //                             "url": "/api/proficiencies/skill-survival"
    //                         }
    //                     }
    //                 ]
    //             }
    //         }
    //     ]
    // }
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
        sleightOfHand:{value:0, stat:'dex'},
        stealth:{value:0, stat:'dex'},
        survival:{value:7, stat:'wis'}
    })
    const getSkills = (data) => {
        setSkills(data)
    }
    console.log(skills)
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

    // useEffect(() => {
    //     console.log('skills changed', skills)
    // }, [skills])


    return(
        <div>
            <form>
                <div>
                    <Stats functions={{sendStats:getStats, sendMods:getMods, sendPro: getPro, sendSkills:getSkills, proBonus:proBonus}}/>
                </div>

                <div>
                    <Combat sendCombat={getCombat}/>
                </div>

                <div>
                    <Skills functions={{pro:pro, proBonus: proBonus, skills: skills}}/>
                </div>
                <div>
                    {/* <SavingThrows functions= {{sendSavingThrow: getSavingThrow, mods: mods}}/> */}
                </div>
            </form>
        </div>
    )
}