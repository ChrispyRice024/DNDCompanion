import {useState, React, useRef, useEffect} from 'react'
import InfoCard from './InfoCard'

export default function Spellcating ({functions}) {

    const {character, setCharacter, fetchData, setFetchData} = functions

    const parentName = 'spells'

    const [isHovering, setIsHovering] = useState(null)
    const [event, setEvent] = useState(null)
    const [spawnCount, setSpawnCount] = useState(0)
    const [key, setKey] = useState(null)
    const [hoveredKey, setHoveredKey] = useState(null)
    const [className, setClassName] = useState('')

    const handleMouseOver = (e, key) => {

        setIsHovering(true)
        setEvent(e)
        setKey(key)
        setHoveredKey(key)
        console.log(key)
        console.log('hello')
    }

    const handleMouseOut = (e) => {

        setIsHovering(false)
        setEvent(null)
        setSpawnCount((prevCount) => prevCount+1)

    }

    const handleCheck = (e, level) => {
        const beenChecked = e.target.checked
        
        if(beenChecked){

            console.log(e.target)
            setFetchData(prevData => ({
                ...prevData,
                primary_class: {
                    ...prevData.primary_class,
                    chosen_spells:{
                        ...prevData.primary_class.chosen_spells,
                        [`spell_${level}`]:[
                            ...(prevData?.primary_class?.chosen_spells[`spell_${level}`] || []),
                            {
                                url:e.target.getAttribute('data-url'),
                                index:e.target.name
                            }
                        ]
                    }
                }
            }))
            
            
        }else if (!beenChecked){
            console.log('unchecked')
            setFetchData((prevData) => ({
                ...prevData,
                primary_class:{
                    ...prevData.primary_class,
                    chosen_spells:{
                        ...prevData.primary_class.chosen_spells,
                        [`spell_${level}`]:[
                            ...prevData.primary_class.chosen_spells[`spell_${level}`].filter((x) => x.index !== e.target.name)
                        ]
                    }
                }
            }))
            console.log(fetchData.primary_class.chosen_spells)
        }
        
    }

    return(
        <div>
            <div>
                
                {fetchData?.primary_class?.spellcasting?.info?.map((item, i) => {
                    return(
                        <div key={i}>
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
                {/* CANTRIPS */}
                <h3>Cantrips</h3>
                {fetchData?.primary_class?.spells?.level_0_spells?.map((spell, i) => {
                    // console.log(spell)
                    const maxCantrips = fetchData?.primary_class?.level_data[0]?.spellcasting?.cantrips_known
                    console.log(maxCantrips)
                    const chosenSpell = (fetchData?.primary_class.chosen_spells)
                    const isChecked = chosenSpell?.some(obj => obj.index === spell.index)
                    const isDisabled = chosenSpell?.length >= maxCantrips && !isChecked
                    console.log(spell.level)
// console.log(spell.index)
                    

                    return(
                        <div key={i}>
                            <p>
                                <input
                                    type='checkbox'
                                    name={spell.index}
                                    className='spells'
                                    onChange={(e) => {handleCheck(e, spell.level)}}
                                    disabled={isChecked ? false : isDisabled}
                                    data-url={spell.url}
                                    />
                                <label onMouseOver={(e) => {handleMouseOver(e, `primary_spell_${i}`)}} onMouseOut={handleMouseOut} htmlFor={spell.index}>{spell.name}</label>
                            </p>
                            {isHovering && hoveredKey === `primary_spell_${i}` ?
                                <InfoCard
                                functions={{
                                    fetchData: fetchData,
                                    event: event,
                                    isHovering: isHovering,
                                    spawnCount: spawnCount,
                                    setSpawnCount: setSpawnCount,
                                    className: hoveredKey,
                                    hoveredKey: hoveredKey,
                                    url: spell.url,
                                    parentName: parentName,
                            }}/>
                            : ''} 
                            
                        </div>
                        
                    )
                })}
                <h3>Level 1</h3>
                {fetchData?.primary_class?.spells?.level_1_spells?.map((spell, i) => {
                    // console.log(spell)
                    const maxSpells = fetchData.primary_class.level_data[0].spellcasting.spells_known
                    const chosenSpell = (fetchData?.primary_class.chosen_spells)
                    const isChecked = chosenSpell?.some(obj => obj.index === spell.index)
                    const isDisabled = chosenSpell?.length >= maxSpells && !isChecked
                    
// console.log(spell.index)
                    const handleCheck = (e) => {
                        const beenChecked = e.target.checked

                        if(beenChecked){
                            // console.log(spell.name)
                            // console.log(spell)
                            console.log(e.target)
                            setFetchData(prevData => ({
                                ...prevData,
                                primary_class: {
                                    ...prevData.primary_class,
                                    chosen_spells:[
                                            ...(prevData.primary_class.chosen_spells || []),
                                        {
                                            url:e.target.getAttribute('data-url'),
                                            index:e.target.name
                                        }    
                                    ]
                                }
                            }))
                            
                        }else if (!beenChecked){
                            console.log('unchecked')
                            setFetchData((prevData) => ({
                                ...prevData,
                                primary_class:{
                                    ...prevData.primary_class,
                                    chosen_spells:[
                                        ...prevData.primary_class.chosen_spells.filter((x) => x.index !== e.target.index)
                                    ]
                                }
                            }))
                            console.log(fetchData.primary_class.chosen_spells)
                        }
                        
                    }

                    return(
                        <div key={i}>
                            <p>
                                <input
                                    type='checkbox'
                                    name={spell.index}
                                    className='spells'
                                    onChange={handleCheck}
                                    disabled={isChecked ? false : isDisabled}
                                    data-url={spell.url}
                                    />
                                <label onMouseOver={(e) => {handleMouseOver(e, `primary_spell_${i}`)}} onMouseOut={handleMouseOut} htmlFor={spell.index}>{spell.name}</label>
                            </p>
                            {/* {isHovering && hoveredKey === `primary_spell_${i}` ?
                                <InfoCard
                                functions={{
                                    fetchData: fetchData,
                                    event: event,
                                    isHovering: isHovering,
                                    spawnCount: spawnCount,
                                    setSpawnCount: setSpawnCount,
                                    className: hoveredKey,
                                    hoveredKey: hoveredKey,
                                    url: spell.url,
                                    parentName: parentName,
                            }}/>
                            : ''} */}
                            
                        </div>
                        
                    )
                })}
                    
                
            </div>
        </div>
    )
}