import {useRef, useState, React, useEffect} from 'react'

export default function Equip ({functions}) {

    const {character, setCharacter} = functions

    const [primaryEquip, setPrimaryEquip] = useState([])
    const [primaryEquipOptions, setPrimaryEquipOptions] = useState([])

    const [secondaryEquip, setSecondaryEquip] = useState([])
    const [secondaryEquipOptions, setSecondaryEquipOptions] = useState([])
    const [stall, setStall] = useState(0)
    

    // useEffect(() => {
        
    //     const triggerFetch = (i, url, container) => {
    //         try{
    //             const res = fetch(`${url}`)
    //             const data = res.json()
    
    //             container = data
    
    //         }catch(err){
    //             console.error(err)
    //         }    
    //     }
        
    //     triggerFetch()
    // }, [triggerRender])


    useEffect(() => {
        const primaryUrl = character?.class?.primary?.url
        const secondaryUrl = character?.class?.secondary?.url

        if(primaryUrl){
            fetch(`https://www.dnd5eapi.co${primaryUrl}/starting-equipment`)
            .then((res) => res.json())
            .then((data) => {
                setPrimaryEquip(data.starting_equipment)
                // console.log(data.starting_equipment)

                setPrimaryEquipOptions(data.starting_equipment_options)
            })
        }
        if(secondaryUrl){
            fetch(`https://www.dnd5eapi.co${secondaryUrl}/starting-equipment`)
            .then((res) => res.json())
            .then((data) => {
                setSecondaryEquip(data.starting_equipment)

                setSecondaryEquipOptions(data.starting_equipment_options)
            })
        }
        
        // console.log('primaryEquip', primaryEquip)
        // console.log('primaryEquipOptions', primaryEquipOptions)
        
    }, [character])

    const [primaryEquipDiv, setPrimaryEquipDiv] = useState()
    const [secondaryEquipDiv, setSecondaryEquipDiv] = useState()

    const [primaryOptionsDiv, setPrimaryOptionsDiv] = useState()
    const [secondaryOptionsDiv, setSecondaryOptionsDiv] = useState()

    const [chosenEquipPrimary, setChosenEquipPrimary] = useState([])
    const [chosenequipSecondary, setChosenEquipSecondary] = useState([])

    const [fetchedData, setFetchedData] = useState({})

    useEffect(() => {
        console.log('chosenEquipPrimary', chosenEquipPrimary);
    }, [chosenEquipPrimary]);

    useEffect(() => {

        console.log('primaryEquipOptions', primaryEquipOptions)
        if(primaryEquip.length > 0 && primaryEquipOptions.length > 0){

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

            
            setPrimaryOptionsDiv(
                    <div>
                        
                        {character.class.primary.className} Equipment Options

                        {primaryEquipOptions.map((option, i) => {

                            console.log('primaryEquipOptions', primaryEquipOptions)

                                const handleChange = async (e, url) => {                                                            
                                    try{
                                        const res = await fetch(`https://www.dnd5eapi.co${url}`)
                                        const data = await res.json()

                                        setChosenEquipPrimary((prevEquip) => {
                                            let newData = {...prevEquip}
                                            newData[e.target.name] = data
                                        
                                            console.log('handleChange data', e.target.id)
                                            return newData
                                        })
                                    }catch(err){
                                        console.error(err)
                                    }
                                }

                            if (option.from.option_set_type === 'options_array'){

                                return(
                                    <div>
                                        pick one
                                        {console.log(option.from.options)}
                                        {
                                            option.from.options.map((choice, j) => {
                                                console.log('choice.option_type', choice.option_type, choice?.of?.name)
                                                const letter = [
                                                    'A',
                                                    'B',
                                                    'C',
                                                    'D',
                                                    'E'
                                                ]
                                                if(choice.option_type === 'counted_reference'){

                                                    
                                                    
                                                    return(
                                                        <p>
                                                            {console.log(choice.of.url)}
                                                            <input type='radio' name={`equipOption${i}`} id={choice?.of?.index} onChange={(e) => handleChange(e, choice?.of?.url)} />
                                                            {letter[j]} | {choice?.count} {choice?.count > 1 ? `${choice?.of?.name}s` : choice?.of?.name}
                                                            
                                                        </p>
                                                    )
                                                }else if(choice.option_type === 'multiple'){
                                                    console.log(choice.items[0]?.of?.name)
                                       
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
                                                }else if(choice.option_type === 'choice'){
  
                                                    console.log('choice', choice, choice.choice.from.equipment_category.url)
                                                    const url = choice.choice.from.equipment_category.url
                                
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

                                                    console.log('fetchedData', fetchedData)
                                                
                                                    return(
                                                        <div>
                                                            <p>
                                                                or any {choice.choice.desc}
                                                            </p>
                                                            {console.log('option', primaryEquipOptions)}
                                                            {
                                                                // console.log(fetchedData[`${character.class.primary.className}_${j}`].equipment)
                                                                fetchedData[`${character?.class?.primary?.className}_${j}_C`]?.equipment.map((item, k) => {
                                                                    console.log('choice?.of?.url', item.url)
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
                                 {console.log(option.from.option_set_type)}       
                                    </div>
                                )
                            }else if(option.from.option_set_type === 'equipment_category'){
                                
                                const getData = async () => {
                                    const url = option.from.equipment_category.url
                                    try{
                                        const res = await fetch(`https://dnd5eapi.co${url}`)
                                        const data = await res.json()

                                        console.log('data', data)
                                        setFetchedData((prevData) => ({
                                            ...prevData,
                                            [`${character.class.primary.className}_${i}_EC`]: data
                                        }))
                                    }catch(err){
                                        console.error(err)
                                    }
                                }
                                getData()
                                console.log('hello', fetchedData[`${character.class.primary.className}_${i}_EC`])
                                return(
                                    <div>
                                        pick one {fetchedData[`${character.class.primary.className}_${i}_EC`]?.name}

                                        {
                                            fetchedData[`${character.class.primary.className}_${i}_EC`]?.equipment.map((item, k) => {
                                                console.log(item)
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
        setStall(1)
    }, [primaryEquip, primaryEquipOptions, stall])

    return(
        <div>
            {primaryEquipDiv}
            {primaryOptionsDiv}
        </div>
    )
}