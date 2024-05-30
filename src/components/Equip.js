import {useState, React, useEffect} from 'react'
import InfoCard from './InfoCard'

export default function Equip ({functions}) {

    const {character, setCharacter} = functions

    const [primaryEquip, setPrimaryEquip] = useState([])
    const [primaryEquipOptions, setPrimaryEquipOptions] = useState([])

    const [secondaryEquip, setSecondaryEquip] = useState([])
    const [secondaryEquipOptions, setSecondaryEquipOptions] = useState([])
    

    const [isHovering, setIsHovering] = useState(null)
    const [event, setEvent] = useState(null)
    const [spawnCount, setSpawnCount] = useState(0)
    const [key, setKey] = useState(null)
    const [hoveredKey, setHoveredKey] = useState(null)
    const [className, setClassName] = useState('')

    const parentName = `Equipment_infoCard`

    const handleMouseOver = (e, key) => {

        setIsHovering(true)
        setEvent(e)
        setKey(key)
        setHoveredKey(key)
        console.log(e.target.getAttribute('data-url'))
        console.log(isHovering)
        console.log(hoveredKey)
        console.log('hello')
    }

    const handleMouseOut = (e) => {
console.log(isHovering)
            setIsHovering(false)
            setEvent(null)
            setSpawnCount((prevCount) => prevCount+1)
        console.log('goodbye')
    }
useEffect(() => {
    console.log(isHovering)
    console.log(event)
    console.log(hoveredKey)
})
    // Makes the main useEffect re-render to display the fetched data
    const [stall, setStall] = useState(0)

    //fetches the equipmet and equipment options
    useEffect(() => {
        const primaryUrl = character?.class?.primary?.url
        const secondaryUrl = character?.class?.secondary?.url

        if(primaryUrl){
            fetch(`https://www.dnd5eapi.co${primaryUrl}/starting-equipment`)
            .then((res) => res.json())
            .then((data) => {
                setPrimaryEquip(data.starting_equipment)
                setPrimaryEquipOptions(data.starting_equipment_options)
                console.log('Equip.js', {data})
            })
        }
        if(secondaryUrl){
            fetch(`https://www.dnd5eapi.co${secondaryUrl}/starting-equipment`)
            .then((res) => res.json())
            .then((data) => {
                setSecondaryEquip(data.starting_equipment)

                setSecondaryEquipOptions(data.starting_equipment_options)
                console.log({data})
            })
        }
        
    }, [character])

    useEffect(() => {
        if(stall === 1 && !(character.class.primary.className)){
            setStall(0)
        }
        console.log(stall)
    })

    const [primaryEquipDiv, setPrimaryEquipDiv] = useState()
    const [secondaryEquipDiv, setSecondaryEquipDiv] = useState()

    const [primaryOptionsDiv, setPrimaryOptionsDiv] = useState()
    const [secondaryOptionsDiv, setSecondaryOptionsDiv] = useState()

    const [chosenEquipPrimary, setChosenEquipPrimary] = useState([])
    const [chosenequipSecondary, setChosenEquipSecondary] = useState([])

    const [fetchedData, setFetchedData] = useState({})

    //sets the divs with euipment and equipment options
    useEffect(() => {

        if(primaryEquip.length > 0){

            setPrimaryEquipDiv(
                <div id='primaryEquip'>
                    <strong>{character.class.primary.className} Starting Equipment</strong>
                        {primaryEquip.map((equip, i) => (
                            <p key={i}>
                            {console.log(equip.quantity)}
                                {equip.quantity} {equip.equipment.name}
                                
                            </p>
                        ))}
                </div>
            )
        }
            //sets the options div
        if(primaryEquipOptions.length > 0){

            setPrimaryOptionsDiv(
                    <div>
                        
                        {character.class.primary.className} Equipment Options
                        {/* iterates through the main options */}
                        {primaryEquipOptions.map((option, i) => {

                            // sets chosenEquipPrimary to the chosen equipment 
                                const handleChange = async (e, url) => {                                                            
                                    try{
                                        const res = await fetch(`https://www.dnd5eapi.co${url}`)
                                        const data = await res.json()

                                        setChosenEquipPrimary((prevEquip) => {
                                            let newData = {...prevEquip}
                                            newData[e.target.name] = data
                                        
                                            return newData
                                        })
                                    }catch(err){
                                        console.error(err)
                                    }
                                }
                                // options_array is an array of 2 or more options
                            if (option.from.option_set_type === 'options_array'){

                                return(
                                    <div>
                                        pick one
                                        {
                                            
                                            option.from.options.map((choice, j) => {
                                            
                                                const letter = [
                                                    'A',
                                                    'B',
                                                    'C',
                                                    'D',
                                                    'E'
                                                ]
                                                // counted_reference has a quantity(count) and item
                                                if(choice.option_type === 'counted_reference'){

                                                    return(
                                                        <p>
                                                            <input type='radio' name={`equipOption${i}`} id={choice?.of?.index} onChange={(e) => handleChange(e, choice?.of?.url)} />
                                                            <label key={`primaryOption_${i}`} htmlFor={choice.of.name} onMouseOver={(e) => handleMouseOver(e, `primaryOption_${i}`)} onMouseOut={handleMouseOut} data-url={choice.of.url}>{letter[j]} | {choice?.count} {choice?.count > 1 ? `${choice?.of?.name}s` : choice?.of?.name}</label>
                                                            {isHovering && event && hoveredKey === `primaryOption_${i}` ? 
                                                            
                                                                <InfoCard functions={{
                                                                    character:character, 
                                                                    event:event, 
                                                                    isHovering:isHovering, 
                                                                    spawnCount:spawnCount, 
                                                                    setSpawnCount:setSpawnCount, 
                                                                    className:hoveredKey,
                                                                    parentName:parentName,
                                                                    hoveredKey:hoveredKey,
                                                                    url:choice.of.url}} /> 
                                                                    : ''}
                                                        </p>
                                                    )
                                                    // multiple has 2 or more counted_references that come together in one choice
                                                }else if(choice.option_type === 'multiple'){

                                       
                                                    return(
                                                        <p>
                                                            <input type='radio' name={`equipOption${i}`} id={choice?.of?.index} onChange={(e) => handleChange(e, choice?.of?.url)}/>
                                                            {choice.items.map((item, k) => {

                                                                return(
                                                                    <span key={k}>
                                                                        
                                                                        {item?.count} {item?.count > 1 ? `${item?.of?.name}s` : item?.of?.name} 
                                                                        {k < choice?.items?.length - 1 ? ' and ' : ''}
                                                                    </span>
                                                                )
                                                            })}
                                                        </p>
                                                    )
                                                    //choice is a list retrieved from a fetch call
                                                }else if(choice.option_type === 'choice'){
  
                                                    const url = choice.choice.from.equipment_category.url
                                                    
                                                    //the fetch call setting fetchedData with a unique key
                                                    const getData = async (url) => {
                                                        try{
                                                            
                                                                const res = await fetch(`https://www.dnd5eapi.co${choice.choice.from.equipment_category.url}`)
                                                                const data = await res.json()
                                                                setFetchedData((prevData) => ({
                                                                    ...prevData,
                                                                    [`${character.class.primary.className}_${j}_C`]: data
                                                                }))
                                                            
                                                        }catch(err){
                                                            console.error(err)
                                                        }
                                                    }
                                                    getData()
                                                
                                                    return(
                                                        <div>
                                                            <p>
                                                                or any {choice.choice.desc}
                                                            </p>
                                                            {
                                                                fetchedData[`${character?.class?.primary?.className}_${j}_C`]?.equipment.map((item, k) => {
                                                                    return(
                                                                        <p>
                                                                            <input type='radio' name={`equipOption${i}`} id={item?.index} onChange={(e) => handleChange(e, item.url)}/>
                                                                            {item.name}
                                                                        </p>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                    
                                                }
                                                
                                            })
                                        }      
                                    </div>
                                )
                                //equipment_category is a list of items from a fetch call
                            }else if(option.from.option_set_type === 'equipment_category'){
                                
                                //the fetch call sets fetchedData with a unique key
                                const getData = async () => {
                                    const url = option.from.equipment_category.url
                                    try{
                                        const res = await fetch(`https://dnd5eapi.co${url}`)
                                        const data = await res.json()

                                        setFetchedData((prevData) => ({
                                            ...prevData,
                                            [`${character.class.primary.className}_${i}_EC`]: data
                                        }))
                                    }catch(err){
                                        console.error(err)
                                    }
                                }
                                getData()
                                
                                return(
                                    <div>
                                        pick one {fetchedData[`${character.class.primary.className}_${i}_EC`]?.name}

                                        {
                                            fetchedData[`${character.class.primary.className}_${i}_EC`]?.equipment.map((item, k) => {
                                                return(
                                                    <p>
                                                        <input type='radio' name={`equipOption${i}`} id={item?.index} onChange={(e) => handleChange(e, item.url)}/>
                                                        {item.name}
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>
                                )

                            }
                        })}
                    </div>   
            )
        }

        if(secondaryEquip.length > 0){
            setSecondaryEquipDiv(
                <div>
                    <strong>{character.class.secondary.className} Starting Equipment</strong>
                            {secondaryEquip.map((equip, i) => (
                                <p key={i}>
                                {console.log(equip.quantity)}
                                    {equip.quantity} {equip.equipment.name}
                                    
                                </p>
                            ))}
                </div>
            )
        }
        if(secondaryEquipOptions.length > 0){

            setSecondaryOptionsDiv(
                <div>
                    
                    {character.class.secondary.className} Equipment Options
                    {/* iterates through the main options */}
                    {secondaryEquipOptions.map((option, i) => {
                        {console.log(option)}
                        // sets chosenEquipSecondary to the chosen equipment 
                            const handleChange = async (e, url) => {                                                            
                                try{
                                    const res = await fetch(`https://www.dnd5eapi.co${url}`)
                                    const data = await res.json()

                                    setChosenEquipSecondary((prevEquip) => {
                                        let newData = {...prevEquip}
                                        newData[e.target.name] = data
                                    
                                        return newData
                                    })
                                }catch(err){
                                    console.error(err)
                                }
                            }
                            // options_array is an array of 2 or more options
                        if (option.from.option_set_type === 'options_array'){

                            return(
                                <div>
                                    pick one
                                    {
                                        
                                        option.from.options.map((choice, j) => {
                                        
                                            const letter = [
                                                'A',
                                                'B',
                                                'C',
                                                'D',
                                                'E'
                                            ]
                                            // counted_reference has a quantity(count) and item
                                            if(choice.option_type === 'counted_reference'){

                                                return(
                                                    <p>
                                                        <input type='radio' name={`equipOption${i}`} id={choice?.of?.index} onChange={(e) => handleChange(e, choice?.of?.url)} />
                                                        {letter[j]} | {choice?.count} {choice?.count > 1 ? `${choice?.of?.name}s` : choice?.of?.name}
                                                        
                                                    </p>
                                                )
                                                // multiple has 2 or more counted_references that come together in one choice
                                            }else if(choice.option_type === 'multiple'){

                                   
                                                return(
                                                    <p>
                                                        <input type='radio' name={`equipOption${i}`} id={choice?.of?.index} onChange={(e) => handleChange(e, choice?.of?.url)}/>
                                                        {choice.items.map((item, k) => {

                                                            return(
                                                                <span key={k}>
                                                                    
                                                                    {item?.count} {item?.count > 1 ? `${item?.of?.name}s` : item?.of?.name} 
                                                                    {k < choice?.items?.length - 1 ? ' and ' : ''}
                                                                </span>
                                                            )
                                                        })}
                                                    </p>
                                                )
                                                //choice is a list retrieved from a fetch call
                                            }else if(choice.option_type === 'choice'){

                                                const url = choice.choice.from.equipment_category.url
                                                
                                                //the fetch call setting fetchedData with a unique key
                                                const getData = async (url) => {
                                                    try{
                                                        
                                                            const res = await fetch(`https://www.dnd5eapi.co${choice.choice.from.equipment_category.url}`)
                                                            const data = await res.json()
                                                            setFetchedData((prevData) => ({
                                                                ...prevData,
                                                                [`${character.class.secondary.className}_${j}_C`]: data
                                                            }))
                                                        
                                                    }catch(err){
                                                        console.error(err)
                                                    }
                                                }
                                                getData()
                                            
                                                return(
                                                    <div>
                                                        <p>
                                                            or any {choice.choice.desc}
                                                        </p>
                                                        {
                                                            fetchedData[`${character?.class?.secondary?.className}_${j}_C`]?.equipment.map((item, k) => {
                                                                return(
                                                                    <p>
                                                                        <input type='radio' name={`equipOption${i}`} id={item?.index} onChange={(e) => handleChange(e, item.url)}/>
                                                                        {item.name}
                                                                    </p>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                                
                                            }
                                            
                                        })
                                    }      
                                </div>
                            )
                            //equipment_category is a list of items from a fetch call
                        }else if(option.from.option_set_type === 'equipment_category'){
                            
                            //the fetch call sets fetchedData with a unique key
                            const getData = async () => {
                                const url = option.from.equipment_category.url
                                try{
                                    const res = await fetch(`https://dnd5eapi.co${url}`)
                                    const data = await res.json()

                                    setFetchedData((prevData) => ({
                                        ...prevData,
                                        [`${character.class.secondary.className}_${i}_EC`]: data
                                    }))
                                }catch(err){
                                    console.error(err)
                                }
                            }
                            getData()
                            
                            return(
                                <div>
                                    pick one {fetchedData[`${character.class.secondary.className}_${i}_EC`]?.name}

                                    {
                                        fetchedData[`${character.class.secondary.className}_${i}_EC`]?.equipment.map((item, k) => {
                                            return(
                                                <p>
                                                    <input type='radio' name={`equipOption${i}`} id={item?.index} onChange={(e) => handleChange(e, item.url)}/>
                                                    {item.name}
                                                </p>
                                            )
                                        })
                                    }
                                </div>
                            )

                        }
                    })}
                </div>   
        )
        }

        if(secondaryEquip.length > 0 && secondaryEquipOptions.length > 0){
        //makes the component re-render to display the fetch data after its received
            setStall(1)
        }
        
    }, [primaryEquip, primaryEquipOptions, secondaryEquip, secondaryEquipOptions])

    return(
        <div>
            <div>
                {primaryEquipDiv}
                {primaryOptionsDiv}
            </div>
            <div>
                {secondaryEquipDiv}
                {secondaryOptionsDiv}
            </div>
        </div>
    )
}