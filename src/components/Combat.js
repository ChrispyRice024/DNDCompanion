import React from 'react'
import {useState, useEffect} from 'react'

export default function Combat ({sendCombat}) {

    const [combat, setCombat] = useState({
        hp:'',
        ac:'',
        proBonus:'',
        initBonus:'',
        speed:'',
        atkPerRound:'',
        resistances:['']
    })

    useEffect(() => {
        sendCombat(combat)
    })

    const handleAdd = (e) => {
        e.preventDefault()

        setCombat((prevCombat) => ({
            ...prevCombat,
            resistances: [...prevCombat.resistances, '']
        }))
    }

    const handleResistChange = (i, value) => {

        setCombat((prevCombat) => {
            const updatedResistances = [...prevCombat.resistances]
            updatedResistances[i] = value
            return {...prevCombat, resistances: updatedResistances}
        })

        return false
    }

    const handleChange = (e) => {
        e.preventDefault()

        setCombat({...combat, [e.target.name]: e.target.value})
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
                    {combat.resistances.map((resist, i) => (
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