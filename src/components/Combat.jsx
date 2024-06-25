import React from 'react'
import {useState, useEffect} from 'react'

export default function Combat ({functions}) {

const {setCharacter, character, sendCharacter} = functions

    const handleResistChange = (i, value) => {

        setCharacter((prevCharacter => {
        
            const updatedResistances = [...prevCharacter.combat.resistances]
            updatedResistances[i] = value
            return{...prevCharacter, combat:{...prevCharacter.combat, resistances:updatedResistances}}
        }))
    }

    const handleAdd = (e) => {
        e.preventDefault()

        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            combat:{
                ...prevCharacter.combat,
                resistances: [...prevCharacter.combat.resistances, '']
            }
        }))
    }
    
    const handleChange = (e) => {
        const statValue = parseInt(e.target.value, 10)

        setCharacter(prevCharacter => ({
            ...prevCharacter,
            combat: {
                ...prevCharacter.combat,
                [e.target.name]: statValue
            }
        }))
    }

    return(
        <div>
            <h2>Combat</h2>
            <p>
                <label htmlFor='hp'>HP</label>
                <input name='hp' type='number' onChange={handleChange} placeholder='Max Hit Points'/>
            </p>
            <p>
                <label htmlFor='ac'>Armor Class</label>
                <input name='ac' type="number" onChange={handleChange} defaultValue='0'/>
            </p>
            <p>
                <label htmlFor='proBonus'>Proficiency Bonus</label>
                <input name='proBonus' type='number' onChange={handleChange} defaultValue='0'/>
            </p>
            <p>
                <label htmlFor='initBonus'>Initiative Bonus</label>
                <input name='initBonus' type='number' onChange={handleChange} defaultValue='0'/>
            </p>
            <p>
                <label htmlFor='speed'>Speed</label>
                <input name='speed' type='number' onChange={handleChange} defaultValue='0'/>
            </p>
            <p>
                <label htmlFor='atkPerRound'>Attacks Per Round</label>
                <input name='atkPerRound' type='number' onChange={handleChange} defaultValue='0'/>
            </p>
            <p id='resistList'>
                <label htmlFor='resist'>Resistances</label>
                {/* <input name='resist' type='text' onChange={handleChange} placeholder='Resistances'/> */}
                <span id='newResistList'>
                    {character?.combat?.resistances?.map((resist, i) => (
                        <input
                            key={i}
                            type='text'
                            onChange={(e) => handleResistChange(i, e.target.value)}
                            placeholder='Resistance'
                            />
                            
                    ))}
                </span>
                <button name='addButton' onClick={handleAdd}>Add Resistance</button>
            </p>
        </div>
    )
}