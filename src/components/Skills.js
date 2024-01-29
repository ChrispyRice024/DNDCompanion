import React from 'react'
import {useState, useEffect} from 'react'

export default function Skills ({functions}) {

    const {sendSkills, mods, pro, proBonus, skills, setSkills} = functions

    // const [skills, setSkills] =useState({
    //     acrobatics:{value:0, stat:'dex'},
    //     animalHandling:{value:0, stat:'wis'},
    //     arcana:{value:0, stat:'int'},
    //     athletics:{value:0, stat:'str'},
    //     deception:{value:0, stat:'cha'},
    //     history:{value:0, stat:'int'},
    //     insight:{value:0, stat:'wis'},
    //     intimidation:{value:0, stat:'cha'},
    //     investigation:{value:0, stat:'int'},
    //     medicine:{value:0, stat:'wis'},
    //     nature:{value:0, stat:'int'},
    //     perception:{value:0, stat:'wis'},
    //     performance:{value:0, stat:'cha'},
    //     persuassion:{value:0, stat:'cha'},
    //     religion:{value:0, stat:'int'},
    //     slightOfHand:{value:0, stat:'dex'},
    //     stealth:{value:0, stat:'dex'},
    //     survival:{value:0, stat:'wis'}
    // })

    
        // const skillStat = skills[4].stat
    const updateSkillValues = () => {
        setSkills((prevSkills) => {
            const updatedSkills = { ...prevSkills }
            for (const skillName in updatedSkills){
                const skill = updatedSkills[skillName]
                const statMod = mods[`${skill.stat}Mod`]

                const isProficient = pro[`${skill.stat}Pro`]
                const proficiencyBonus = isProficient ? proBonus : 0

                updatedSkills[skillName] = {
                    ...skill,
                    value: statMod + proficiencyBonus
                }
            }
            return updatedSkills
        })
    }
    // console.log('dexPro', pro.dexPro)
    // console.log(skillStat)
    // console.log('sendPro', proBonus)
    // for(const skillName in skills){
    //     const skillStat = skills[skillName].stat
    //     const skillValue = skills[skillName].value
    //     if(skillStat === 'dex' && pro.dexPro === true){
    //         setSkills((prevSkills) => ({
    //             ...prevSkills,
    //             [skillName]:{
    //                 ...prevSkills[skillName],
    //                 value: mods.dexMod+proBonus
    //             }
    //         }))
    //     }
    // }
    const strSkills = Object.keys(skills).filter((skill) => skills[skill].stat === 'str')
    const dexSkills = Object.keys(skills).filter((skill) => skills[skill].stat === 'dex')
    const intSkills = Object.keys(skills).filter((skill) => skills[skill].stat === 'int')
    const wisSkills = Object.keys(skills).filter((skill) => skills[skill].stat === 'wis')
    const chaSkills = Object.keys(skills).filter((skill) => skills[skill].stat === 'cha')
    // console.log('strSkills', strSkills, 'dexSkills', dexSkills, 'intSkills', intSkills, 'wisSkills', wisSkills, 'chaSkills', chaSkills)
    // console.log(dexSkills[2])
    // console.log(mods.strMod)

    // for(let i=0; i < strSkills.length; i++){
    //     const skillName = strSkills[i]
    //     setSkills((prevSkills) => ({
    //         ...prevSkills,
    //         [skillName]:{
    //             ...prevSkills[skillName],
    //             value:mods.strMod
    //         }
    //     }))
    // }

    // useEffect(() => {
    //     sendSkills(skills)
    // })
    return(
        <div>
            <p>
                <label htmlFor='acrobatics'>Acrobatics</label>
                <input name='acrobatics' defaultValue={mods.dexMod} type='number' readOnly data-stat='dex'/>
            </p>

            <p>
                <label htmlFor='animalHandling'>Animal Handling</label>
                <input name='animalHandling' defaultValue={mods.wisMod} type='number' readOnly data-stat='wis'/>
            </p>

            <p>
                <label htmlFor='arcana'>Arcana</label>
                <input name='arcana' defaultValue={mods.intMod} type='number' readOnly data-stat='int'/>
            </p>

            <p>
                <label htmlFor='athletics'>Athletics</label>
                <input name='athletics' defaultValue={mods.strMod} type='number' readOnly data-stat='str'/>
            </p>

            <p>
                <label htmlFor='deception'>Deception</label>
                <input name='deception' defaultValue={mods.chaMod} type='number' readOnly data-stat='cha'/>
            </p>

            <p>
                <label htmlFor='history'>History</label>
                <input name='history' defaultValue={mods.intMod} type='number' readOnly data-stat='int'/>
            </p>

            <p>
                <label htmlFor='insight'>Insight</label>
                <input name='insight' defaultValue={mods.wisMod} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label htmlFor='intimidation'>Intimidation</label>
                <input name='intimidation' defaultValue={mods.chaMod} type='number' readOnly data-stat='cha' />
            </p>

            <p>
                <label htmlFor='investigation'>Investigation</label>
                <input name='investigation' defaultValue={mods.intMod} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label htmlFor='medicine'>Medicine</label>
                <input name='medicine' defaultValue={mods.wisMod} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label htmlFor='nature'>Nature</label>
                <input name='nature' defaultValue={mods.intMod} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label htmlFor='perception'>Perception</label>
                <input name='perception' defaultValue={mods.wisMod} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label htmlFor='performance'>Performance</label>
                <input name='performance' defaultValue={mods.chaMod} type='number' readOnly data-stat='cha' />
            </p>

            <p>
                <label htmlFor='persuasion'>Persuasion</label>
                <input name='persuasion' defaultValue={mods.chaMod} type='number' readOnly data-stat='cha' />
            </p>

            <p>
                <label htmlFor='religion'>Religion</label>
                <input name='religion' defaultValue={mods.intMod} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label htmlFor='sleightOfHand'>Sleight of Hand</label>
                <input name='sleightOfHand' defaultValue={mods.dexMod} type='number' readOnly data-stat='dex' />
            </p>

            <p>
                <label htmlFor='stealth'>Stealth</label>
                <input name='stealth' defaultValue={mods.dexMod} type='number' readOnly data-stat='dex' />
            </p>

            <p>
                <label htmlFor='survival'>Survival</label>
                <input name='survival' defaultValue={mods.wisMod} type='number' readOnly data-stat='wis' />
            </p>
        </div>
    )
}