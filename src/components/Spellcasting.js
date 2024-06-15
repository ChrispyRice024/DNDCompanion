import {useState, React, useRef, useEffect} from 'react'
import InfoCard from './InfoCard'

export default function Spellcating ({functions}) {

    const {character, setCharacter, fetchData} = functions

    const parentName = 'Spellcasting_infoCard'

    const [primarySpells, setPrimarySpells] = useState({})
    const [secondarySpells, setSecondarySpells] = useState({})


    useEffect(() => {
        console.log(fetchData)
    }, [fetchData])
    //Fetching Spells
    // useEffect(() => {
    //     const primaryClass = character?.class?.primary?.url
    //     const secondaryClass = character?.class?.secondary?.url
    //     if(primaryClass){
    //         fetch(`https://www.dnd5eapi.co${primaryClass}/spells`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log('Spellcasting.js', {data})
    //             setCharacter(prevCharacter => ({
    //                 ...prevCharacter,
    //                 class:{
    //                     ...prevCharacter.class,
    //                     primary:{
    //                         ...prevCharacter.class.primary,
    //                        combat:{
    //                             ...prevCharacter.class.primary.combat,
    //                             spellcasting:{
    //                                 ...prevCharacter.class.primary.combat.spellcasting,
    //                                 spellList:data
    //                             }
    //                         } 
    //                     }
                        
    //                 }
    //             }))
    //             setPrimarySpells(
    //                 {
    //                     cantrips:{
    //                         spells:data.results.filter(obj => obj.level === 0)
    //                     },
    //                     level_1:{
    //                         spells:data.results.filter(obj => obj.level === 1)
    //                     }
    //                 }
    //             )
    //             // console.log(data)
    //         })
    //     }

    //     if(secondaryClass){
    //         console.log('hello')
    //         fetch(`https://www.dnd5eapi.co${secondaryClass}/spells`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log({data})
    //             setCharacter(prevCharacter => ({
    //                 ...prevCharacter,
    //                 class:{
    //                     ...prevCharacter.class,
    //                     secondary:{
    //                         ...prevCharacter.class.secondary,
    //                        combat:{
    //                             ...prevCharacter.class.secondary.combat,
    //                             spellcasting:{
    //                                 ...prevCharacter.class.secondary.combat.spellcasting,
    //                                 spellList:data
    //                             }
    //                         } 
    //                     }
                        
    //                 }
    //             }))
    //             console.log(character?.class?.secondary?.combat?.spellcasting)
    //             setSecondarySpells(
    //                 {
    //                     cantrips:{
    //                         spells:data.results.filter(obj => obj.level === 0)
    //                     },
    //                     level_1:{
    //                         spells:data.results.filter(obj => obj.level === 1)
    //                     }
    //                 }
    //             )
    //             // console.log(data)
    //         })
    //     }
        
    // }, [character?.class?.primary?.className, character?.class?.secondary?.className])

    // useEffect(() => {
    //   const fetchPrimaryData = async () => {
    //     try{
    //         const res = await fetch(`https://www.dnd5eapi.co/api/classes/${character.class.primary.classIndex}/levels/1`)
    //         const data = await res.json()
    //         setCharacter((prevCharacter) => ({
    //             ...prevCharacter,
    //             class:{
    //                 ...prevCharacter.class,
    //                 primary:{
    //                     ...prevCharacter.class.primary,
    //                     combat:{
    //                         ...prevCharacter.class.primary.combat,
    //                         spellcasting:{
    //                             ...prevCharacter.class.primary.combat.spellcasting,
    //                             [character.class.primary.classIndex]: data.spellcasting
    //                         }
    //                     }
    
    //             }
                
    //             }
    //         }))
    //         console.log('primary')
    //         console.log(data.spellcasting)
    //     }catch(err){
    //         console.error(err)
    //     }
    //   }
    //   if(character.class.primary.className){
    //     fetchPrimaryData()
    //   }
        
      
    // }, [primarySpells])

    // useEffect(() => {
    //     const fetchSecondaryData = () => {
        
    //         try{
    //             const res = fetch(`https://www.dnd5eapi.co/api/classes/${character.class.secondary.classIndex}/levels/1`)
    //             const data = res.json()
    
    //             setCharacter((prevCharacter) => ({
    //                 ...prevCharacter,
    //                 class:{
    //                     ...prevCharacter.class,
    //                     secondary:{
    //                         ...prevCharacter.class.secondary,
    //                         combat:{
    //                             ...prevCharacter.class.secondary.combat,
    //                             spellcasting:{
    //                                 ...prevCharacter.class.secondary.combat.spellcasting,
    //                                 [character.class.secondary.classIndex]: data.spellcasting
    //                             }
    //                         }
        
    //                 }
                    
    //                 }
    //             }))
    //             console.log('secondary')
    //         }catch(err){
    //             console.error(err)
    //         }
    //       }
    //       if(character.class.secondary.className){
    //         fetchSecondaryData()
    //       }
        
    // },[secondarySpells])

    const [primarySpellsInfoDiv, setPrimarySpellsInfoDiv] = useState()
    const [primaryLearnableSpellsDiv, setPrimaryLearnableSpellsDiv] = useState()

    const [secondarySpellsInfoDiv, setSecondarySpellsInfoDiv] = useState()
    const [secondaryLearnableSpellsDiv, setSecondaryLearnableSpellsDiv] = useState()

    const [chosenCantripPrimary, setChosenCantripPrimary] = useState([])
    const [chosenSpellPrimary, setChosenSpellPrimary] = useState([])

    const [chosenCantripSecondary, setChosenCantripSecondary] = useState([])
    const [chosenSpellSecondary, setChosenSpellSecondary] = useState([])

    const [isHovering, setIsHovering] = useState(null)
    const [event, setEvent] = useState(null)
    const [spawnCount, setSpawnCount] = useState(0)
    const [key, setKey] = useState(null)
    const [hoveredKey, setHoveredKey] = useState(null)
    const [className, setClassName] = useState('')

    const debounceTimeout = useRef(null)

    const handleMouseOver = (e, key) => {

        setIsHovering(true)
        setEvent(e)
        setKey(key)
        setHoveredKey(key)

        console.log('hello')
    }

    const handleMouseOut = (e) => {

            setIsHovering(false)
            setEvent(null)
            setSpawnCount((prevCount) => prevCount+1)

    }

    // useEffect(() => {
    //     console.log(event?.target)
    //     console.log(isHovering)
    //     console.log(hoveredKey)
    // })
    // useEffect(() => {

    //     if(spawnCount > 5){
    //         setTimeout(() => setSpawnCount(0), 2000)
    //     }
    // }, [spawnCount])

    // useEffect(() => {
    //     const primarySpellcasting = character?.class?.primary?.combat?.spellcasting
    //     const secondarySpellcasting = character?.class?.secondary?.combat?.spellcasting
    //     const firstLevel = primarySpells.level_1
    //     const cantrips = primarySpells.cantrips
    //     const primaryMaxCantrips = 3
    //     const primaryMaxSpells = 2
    //     const secondaryMaxCantrips = 3
    //     const secondaryMaxSpells = 2

    //     if(primarySpellcasting?.info){
    //         setPrimarySpellsInfoDiv(
    //             <div>
    //                 {primarySpellcasting.info.map((info, i) => (
    //                     <div key={i} id='primarySpellInfo'>
    //                         <strong>{info.name}</strong>
    //                         <p>
    //                             {info.desc}
    //                         </p>
                            
    //                     </div>
    //                 ))}
    //             </div>
    //         )

    //         setPrimaryLearnableSpellsDiv(
    //             <div>
    //                 <div>    
    //                     <div>
    //                         <strong>{character.class.primary.className} Cantrips</strong>
    //                         {primarySpells?.cantrips?.spells.map((spell, i) => {
    //                             const isChecked = chosenCantripPrimary.includes(spell.index)
    //                             const isDisabled = chosenCantripPrimary.length >= primaryMaxCantrips && !isChecked

    //                             const handleCheck = (e) => {
    //                                 const beenChecked = e.target.checked

    //                                 if(beenChecked){
                                        
    //                                     setChosenCantripPrimary((prevSpells) => [...prevSpells, spell.index])
    //                                 }else if(!beenChecked){

    //                                     setChosenCantripPrimary((prevSpells) => prevSpells.filter((x) => x !== spell.index))
    //                                 }
    //                             }

    //                             return(
    //                                 <span>
    //                                     <p key={i}>
    //                                         <input 
    //                                             type='checkbox'
    //                                             name={spell.name}
    //                                             onChange={handleCheck}
    //                                             disabled={isChecked ? false : isDisabled}
    //                                         />
    //                                         <label key={`primaryCantrip_${i}`} htmlFor={spell.name} onMouseOver={(e) => handleMouseOver(e, `primaryCantrip_${i}`)} onMouseOut={handleMouseOut} data-url={spell.url}><strong>{spell.name}</strong></label>
    //                                     </p>

    //                                     {isHovering && event && hoveredKey === `primaryCantrip_${i}` ? 
                                            
    //                                         <InfoCard functions={{
    //                                             character:character, 
    //                                             event:event, 
    //                                             isHovering:isHovering, 
    //                                             spawnCount:spawnCount, 
    //                                             setSpawnCount:setSpawnCount, 
    //                                             className:hoveredKey,
    //                                             parentName:parentName,
    //                                             hoveredKey:hoveredKey,
    //                                             url:spell.url}} /> 
    //                                              : ''}
    //                                 </span>
    //                             )
    //                         })}
    //                     </div>
    //                     <div>
    //                         <strong>{character.class.primary.className} Level 1 Spells</strong>
    //                         {primarySpells?.level_1?.spells.map((spell, i) => {
    //                             const isChecked = chosenSpellPrimary.includes(spell.index)
    //                             const isDisabled =chosenSpellPrimary.length >= primaryMaxSpells && !isChecked
                                
    //                             const handleCheck = (e) => {
    //                                 const beenChecked = e.target.checked

    //                                 if(beenChecked){

    //                                     setChosenSpellPrimary((prevSpell) => [...prevSpell, spell.index])
    //                                 }else if(!beenChecked){
    //                                     setChosenSpellPrimary((prevSpell) => prevSpell.filter((x) => x !== spell.index))
    //                                 }
    //                             }

    //                             return(
    //                                 <p key={i}>
    //                                     <input 
    //                                         type='checkbox'
    //                                         data-url={spell.url}
    //                                         name={spell.name}
    //                                         onChange={handleCheck}
    //                                         disabled={isChecked ? false : isDisabled}
    //                                     />
    //                                     <label key={`primarySpell_${i}`} htmlFor={spell.name} onMouseOver={(e) => handleMouseOver(e, `primarySpell_${i}`)} onMouseOut={handleMouseOut} data-url={spell.url}><strong>{spell.name}</strong></label>
    //                                     {isHovering && event && hoveredKey === `primarySpell_${i}` ? 
                                            
    //                                         <InfoCard functions={{
    //                                             character:character, 
    //                                             event:event, 
    //                                             isHovering:isHovering, 
    //                                             spawnCount:spawnCount, 
    //                                             setSpawnCount:setSpawnCount, 
    //                                             className:hoveredKey,
    //                                             parentName:parentName,
    //                                             hoveredKey:hoveredKey,
    //                                             url:spell.url}} /> 
    //                                              : ''}
    //                                 </p>
    //                             )
    //                         }
    //                         )}
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     }
    //         if(secondarySpellcasting?.info){

    //             setSecondarySpellsInfoDiv(
    //                 <div>
    //                     {secondarySpellcasting.info.map((info, i) => (
    //                         <div key={i} id='secondarySpellInfo'>
    //                             <strong>{info.name}</strong>
    //                             <p>
    //                                 {info.desc}
    //                             </p>
    //                         </div>
    //                     ))}
    //                 </div>
    //             )
    
    //             setSecondaryLearnableSpellsDiv(
    //                     <div>    
    //                         <div>
    //                             <strong>{character.class.secondary.className} Cantrips</strong>
    //                             {secondarySpells?.cantrips?.spells.map((spell, i) => {
    //                                 const isChecked = chosenCantripPrimary.includes(spell.index)
    //                                 const isDisabled = chosenCantripPrimary.length >= secondaryMaxCantrips && !isChecked
    
    //                                 const handleCheck = (e) => {
    //                                     const beenChecked = e.target.checked
    
    //                                     if(beenChecked){
                                            
    //                                         setChosenCantripSecondary((prevSpells) => [...prevSpells, spell.url])
    //                                     }else if(!beenChecked){
    
    //                                         setChosenCantripSecondary((prevSpells) => prevSpells.filter((x) => x !== spell.url))
    //                                     }
    //                                 }
    
    //                                 return(
    //                                     <p key={i}>
    //                                         <input 
    //                                             type='checkbox'
    //                                             data-url={spell.url}
    //                                             name={spell.name}
    //                                             onChange={handleCheck}
    //                                             disabled={isChecked ? false : isDisabled}
    //                                         />
    //                                         <label htmlFor={spell.name}><strong>{spell.name}</strong></label>
    //                                     </p>
    //                                 )
    //                             })}
    //                         </div>
    //                         <div>
    //                             <strong>{character.class.secondary.className} Level 1 Spells</strong>
    //                             {secondarySpells?.level_1?.spells.map((spell, i) => {
    //                                 const isChecked = chosenSpellSecondary.includes(spell.index)
    //                                 const isDisabled =chosenSpellSecondary.length >= secondaryMaxSpells && !isChecked
                                    
    //                                 const handleCheck = (e) => {
    //                                     const beenChecked = e.target.checked
    
    //                                     if(beenChecked){
    
    //                                         setChosenSpellSecondary((prevSpell) => [...prevSpell, spell.index])
    //                                     }else if(!beenChecked){
    //                                         setChosenSpellSecondary((prevSpell) => prevSpell.filter((x) => x !== spell.index))
    //                                     }
    //                                 }
    
    //                                 return(
    //                                     <p key={i}>
    //                                         <input 
    //                                             type='checkbox'
    //                                             data-url={spell.url}
    //                                             name={spell.name}
    //                                             onChange={handleCheck}
    //                                             disabled={isChecked ? false : isDisabled}
    //                                         />
    //                                         <label htmlFor={spell.name}><strong>{spell.name}</strong></label>
    //                                     </p>
    //                                 )
    //                             }
    //                             )}
    //                         </div>
    //                     </div>
    //             )
    //         }
            
        
    // }, [character, primarySpells, secondarySpells, chosenCantripPrimary, chosenSpellPrimary, chosenCantripSecondary, chosenSpellPrimary, isHovering])

    // if(fetchData.primary_class){
        // setPrimarySpellsInfoDiv(
        //     <div>
        //         {fetchData.primary_class.spellcasting.info.map((item, i) => {
        //             return(
        //                 <div>
        //                     <p>
        //                         {item.name}
        //                     </p>
        //                     <p>
        //                         {item.desc}
        //                     </p>
        //                 </div>
        //             )
        //         })}
        //     </div>
        // )
    // }
    return(
        <div>
            <div>
                {fetchData.primary_class.spellcasting.info.map((item, i) => {
                    return(
                        <div>
                            <p>
                                <strong>{item.name}</strong>
                            </p>
                            <p>
                                {item.desc}
                            </p>
                        </div>
                    )
                })}
            </div>
            <div>
                {/* {fetchData} */}
            </div>
        </div>
    )
}