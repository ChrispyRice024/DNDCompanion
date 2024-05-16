import {useState, React, useEffect} from 'react'

export default function Spellcating ({functions}) {

    const {character, setCharacter} = functions
console.log('hello')
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
                console.log(data)
            })
        }
        
    }, [character.class.primary.className, character.class.secondary.className])

    useEffect(() => {
        const primarySpellcasting = character?.class?.primary?.combat?.spellcasting
        const secondarySpellcasting = character?.class?.secondary?.combat?.spellcasting
    }, [character])
    return(
        <div>

        </div>
    )
}