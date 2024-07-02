import React from 'react'
import {useState, useEffect} from 'react'

export default function Combat ({functions}) {

const {setCharacter, character, sendCharacter, fetchData} = functions

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

    const decideHP = () => {
        return (parseInt(fetchData?.primary_class?.hit_die) + parseInt(fetchData?.mods?.con))
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
                <strong>HP: </strong>
                {/* <input name='hp' type='number' onChange={handleChange} placeholder='Max Hit Points'/> */}
                {fetchData?.primary_class?.name ? parseInt(fetchData?.primary_class?.hit_die) + parseInt(fetchData?.mods?.con) : <span>{fetchData?.mods?.con}</span>}
            </p>
            <p>
                <label htmlFor='ac'>Armor Class</label>
                <input name='ac' type="number" onChange={handleChange} defaultValue='0'/>
            </p>
            <p>
                <strong>Proficiency Bonus: </strong>
                {fetchData?.primary_class ? <span>{fetchData?.primary_class?.level_data[0]?.prof_bonus}</span> : '0'}
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