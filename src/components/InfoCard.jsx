import {useState, useEffect} from 'react'

export default function InfoCard({functions}) {
    
    const {
        fetchData,
        url,
        hoveredKey,
    } = functions
    const api = `https://www.dnd5eapi.co`
// console.log(api + url)
    const [info, setInfo] = useState({})
    const [newInfo, setNewInfo] = useState({})
    const [infoDiv, setInfoDiv] = useState()

    const needsSecFetch = [
        'saving-throw',
        'skill',
        'weapon',
        'armor',
        'equipment'
    ]
    useEffect(() => {
        console.log('info', info)
        console.log('url', url)
    }, [info, url])

    console.log(hoveredKey)
    useEffect(() => {

        const fetchCall = async (endpoint) => {
            try{
                const res = await fetch(`https://www.dnd5eapi.co${endpoint}`)
                const data = await res.json()
                
                setInfo(data)
                console.log(data)
                console.log(data.url)

            }catch(err){
                console.error(err.name, err.message, err.stack)
            }
        }



        const logs = () => {
            console.log('hoveredKey', hoveredKey)
            console.log('url', url)
            console.log('info', info)

        }
        
        fetchCall(url)
        // console.log('info.reference', info.reference.url)
        //  && info?.reference?.url.contains('saving-throw')
        // if(info){
            logs()
        // }
        

    },[hoveredKey])

    useEffect(() => {

        const secondaryFetch = async (endpoint) => {
            try{
                console.log('endpoint',endpoint)
                const res = await fetch(`https://www.dnd5eapi.co${endpoint}`)
                const data = await res.json()
    
                console.log('secondary fetch', data)
                setNewInfo(data)
            }catch(err){
                console.error(err)
            }
        }
        
        if(info?.reference?.url && needsSecFetch.some(item => url?.includes(item))){
            secondaryFetch(info?.reference?.url)
            console.log('it includes item')
        }else{
            console.log('it does not include item')
            console.log('info.reference.url', info)
        }
    }, [info])
    const secondaryFetch = async (endpoint) => {
        try{
            console.log('endpoint',endpoint)
            const res = await fetch(`https://www.dnd5eapi.co${endpoint}`)
            const data = await res.json()

            console.log('secondary fetch', data)
            setNewInfo(data)
        }catch(err){
            console.error(err)
        }
    }



    
    useEffect(() => {
        const populate = () => {
            // SPELLS
            if(Object.keys(info)?.includes('school')){
                console.log('includes spells')
                setInfoDiv(
                    <>
                        <p>
                           Level {info?.level} | {info?.name} | {info?.casting_time}
                        </p>
                        hello
                        <p>
                            {info?.dc_type?.name} Save | {info?.range} | {info?.duration}
                        </p>
                        
                        <p>
                            {info?.desc?.map((item, i) => (
                                <>
                                    {item}
                                </>
                            ))}
                        </p>

                        <p>
                            {info?.material} | 
                            Components {info?.components?.map((item, i) => (
                                <>
                                    {item}
                                </>
                            ))} |
                            {info?.ritual ? ' Ritual' : ' No Ritual'}
                        </p>
                        
                        <p>
                            {info?.concentration ? ' Concentration' : ' No'} | 
                            {info?.school?.name}
                        </p>
                    </>
                )
                console.log('includes spells')
                // TRAITS
            }else if(url.includes('traits')){
                console.log('includes traits')
                setInfoDiv(
                    <>
                        <p>
                            {info?.name}
                        </p>
                        <p>
                            {info.desc}
                        </p>
                    </>
                )
                // ARMOR
            }else if(info?.equipment_category?.name === 'Armor'){
                console.log('includes equipment')
                setInfoDiv(
                    <>
                        <p>
                            {info.name}
                        </p>
                        <p>
                            {info.armor_category} Armor
                        </p>
                        <p>
                            {info.desc}
                        </p>
                        {/* ARMOR CLASS */}
                        <p>
                            {info.armor_class.base} Base AC | {info.armor_class.dex_bonus ? '+ Dex Bonus' : 'No Dex Bonus'}
                        </p>
                        <p>
                            {/* STEALTH DISADVANTAGE */}
                            {info.stealth_disadvantage ? 'Disadvantage on Stealth Checks' : 'No Disadvantage on Stealth Checks'}
                        </p>
                        <p>
                            {info?.cost?.quantity} {info?.cost?.unit} | {info.weight} lbs | {info.str_minimum && info.str_minimum > 0 ? `${info.str_minimum} STR Required` : 'No Required STR'}
                        </p>
                    </>
                )
                // WEAPON
            }else if(info?.equipment_category?.name === 'Weapon'){
                setInfoDiv(
                    <>
                    {console.log(info.name)}
                        <p>
                            {info.name}
                        </p>
                        <p>
                            {info.weapon_category} Weapon
                        </p>
                        <p>
                            Range: {info?.range?.normal}ft {info?.throw_range?.normal ? ` | Throw Range: (${info?.throw_range?.normal}/${info?.throw_range?.long})` : ''}
                            
                        </p>
                        <p>
                            {info?.damage?.damage_dice} {info?.damage?.damage_type?.name}
                        </p>
                        <p>
                            {info?.weight} lbs | {info?.cost?.quantity} {info?.cost?.unit}
                        </p>
                        <p>
                            Properties: 
                            {info?.properties?.map((prop, i) => (
                                <span key={i}>
                                    {i >= info?.properties?.length -1 ? ` ${prop?.name}` : `${prop?.name} | `}
                                </span>
                            ))}
                        </p>
                        <p>
                            {info?.cost?.quantity} {info?.cost?.unit} | {info?.weight} lbs
                        </p>
                    </>
                )
                // ADVENTURING GEAR
            }else if(info?.equipment_category?.name === 'Adventuring Gear'){
                setInfoDiv(
                    <>
                        <p>
                            {info?.name}
                        </p>
                        <p>
                            {info?.gear_category?.name}
                        </p>
                        <>
                            {info?.desc?.map(desc => <p>{desc}</p>)}
                        </>
                        <>
                        <p>
                            Contents
                        </p>
                            {info?.contents?.map(item => <p style={{backgroundColor:'#800080'}}>{item?.quantity} {item?.item?.name} </p>)}
                        </>
                        <p>
                            {info?.cost?.quantity} {info?.cost?.unit} | {info?.weight} lbs
                        </p>
                    </>
                )
                // TOOLS
            }else if(info?.equipment_category?.name === 'Tools'){
                setInfoDiv(
                    <>
                        <p>
                            {info.name}
                        </p>
                        <p>
                            {info?.tool_category}
                        </p>
                        <p>
                            {info?.cost?.quantity} {info?.cost?.unit} | {info?.weight} lbs
                        </p>
                    </>
                )
            }
        }
        populate()
        console.log(info)
    },[info, newInfo])
    return(
        <div className='infoCard'>
            {infoDiv}
        </div>
    )
}