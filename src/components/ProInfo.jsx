import {useState, React, useEffect} from 'react'
import { Children } from 'react'
import InfoCard from './InfoCard'

export default function ProInfo ({functions}) {

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
		setEvent(e)
		setKey(key)
		setHoveredKey(key)
	}

    const handleMouseOut = e => {
		setIsHovering(false)
		setEvent(null)
		setSpawnCount(prevCount => prevCount + 1)
	}


    //Proficiency Options
    useEffect(() => {

        const primaryProChoice = () => {
        
            const primaryChoices = fetchData?.primary_class?.proficiency_choices

                setPrimaryProChoiceDiv(
                    <div className='proficiency_choice'>
                        {primaryChoices?.map((choice, i) => {
                            return(
                                <div className='primary_pro' key={i}>
                                    {choice.desc}
                                    {choice.from.options.map((option, j) => {

                                        const chosenPro = fetchData?.primary_class[`${choice.type}_${i}`]

                                        const max = choice?.choose
                                        const isChecked = chosenPro?.some(obj => obj.name === option.item.name)
                                        const isDisabled = chosenPro?.length >= max && !isChecked

                                        const handleCheck = (e) => {
                                            const beenChecked = e.target.checked

                                            if(beenChecked){

                                                console.log(choice)
                                                setFetchData(prevData => ({
                                                    ...prevData,
                                                    primary_class: {
                                                        ...prevData.primary_class,
                                                        [`${choice.type}_${i}`]:[
                                                                ...(prevData.primary_class[`${choice.type}_${i}`])|| [],
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
                                                        chosen_pro:[
                                                            ...prevData.filter((x) => x !== e.target.name)
                                                        ]
                                                    }
                                                }))
                                            }
                                            console.log(fetchData.selected_pro_primary)
                                        }

                                        return(
                                            <div key={`${i}${j}`}>
                                                <p>
                                                    <input
                                                        type='checkbox'
                                                        value={option.item.name}
                                                        checked={isChecked}
                                                        name={option.item.index}
                                                        onChange={handleCheck}
                                                        disabled={isChecked ? false : isDisabled}
                                                        data-url={option.item.url}
                                                        />
                                                    <label onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} htmlFor={option.item.index}>{option.item.name}</label>
                                                </p>
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
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )}
            const secondaryProChoice = () => {
                const secondaryChoices = fetchData?.secondary_class?.proficiency_choices

                setSecondaryProChoiceDiv(
                    <div className='proficiency_choice'>
                        {secondaryChoices?.map((choice, i) => {
                            return(
                                <div className='secondary_pro' key={i}>
                                    {choice.desc}
                                    {choice.from.options.map((option, j) => {

                                        const chosenPro = fetchData?.secondary_class[`${choice.type}_${i}`]
                                        // console.log(chosenPro)
                                        // console.log(fetchData)
                                        const max = choice?.choose
                                        // console.log(chosenPro)
                                        const isChecked = chosenPro?.some(obj => obj.name === option.item.name)
                                        const isDisabled = chosenPro?.length >= max && !isChecked

                                        const handleCheck = (e) => {
                                            const beenChecked = e.target.checked

                                            if(beenChecked){

                                                console.log(choice)
                                                setFetchData(prevData => ({
                                                    ...prevData,
                                                    secondary_class: {
                                                        ...prevData.secondary_class,
                                                        [`${choice.type}_${i}`]:[
                                                                ...(prevData.secondary_class[`${choice.type}_${i}`])|| [],
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
                                                        chosen_pro:[
                                                            ...prevData.filter((x) => x !== e.target.name)
                                                        ]
                                                    }
                                                }))
                                            }
                                            console.log(fetchData.selected_pro_secondary)
                                        }

                                        return(
                                            <p key={`${i}${j}`}>
                                                <input
                                                    type='checkbox'
                                                    value={option.item.name}
                                                    checked={isChecked}
                                                    name={option.item.index}
                                                    onChange={handleCheck}
                                                    disabled={isChecked ? false : isDisabled}
                                                    data-url={option.item.url}
                                                    />
                                                <label htmlFor={option.item.index}>{option.item.name}</label>
                                            </p>
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

    }, [fetchData])

    //Proficiencies
    const [primaryProDiv, setPrimaryProDiv] = useState()
    const [secondaryProDiv, setSecondaryProDiv] = useState()

    useEffect(() => {
        const primaryPro = () => {

            const primary = character?.proficiencies?.classProficiencies?.primary?.classProficiencies
            const isEmpty = ("className" in character.class.primary)

            if(!isEmpty){

                setPrimaryProDiv(
                    <div className='proficiencies'>
                        <strong>{character?.class?.primary?.className}</strong>

                        {primary.map((element, i) => (

                            <p key={i} className='classProficiencies' >

                                {element.name}
                            </p>
                        ))}
                    </div>
                )
            }
        }

        const secondaryPro = () => {

            const secondary = character?.proficiencies?.classProficiencies?.secondary?.classProficiencies
            const isEmpty = ("className" in character.class.secondary)

            if(!isEmpty){
                setSecondaryProDiv(

                    <div className='proficiencies'>

                        <strong>{character?.class?.secondary?.className}</strong>

                        {secondary.map((element, i) => (

                            <p key={i} className='classProficiencies'>

                                {element.name}
                            </p>
                        ))}
                    </div>
                )
            }
        }
        if('className' in character.class.primary){
            primaryPro()
        }
        if('className' in character.class.secondary){
            secondaryPro()
        }

        
        
    }, [character])

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