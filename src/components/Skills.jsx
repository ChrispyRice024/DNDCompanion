import React from 'react'
import {useState, useEffect} from 'react'

export default function Skills ({functions}) {

    const {character, setCharacter, fetchData} = functions
    const skills = character?.skills
    
    const proBonus = 2

    const racialBonus = character?.race?.racialAbilityBonus
    const strBonus = racialBonus?.str
    const dexBonus = racialBonus?.dex
    const intBonus = racialBonus?.int
    const chaBonus = racialBonus?.cha
    const wisBonus = racialBonus?.wis

    // const decideProficiency = () => {
    //     const labels = document.querySelectorAll('#skill_label label')
        
    //     console.log(skills)

    // }

    const decideProficiency = (e, skill) => {
        const proficiencies = fetchData?.primary_class?.chosen_pro_0 || []
        console.log(proficiencies)
        if( proficiencies.some(pro => pro.name === `Skill: ${skill}`)){
            return 2
        }else{
            return 0
        }
    }

    useEffect(() => {
        const labels = document.querySelectorAll('.skill_label label')
        const skills = Array.from(labels).map(label => label.textContent)
        console.log(skills)
    }, [fetchData])

    const decideValue = (e, skill) => {
        const isProficient = character.skills[skill].isProficient
        const stat = e.target.getAttribute('data-stat')
        // const stat = 'dex'
    
        const mod = stat === 'dex' ? character?.mods?.dexMod :
                    stat === 'str' ? character?.mods?.strMod :
                    stat === 'con' ? character?.mods?.conMod :
                    stat === 'int' ? character?.mods?.intMod :
                    stat === 'cha' ? character?.mods?.chaMod :
                    stat === 'wis' ? character?.mods?.wisMod : 0

        const modNum = parseInt(mod, 10)
        console.log(mod)

        console.log(`Skill: ${skill}`);
        console.log(`Is proficient: ${isProficient}`);
        console.log(`Stat: ${stat}`);
        console.log(`Mod: ${mod}`);
        // console.log(`Proficiency Bonus: ${character.proficiencies.bonus}`);

        if(isProficient){
            setCharacter((prevCharacter) => ({
                ...prevCharacter,
                skills:{
                    ...prevCharacter.skills,
                    [skill]: character.proficiencies.bonus + mod
                }
            }))
            return proBonus + mod
        }
    }
// console.log(decideValue('e', 'acrobatics'))
    return(
        <div id='skills'>
            <h2>Skills</h2>
             <p>
                <label className='skill_label' htmlFor='acrobatics'>Acrobatics</label>
                <input name='acrobatics' value={character.skills.acrobatics.isProficient ? (character.skills.acrobatics.value + character.proficiencies.bonus).toString() : character.skills.acrobatics.toString()} type='number' readOnly data-stat='dex'/>
                <span>
                    {}
                </span>
            </p>

            <p>
                <label className='skill_label' htmlFor='animalHandling'>Animal Handling</label>
                <input name='animalHandling' value={(skills?.animalHandling?.value + wisBonus).toString()} type='number' readOnly data-stat='wis'/>
            </p>

            <p>
                <label className='skill_label' htmlFor='arcana'>Arcana</label>
                <input name='arcana' value={decideProficiency('arcana')} type='number' readOnly data-stat='int'/>
            </p>

            <p>
                <label className='skill_label' htmlFor='athletics'>Athletics</label>
                <input name='athletics' value={(skills?.athletics?.value + strBonus).toString()} type='number' readOnly data-stat='str'/>
            </p>

            <p>
                <label className='skill_label' htmlFor='deception'>Deception</label>
                <input name='deception' value={(skills?.deception?.value + chaBonus).toString()} type='number' readOnly data-stat='cha'/>
            </p>

            <p>
                <label className='skill_label' htmlFor='history'>History</label>
                <input name='history' value={(skills?.history?.value + intBonus).toString()} type='number' readOnly data-stat='int'/>
            </p>

            <p>
                <label className='skill_label' htmlFor='insight'>Insight</label>
                <input name='insight' value={(skills?.insight?.value  + wisBonus).toString()} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label className='skill_label' htmlFor='intimidation'>Intimidation</label>
                <input name='intimidation' value={(skills?.intimidation?.value + chaBonus).toString()} type='number' readOnly data-stat='cha' />
            </p>

            <p>
                <label className='skill_label' htmlFor='investigation'>Investigation</label>
                <input name='investigation' value={(skills?.investigation?.value + intBonus).toString()} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label className='skill_label' htmlFor='medicine'>Medicine</label>
                <input name='medicine' value={(skills?.medicine?.value + wisBonus).toString()} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label className='skill_label' htmlFor='nature'>Nature</label>
                <input name='nature' value={(skills?.nature?.value + intBonus).toString()} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label className='skill_label' htmlFor='perception'>Perception</label>
                <input name='perception' value={(skills?.perception?.value + wisBonus).toString()} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label className='skill_label' htmlFor='performance'>Performance</label>
                <input name='performance' value={(skills?.performance?.value + chaBonus).toString()} type='number' readOnly data-stat='cha' />
            </p>

            <p>
                <label className='skill_label' htmlFor='persuasion'>Persuasion</label>
                <input name='persuasion' value={(skills?.persuassion?.value + chaBonus).toString()} type='number' readOnly data-stat='cha' />
            </p>

            <p>
                <label className='skill_label' htmlFor='religion'>Religion</label>
                <input name='religion' value={(skills?.religion?.value + intBonus).toString()} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label className='skill_label' htmlFor='sleightOfHand'>Sleight of Hand</label>
                <input name='sleightOfHand' value={(skills?.sleightOfHand?.value + dexBonus).toString()} type='number' readOnly data-stat='dex' />
            </p>

            <p>
                <label className='skill_label' htmlFor='stealth'>Stealth</label>
                <input name='stealth' value={(skills?.stealth?.value + dexBonus + intBonus).toString()} type='number' readOnly data-stat='dex' />
            </p>

            <p>
                <label className='skill_label' htmlFor='survival'>Survival</label>
                <input name='survival' value={(skills?.survival?.value + wisBonus).toString()} type='number' readOnly data-stat='wis' />
            </p>
        </div>
    )
}