import {useState, React, useEffect} from 'react'

export default function Spellcating ({functions}) {

    const {character, setCharacter} = functions

    const [primarySpells, setPrimarySpells] = useState({})
    const [secondarySpells, setSecondarySpells] = useState({})
    //Fetching Spells
    useEffect(() => {
        const primaryClass = character?.class?.primary?.url
        const secondaryClass = character?.class?.secondary?.url
        if(primaryClass){
            fetch(`https://www.dnd5eapi.co${primaryClass}/spells`)
            .then(res => res.json())
            .then(data => {
                console.log({data})
                setCharacter(prevCharacter => ({
                    ...prevCharacter,
                    class:{
                        ...prevCharacter.class,
                        primary:{
                            ...prevCharacter.class.primary,
                           combat:{
                                ...prevCharacter.class.primary.combat,
                                spellcasting:{
                                    ...prevCharacter.class.primary.combat.spellcasting,
                                    spellList:data
                                }
                            } 
                        }
                        
                    }
                }))
                setPrimarySpells(
                    {
                        cantrips:{
                            spells:data.results.filter(obj => obj.level === 0)
                        },
                        level_1:{
                            spells:data.results.filter(obj => obj.level === 1)
                        }
                    }
                )
                console.log(data)
            })
        }

        if(secondaryClass){
            fetch(`https://www.dnd5eapi.co${secondaryClass}/spells`)
            .then(res => res.json())
            .then(data => {
                console.log({data})
                setCharacter(prevCharacter => ({
                    ...prevCharacter,
                    class:{
                        ...prevCharacter.class,
                        secondary:{
                            ...prevCharacter.class.secondary,
                           combat:{
                                ...prevCharacter.class.secondary.combat,
                                spellcasting:{
                                    ...prevCharacter.class.secondary.combat.spellcasting,
                                    spellList:data
                                }
                            } 
                        }
                        
                    }
                }))
                setSecondarySpells(
                    {
                        cantrips:{
                            spells:data.results.filter(obj => obj.level === 0)
                        },
                        level_1:{
                            spells:data.results.filter(obj => obj.level === 1)
                        }
                    }
                )
                console.log(data)
            })
        }
        
    }, [character.class.primary.className, character.class.secondary.className])

    //Spell divs
useEffect(() => {
    console.log({primarySpells})
}, [character])

    const [primarySpellsInfoDiv, setPrimarySpellsInfoDiv] = useState()
    const [primaryLearnableSpellsDiv, setPrimaryLearnableSpellsDiv] = useState()

    const [chosenCantripPrimary, setChosenCantripPrimary] = useState([])
    const [chosenSpellPrimary, setChosenSpellPrimary] = useState([])
    useEffect(() => {
        const primarySpellcasting = character?.class?.primary?.combat?.spellcasting
        const secondarySpellcasting = character?.class?.secondary?.combat?.spellcasting
        const firstLevel = primarySpells.level_1
        const cantrips = primarySpells.cantrips
        const primaryMaxCantrips = 3
        const primaryMaxSpells = 2
        
        if(primarySpellcasting.info){
            setPrimarySpellsInfoDiv(
                <div>
                    {primarySpellcasting.info.map((info, i) => (
                        <div id='primarySpellInfo'>
                            <strong>{info.name}</strong>
                            <p>
                                {info.desc}
                            </p>
                            
                        </div>
                    ))}
                </div>
            )

            setPrimaryLearnableSpellsDiv(
                <div>
                    <div>    
                        <div>
                            <strong>Cantrips</strong>
                            {primarySpells?.cantrips?.spells.map((spell, i) => {
                                const isChecked = chosenCantripPrimary.includes(spell.index)
                                const isDisabled = chosenCantripPrimary.length >= primaryMaxCantrips && !isChecked

                                const handleCheck = (e) => {
                                    const beenChecked = e.target.checked

                                    if(beenChecked){
                                        
                                        setChosenCantripPrimary((prevSpells) => [...prevSpells, spell.index])
                                    }else if(!beenChecked){

                                        setChosenCantripPrimary((prevSpells) => prevSpells.filter((x) => x !== spell.index))
                                    }
                                }

                                return(
                                    <p>
                                        <input 
                                            type='checkbox'
                                            name={spell.name}
                                            onChange={handleCheck}
                                            disabled={isChecked ? false : isDisabled}
                                        />
                                        <label htmlFor={spell.name}><strong>{spell.name}</strong></label>
                                    </p>
                                )
                            })}
                        </div>
                        <div>
                            <strong>Level 1 Spells</strong>
                            {primarySpells?.level_1?.spells.map((spell, i) => {
                                const isChecked = chosenSpellPrimary.includes(spell.index)
                                const isDisabled =chosenSpellPrimary.length >= primaryMaxSpells && !isChecked
                                
                                const handleCheck = (e) => {
                                    const beenChecked = e.target.checked

                                    if(beenChecked){

                                        setChosenSpellPrimary((prevSpell) => [...prevSpell, spell.index])
                                    }else if(!beenChecked){
                                        setChosenSpellPrimary((prevSpell) => prevSpell.filter((x) => x !== spell.index))
                                    }
                                }

                                return(
                                    <p>
                                        <input 
                                            type='checkbox'
                                            name={spell.name}
                                            onChange={handleCheck}
                                            disabled={isChecked ? false : isDisabled}
                                        />
                                        <label htmlFor={spell.name}><strong>{spell.name}</strong></label>
                                    </p>
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>
            )
        }
        console.log(primarySpellcasting)
        console.log({chosenCantripPrimary})
        console.log({chosenSpellPrimary})
    }, [character, chosenCantripPrimary, chosenSpellPrimary])
    return(
        <div>
            <div>
                {primarySpellsInfoDiv}
            </div>
            <div>
                {primaryLearnableSpellsDiv}
            </div>
            
        </div>
    )
}