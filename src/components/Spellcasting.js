import {useState, React, useRef, useEffect} from 'react'
import InfoCard from './InfoCard'

export default function Spellcating ({functions}) {

    const {fetchData, setFetchData} = functions

    const parentName = 'spells'

    const [isHovering, setIsHovering] = useState(null)
    const [event, setEvent] = useState(null)
    const [spawnCount, setSpawnCount] = useState(0)
    const [key, setKey] = useState(null)
    const [hoveredKey, setHoveredKey] = useState(null)
    const [className, setClassName] = useState('')

    const isHidden = fetchData?.primary_class && Object.keys(fetchData?.primary_class?.spells).length > 0 ? 'default' : 'none'

    const determineMaxSpells = (charClass) => {
        if(charClass === 'Wizard'){
            return 6
        }else if(charClass === 'Sorcerer'){
            return 2
        }else if(charClass === 'Cleric' || charClass === 'Druid'){
            return(fetchData?.mods?.wis)
        }else if(charClass === 'Paladin'){
            return ('isPaladin')
        }else if(charClass === 'Warlock'){
            return 2
        }else if(charClass === 'Ranger'){
            return 2
        }else if(charClass === 'Bard'){
            return 4
        }
    }

    const handleMouseOver = (e, key) => {

        setIsHovering(true)
        setEvent(e)
        setKey(key)
        setHoveredKey(key)
        console.log(key)
    }

    const handleMouseOut = (e) => {

        setIsHovering(false)
        setEvent(null)
        setSpawnCount((prevCount) => prevCount+1)

    }

    console.log(fetchData?.primary_class?.level_data[0]?.spellcasting)

    const handleCheck = (e, level) => {
        const beenChecked = e.target.checked
        
        if(beenChecked){

            setFetchData(prevData => ({
                ...prevData,
                primary_class: {
                    ...prevData.primary_class,
                    chosen_spells:{
                        ...prevData.primary_class.chosen_spells,
                        [`spell_${level}`]:[
                            ...(prevData?.primary_class?.chosen_spells?.[`spell_${level}`] || []),
                            {
                                url:e.target.getAttribute('data-url'),
                                index:e.target.name
                            }
                        ]
                    }
                }
            }))
            
            
        }else if (!beenChecked){
            console.log(e.target.name)
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
        }
        
    }
// 
    return(
        <div id='spellcasting_parent' style={{display:isHidden}} >
            <div id='spell_info'>
                {console.log(fetchData?.primary_class?.spellcasting?.info)}
                {fetchData?.primary_class?.spellcasting?.info?.map((item, i) => {
                    return(
                        <div className='spell_info_item' key={i}>
                            <div className='spell_title'>
                                <strong>{item.name}</strong>
                            </div>
                            <p>
                                {item.desc}
                            </p>
                        </div>
                    )
                })}
            </div>
            <div className='spell_info'>
                {fetchData?.primary_class?.features?.map((feature, i) => {
                    return(
                        <div key={i} className='spell_info_item'>  
                        <div className='spell_title'>
                            <strong>{feature.name}</strong>
                        </div>
                        {feature?.desc?.map((desc, i) => 
                            <p>
                                {desc}
                            </p>
                        )}
                    </div>
                    )
                })}
                <div id='spell_slots'>
                    {/* {console.log(Object.keys(fetchData.primary_class?.level_data[0]?.spellcasting))} */}
                    {fetchData?.primary_class?.level_data[0]?.spellcasting ?
                        Object.entries(fetchData?.primary_class?.level_data[0]?.spellcasting).map(([key, value], i) => {
                            if(value !== 0){

                                const entries = Object.entries(fetchData.primary_class?.level_data[0]?.spellcasting)
                                const nextValue = entries[i + 1]

                                return(
                                    <span><strong style={{color:'#FFD700'}}>{key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</strong> ({value}) {nextValue[1] !== 0 ? '| ' : ''}</span>
                                    )
                        }
                        
                    }) : ''}
                </div>
            </div>

            <div id='spell_sections'>
                <div id='cantrip_section'>
                    {/* CANTRIPS */}
                    {fetchData?.primary_class?.spells?.level_0_spells?.length > 0 ?
                        <div>
                            <h3>Cantrips</h3>
                        </div>
                    :''}
                    
                    {fetchData?.primary_class?.spells?.level_0_spells?.length > 0 ? fetchData?.primary_class?.spells?.level_0_spells?.map((spell, i) => {

                        const maxCantrips = fetchData?.primary_class?.level_data[0]?.spellcasting?.cantrips_known
                        const chosenSpell = (fetchData?.primary_class?.chosen_spells?.spell_0)

                        const isChecked = chosenSpell?.some(obj => obj.index === spell.index)
                        const isDisabled = chosenSpell?.length >= maxCantrips && !isChecked
console.log('has cantrips', spell)
                        
                        return(
                            <div id='cantrips' key={i}>
                                <p className='spell'>
                                    <input
                                        type='checkbox'
                                        name={spell.index}
                                        className='spells'
                                        onChange={(e) => {handleCheck(e, spell.level)}}
                                        disabled={isChecked ? false : isDisabled}
                                        data-url={spell.url}
                                        />
                                    <label onMouseOver={(e) => {handleMouseOver(e, `primary_cantrip_${i}`)}} onMouseOut={handleMouseOut} htmlFor={spell.index}>{spell.name}</label>
                                </p>
                                {isHovering && hoveredKey === `primary_cantrip_${i}` ?
                                    <InfoCard
                                    functions={{
                                        hoveredKey: hoveredKey,
                                        url: spell.url,
                                }}/>
                                : ''} 
                                
                            </div>
                            
                        )
                    }) :''}
                </div>
                <div id='level_1_spells_section'>
                    <h3>Level 1</h3>
                    {fetchData?.primary_class?.spells?.level_1_spells?.map((spell, i) => {

                        const chosenSpell = (fetchData?.primary_class?.chosen_spells?.spell_1)
                        console.log(chosenSpell)
                        
                        const isChecked = chosenSpell?.some(obj => obj.index === spell.index)
                        const isDisabled = chosenSpell?.length >= determineMaxSpells(fetchData?.primary_class?.name) && !isChecked

                        return(
                            <div id='spells' key={i}>
                                {fetchData?.primary_class?.name === 'Paladin' ?
                                    <p className='spell'>
                                        <label onMouseOver={(e) => {handleMouseOver(e, `primary_spell_${i}`)}} onMouseOut={handleMouseOut} htmlFor={spell.index}>{spell.name}</label>
                                    </p>
                                :
                                <p className='spell'>
                                    <input
                                        type='checkbox'
                                        name={spell.index}
                                        className='spells'
                                        onChange={(e) => {handleCheck(e, spell.level)}}
                                        disabled={isChecked ? false : isDisabled}
                                        data-url={spell.url}
                                        />
                                    <label onMouseOver={(e) => {handleMouseOver(e, `primary_spell_${i}`); console.log(e.target)}} onMouseOut={handleMouseOut} htmlFor={spell.index}>{spell.name}</label>
                                </p>} 
                                {isHovering && hoveredKey === `primary_spell_${i}` ?
                                    <InfoCard
                                    functions={{
                                        hoveredKey: hoveredKey,
                                        url: spell.url,
                                }}/>
                                : ''}
                            
                            </div>
                            
                        )
                    })}
                </div>
                
            </div>
        </div>
    )
}

