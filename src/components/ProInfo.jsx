import {useState, React, useEffect} from 'react'
import { Children } from 'react'
import InfoCard from './InfoCard'

export default function ProInfo ({functions}) {


    // `secondary_pro_${i}${j}`
    // `primary_pro_${i}${j}`
    const {character, fetchData, setFetchData} = functions

    const parentName = 'proInfo_infoCard'

    const [primaryProChoiceDiv, setPrimaryProChoiceDiv] = useState()
    const [secondaryProChoiceDiv, setSecondaryProChoiceDiv] = useState()

    const [isHovering, setIsHovering] = useState(false)
	const [event, setEvent] = useState(null)
	const [spawnCount, setSpawnCount] = useState(0)
	const [key, setKey] = useState(null)
	const [hoveredKey, setHoveredKey] = useState(null)

    const handleMouseOver = (e, key) => {
		setIsHovering(true)
		setHoveredKey(key)
	}

    const handleMouseOut = (e) => {
		setIsHovering(false)
		setEvent(null)
		setSpawnCount(prevCount => prevCount + 1)
	}

    //Proficiency Options
    useEffect(() => {

        const primaryProChoice = () => {
        
            const primaryChoices = fetchData?.primary_class?.proficiencies?.proficiency_choices 

                setPrimaryProChoiceDiv(
                    <div className='proficiency_choice'>
                        {primaryChoices?.map((choice, i) => {
                            return(
                                <div className='primary_pro' key={i}>
                                    {choice.desc}
                                    {choice.from.options.map((option, j) => {

                                        const chosenPro = (fetchData?.primary_class[`chosen_pro_${i}`])
                                        const max = choice?.choose
                               
                                        const isChecked = chosenPro?.some(obj => obj?.name === option?.item?.name)
                                        const isDisabled = chosenPro?.length >= max && !isChecked
                          
                                        const handleCheck = (e) => {
                                            const beenChecked = e.target.checked

                                            if(beenChecked){

                                                setFetchData(prevData => ({
                                                    ...prevData,
                                                    primary_class: {
                                                        ...prevData.primary_class,
                                                        [`chosen_pro_${i}`]:[
                                                                ...(prevData.primary_class[`chosen_pro_${i}`] || []),
                                                            {
                                                                name: e.target.value,
                                                                url:e.target.getAttribute('data-url'),
                                                                index:e.target.name
                                                            }    
                                                        ]
                                                    }
                                                }))
                                                
                                            }else if (!beenChecked){
                                                setFetchData((prevData) => ({
                                                    ...prevData,
                                                    primary_class:{
                                                        ...prevData.primary_class,
                                                        [`chosen_pro_${i}`]:[
                                                            ...prevData.primary_class[`chosen_pro_${i}`].filter((x) => x.name !== e.target.value)
                                                        ]
                                                    }
                                                }))
                                            }
                                            
                                        }
                                        if(option.option_type === 'reference'){
                                            return(
                                                <div key={j}>
                                                    <p>
                                                    <input
                                                        type='checkbox'
                                                        value={option?.item?.name}
                                                        checked={isChecked}
                                                        name={option?.item?.index}
                                                        onChange={handleCheck}
                                                        disabled={isChecked ? false : isDisabled}
                                                        data-url={option?.item?.url}
                                                        />
                                                    <label onMouseOver={(e) => {handleMouseOver(e, `primary_pro_${i}${j}`)}} onMouseOut={handleMouseOut} htmlFor={option?.item?.index}>{option?.item?.name}</label>
                                                </p>    
                                                </div>
                                            )
                                        }else if(option.option_type === 'choice'){

                                            return(
                                                <div>
                                                    {option?.choice?.from?.options?.map((item, k) => {
                                                        return(
                                                            <p key={k}>
                                                                <input
                                                                    type='checkbox'
                                                                    value={item?.item?.name}
                                                                    checked={isChecked}
                                                                    name={item?.item?.index}
                                                                    onChange={handleCheck}
                                                                    disabled={isChecked ? false : isDisabled}
                                                                    data-url={item?.item?.url}
                                                                    />
                                                                <label onMouseOver={(e) => {handleMouseOver(e, `primary_pro_${i}${j}`)}} onMouseOut={handleMouseOut} htmlFor={item?.item?.index}>{item?.item?.name}</label>
                                                            </p>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )}
            const secondaryProChoice = () => {
                const secondaryChoices = fetchData?.secondary_class?.multi_classing?.proficiency_choices

                setSecondaryProChoiceDiv(
                    <div className='proficiency_choice'>
                        {secondaryChoices?.map((choice, i) => {
                            return(
                                <div className='secondary_pro' key={i}>
                                    {choice.desc}
                                    {choice.from.options.map((option, j) => {

                                        const chosenPro = fetchData?.secondary_class[`chosen_pro_${i}`]
                                        const max = choice?.choose
                                
                                        const isChecked = chosenPro?.some(obj => obj.name === option.item.name)
                                        const isDisabled = chosenPro?.length >= max && !isChecked

                                        const handleCheck = (e) => {
                                            const beenChecked = e.target.checked

                                            if(beenChecked){

                                                setFetchData(prevData => ({
                                                    ...prevData,
                                                    secondary_class: {
                                                        ...prevData.secondary_class,
                                                        [`chosen_pro_${i}`]:[
                                                                ...(prevData.secondary_class[`chosen_pro_${i}`] || []),
                                                            {
                                                                name: e.target.value,
                                                                url:e.target.getAttribute('data-url'),
                                                                index:e.target.name
                                                            }    
                                                        ]
                                                    }
                                                }))
                                                
                                            }else if (!beenChecked){
                                                setFetchData((prevData) => ({
                                                    ...prevData,
                                                    secondary_class:{
                                                        ...prevData.secondary_class,
                                                        [`chosen_pro_${i}`]:[
                                                            ...prevData.secondary_class[`chosen_pro_${i}`].filter((x) => x.name !== e.target.value)
                                                        ]
                                                    }
                                                }))
                                            }
                                        }

                                        return(
                                            <div>
                                                <p key={`${i}${j}`}>
                                                    <input
                                                        type='checkbox'
                                                        value={option?.item?.name}
                                                        checked={isChecked}
                                                        name={option?.item?.index}
                                                        onChange={handleCheck}
                                                        disabled={isChecked ? false : isDisabled}
                                                        data-url={option?.item?.url}
                                                        />
                                                    <label htmlFor={option?.item?.index} onMouseOver={(e) => {handleMouseOver(e, `secondary_pro_${i}${j}`)}}>{option?.item?.name}</label>
                                                </p>
                                                {/* {isHovering && hoveredKey === `secondary_pro_${i}${j}` ?
                                                    <InfoCard 
                                                        functions={{
                                                            character: character,
                                                            event: event,
                                                            isHovering: isHovering,
                                                            spawnCount: spawnCount,
                                                            setSpawnCount: setSpawnCount,
                                                            className: hoveredKey,
                                                            hoveredKey: hoveredKey,
                                                            url: option.item.url,
                                                            parentName: parentName,
                                                    }}/>
                                                : ''} */}
                                                
                                            </div>
                                            
                                            
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )
            }

      
        primaryProChoice()
        secondaryProChoice()

    }, [fetchData, isHovering, fetchData.is_multi_classing])

    //Proficiencies
    const [primaryProDiv, setPrimaryProDiv] = useState()
    const [secondaryProDiv, setSecondaryProDiv] = useState()

    useEffect(() => {
        const primaryPro = () => {

            const primary = fetchData?.primary_class?.proficiencies?.starting_proficiencies

                setPrimaryProDiv(
                    <div key='sec_pro' className='proficiencies'>
                        <strong>{character?.class?.primary?.className}</strong>

                        {primary.map((element, i) => (
                            

                            <div key={`sec_pro_${i}`}>
                                <p onMouseOver={(e) => {handleMouseOver(e, `primary_pro_${i}`)}} onMouseOut={handleMouseOut} key={i} className='classProficiencies' >
                                    {element.name}
                                </p>
                                {/* {isHovering && hoveredKey === `primary_pro_${i}` ?
                                    <InfoCard 
                                        functions={{
                                            character: character,
                                            event: event,
                                            isHovering: isHovering,
                                            spawnCount: spawnCount,
                                            setSpawnCount: setSpawnCount,
                                            className: hoveredKey,
                                            hoveredKey: hoveredKey,
                                            url: element.url,
                                            parentName: parentName,
                                    }}/>
                                : ''} */}
                            </div>
                            
                        ))}
                    </div>
                )
        }

        const secondaryPro = () => {

            const secondary = fetchData?.secondary_class?.multi_classing.proficiencies
                setSecondaryProDiv(

                    <div className='proficiencies'>

                        <strong>{character?.class?.secondary?.className}</strong>

                        {secondary.map((element, i) => (
                            <div>
                                <p onMouseOver={(e) => {`secondary_pro_${i}`}} key={i} className='classProficiencies'>
                                    {element.name}
                                </p>
                                
                                {/* {isHovering && hoveredKey === `secondary_pro_${i}` ?
                                    <InfoCard 
                                        functions={{
                                            character: character,
                                            event: event,
                                            isHovering: isHovering,
                                            spawnCount: spawnCount,
                                            setSpawnCount: setSpawnCount,
                                            className: hoveredKey,
                                            hoveredKey: hoveredKey,
                                            url: option.item.url,
                                            parentName: parentName,
                                    }}/>
                                : ''} */}
                            </div>
                            
                        ))}
                    </div>
                )
            // }
        }
        if('primary_class' in fetchData){
            primaryPro()
        }
        if('secondary_class' in fetchData){
            secondaryPro()
        }

        
        
    }, [fetchData, isHovering])

//final return statement
    return (
        <div key={'classStats'} id='classInfo'>
            <div>
                {primaryProDiv}
                {primaryProChoiceDiv}
            </div>
            <div>
                {secondaryProDiv}
                {secondaryProChoiceDiv}
            </div>
            
        </div>
    )
}