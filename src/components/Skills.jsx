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

    const decideProficiency = (skill) => {
        
        const proficiencies = fetchData?.primary_class?.chosen_pro_0 || []
        // console.log('proficiencies', proficiencies)
        // proficiencies.some(pro => console.log(pro))
        // console.log(e?.target?.name)
        if( proficiencies.some(pro => pro.name === `Skill: ${skill}`)){
            // console.log('isProficient', skill)
            return 2
        }else{
            // console.log('isNotProficient', skill)
            return 0
        }
    }

    useEffect(() => {
        // const labels = document.querySelectorAll('.skill_label label')
        // const skills = Array.from(labels).map(label => label.textContent)
        // console.log(skills)
        decideProficiency('e', 'Arcana')
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
                <strong>Acrobatics: </strong>
                {parseInt(decideProficiency('Acrobatics')) + fetchData.mods.dex}
            </p>

            <p>
                <strong>AnimalHandling: </strong>
                {parseInt(decideProficiency('Animal Handling')) + fetchData.mods.wis}
            </p>

            <p>
                <strong>Arcana: </strong>
                {parseInt(decideProficiency('Arcana')) + fetchData.mods.int}
            </p>

            <p>
                <strong>Athletics: </strong>
                {parseInt(decideProficiency('Athletics')) + fetchData.mods.str}
            </p>

            <p>
                <strong>Deception: </strong>
                {parseInt(decideProficiency('Deception')) + fetchData.mods.cha}
            </p>

            <p>
                <strong>History: </strong>
                {parseInt(decideProficiency('History')) + fetchData.mods.int}
            </p>

            <p>
                <strong>Insight: </strong>
                {parseInt(decideProficiency('Insight')) + fetchData.mods.wis}
            </p>

            <p>
                <strong>Intimidation: </strong>
                {parseInt(decideProficiency('Intimidation')) + fetchData.mods.cha}
            </p>

            <p>
                <strong>Investigation: </strong>
                {parseInt(decideProficiency('Investigation')) + fetchData.mods.int}
            </p>

            <p>
                <strong>Medicine: </strong>
                {parseInt(decideProficiency('Medicine')) + fetchData.mods.wis}
            </p>

            <p>
                <strong>Nature: </strong>
                {parseInt(decideProficiency('Nature')) + fetchData.mods.int}
            </p>

            <p>
                <strong>Perception: </strong>
                {parseInt(decideProficiency('Perception')) + fetchData.mods.wis}
            </p>

            <p>
                <strong>Performance: </strong>
                {parseInt(decideProficiency('Performance')) + fetchData.mods.cha}
            </p>

            <p>
                <strong>Persuassion: </strong>
                {parseInt(decideProficiency('Persuassion')) + fetchData.mods.cha}
            </p>

            <p>
                <strong>Religion: </strong>
                {parseInt(decideProficiency('Religion')) + fetchData.mods.int}
            </p>

            <p>
                <strong>Slight Of Hand: </strong>
                {parseInt(decideProficiency('Slight Of Hand')) + fetchData.mods.dex}
            </p>

            <p>
                <strong>Stealth: </strong>
                {parseInt(decideProficiency('Stealth')) + fetchData.mods.dex}
            </p>

            <p>
                <strong>Survival: </strong>
                {parseInt(decideProficiency('Survival')) + fetchData.mods.wis}
            </p>
        </div>
    )
}