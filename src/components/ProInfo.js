import {useState, React, useEffect} from 'react'
import { Children } from 'react';

export default function ProInfo ({functions}) {

    const {character, setCharacter} = functions

    const parentName = 'proInfo_infoCard'

    const [chosenProPrimary, setChosenProPrimary] = useState([])
    const [chosenProSecondary, setChosenProSecondary] = useState([])
    const [chosenInstrumentPrimary, setChosenInstrumentPrimary] = useState([])
    const [chosenInstrumentSecondary, setChosenInstrumentSecondary] = useState([])

    const [primaryProChoiceDiv, setPrimaryProChoiceDiv] = useState()
    const [secondaryProChoiceDiv, setSecondaryProChoiceDiv] = useState()
    const [primaryInstrumentChoiceDiv, setPrimaryInstrumentChoiceDiv] = useState()
    const [secondaryInstrumentChoiceDiv, setSecondaryInstrumentChoiceDiv] = useState()
    

    
    //Set the max for proficiency choices
    const primaryChoices = character?.proficiencies?.classProficiencies?.primary
    const secondaryChoices = character?.proficiencies?.classProficiencies?.secondary

    const instrumentMax = 3
    const [primaryMax, setPrimaryMax] = useState(0)
    const [secondaryMax, setSecondaryMax] = useState(0)

    // resets the chosen pro arrays when the class is changed
    useEffect(() => {
        setChosenProPrimary([])
        setChosenInstrumentPrimary([])
        console.log({character})
    }, [character?.class?.primary?.className])

    useEffect(() => {
        setChosenProSecondary([])
        setChosenInstrumentSecondary([])
    },[character?.class?.secondary?.className])
 
    useEffect(() => {
        setPrimaryMax(character?.proficiencies?.classProficiencies?.primary?.availableOptions[0]?.choose)
    }, [primaryChoices])

    useEffect(() => {
        setSecondaryMax(character?.proficiencies?.classProficiencies?.secondary?.availableOptions[0]?.choose)
    }, [secondaryChoices])

    //real time logs
    useEffect(() => {
        console.log({character})
    }, [character])

    //Proficiency Options
    useEffect(() => {

        const primaryProChoice = () => {
        
            const primaryChoices = character?.proficiencies?.classProficiencies?.primary
            const isEmpty = !("className" in character?.class?.primary)

            if(!isEmpty && character?.class?.primary?.className !== 'Bard'){
                
                return setPrimaryProChoiceDiv(
                    <div className='proficiencyChoice'>
                        {primaryChoices?.availableOptions[0]?.desc}
                        {primaryChoices?.availableOptions[0]?.from?.options.map((option, i) => {
                             
                            const isChecked = chosenProPrimary.includes(option.item.index)
                            const isDisabled = chosenProPrimary.length >= primaryMax && !isChecked
                            
                            const handleCheck = (e) => {
                                
                                const beenChecked = e.target.checked

                                if(beenChecked){

                                    const chosenSkill = e.target.name.replace('skill-', '')
                                    const skills = Object.keys(character.skills)
                                    console.log(e.target)
                                    setChosenProPrimary((prevPro) => [...prevPro, e.target.name])
                                    
                                    setCharacter((...prevCharacter) => ({
                                        ...prevCharacter,
                                        proficiencies:{
                                            ...prevCharacter.proficiencies,
                                            classProficiencies:{
                                                ...prevCharacter.proficiencies.classProficiencies,
                                                primary:{
                                                    ...prevCharacter.proficiencies.classProficiencies.primary,
                                                    classProficiencies:[
                                                        ...prevCharacter.proficiencies.classProficiencies.primary.classProficiencies,
                                                        {
                                                            name: e.target.name,
                                                            url:e.target.url,
                                                            index: e.target.name.toLowerCase()
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    }))
                                    console.log(option)
                                    console.log(chosenProPrimary)
                                    console.log(chosenSkill)

                                    setCharacter((prevCharacter) => {
                                        const updatedSkills = {...prevCharacter.skills}

                                        if(updatedSkills[chosenSkill]){
                                            updatedSkills[chosenSkill] = {
                                                ...updatedSkills[chosenSkill],
                                                isProficient:true
                                            }
                                        }
                                        return {
                                            ...prevCharacter,
                                            skills: updatedSkills
                                        }
                                    })
                               
                                }else if (!beenChecked){

                                    setChosenProPrimary((prevPro) => prevPro.filter((x) => x !== e.target.name))
                                }
                            }

                            return(
                                <p key={i}>
                                   <input
                                        type='checkbox'
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
                        {console.log({character})}
                    </div>
                )
            }else if(!isEmpty && character.class.primary.className === 'Bard'){

                const bardPro = () => {
                    return setPrimaryProChoiceDiv(
                        <div className='proficiencyChoice'>
                            {primaryChoices?.availableOptions[0]?.desc}
                            {primaryChoices?.availableOptions[0]?.from?.options.map((option, i) => {
                                //       
                                const isChecked = chosenProPrimary.includes(option.item.index)
                                const isDisabled = chosenProPrimary.length >= primaryMax && !isChecked
                                
                                const handleCheck = (e) => {
                                    
                                    const beenChecked = e.target.checked
    
                                    if(beenChecked){
    
                                        setChosenProPrimary((prevPro) => [...prevPro, e.target.name])
                                   
                                    }else if (!beenChecked){
    
                                        setChosenProPrimary((prevPro) => prevPro.filter((x) => x !== e.target.name))
                                    }
                                }
    
                                return(
                                    <p key={i}>
                                       <input
                                            type='checkbox'
                                            checked={isChecked}
                                            name={option.item.index}
                                            onChange={handleCheck}
                                            disabled={isChecked ? false : isDisabled}
                                            />
                                        <label htmlFor={option.item.index}>{option.item.name}</label> 
                                    </p>
                                )
                            })}
                        </div>
                    )
                }

                const bardInstrument = () => {
                    return setPrimaryInstrumentChoiceDiv(
                        <div className='proficiencyChoice'>
                            {primaryChoices?.availableOptions[1]?.desc}
                            {primaryChoices?.availableOptions[1]?.from?.options.map((option, i) => {
    
                                const isChecked = chosenInstrumentPrimary.includes(option.item.index)
                                const isDisabled = chosenInstrumentPrimary.length >= instrumentMax && !isChecked
    
                                const handleCheck = (e) => {
    
                                    const beenChecked = e.target.checked

                                    if(beenChecked){
    
                                        setChosenInstrumentPrimary((prevPro) => [...prevPro, e.target.name])
    
                                    }else if(!beenChecked){
    
                                        setChosenInstrumentPrimary((prevPro) => prevPro.filter((x) => x !== e.target.name))
                                    }
                                }
    
                                return(
                                    <p key={i}>
                                        <input
                                            type='checkbox'
                                            checked={isChecked}
                                            name={option.item.index}
                                            onChange={handleCheck}
                                            disabled={isChecked ? false : isDisabled}
                                        />
                                        <label htmlFor={option.item.index}>{option.item.name}</label>
                                    </p>
                                )
                            })}
                        </div>
                    )
                }

                bardPro()
                bardInstrument()
            }
        }

        const secondaryProChoice = () => {

            const secondaryChoices = character?.proficiencies?.classProficiencies?.secondary
            const isEmpty = ("name" in character.class.secondary)

            
            if(!isEmpty && character.class.secondary.className !== 'Bard'){
                return setSecondaryProChoiceDiv(

                    <div className='proficiencyChoice'>
                        {secondaryChoices?.availableOptions[0]?.desc}

                        {secondaryChoices?.availableOptions[0]?.from?.options.map((option, i) => {
                            
                            const isChecked = chosenProSecondary.includes(option.item.index)
                            const isDisabled = chosenProSecondary.length >= secondaryMax && !isChecked

                            const handleCheck = (e) => {

                                const beenChecked = e.target.checked

                                if(beenChecked){

                                    setChosenProSecondary((prevPro) => [...prevPro, e.target.name])
                                
                                }else if(!beenChecked){

                                    setChosenProSecondary((prevPro) => prevPro.filter((x) => x !== e.target.name))
                                }
                            }
                            return(
                                <p key={i}>
                                    <input 
                                        type='checkbox'
                                        checked={isChecked}
                                        name={option.item.index}
                                        onChange={handleCheck}
                                        disabled={isChecked ? false :isDisabled}
                                        />
                                        <label htmlFor={option.item.index}>{option.item.name}</label>
                                </p>
                            )
                        })}
                    </div>
                )
            }else if(!isEmpty && character.class.secondary.className === 'Bard'){

                const bardPro = () => {
                    return setSecondaryProChoiceDiv(
                        <div className='proficiencyChoice'>
                            {secondaryChoices?.availableOptions[0]?.desc}
                            {secondaryChoices?.availableOptions[0]?.from?.options.map((option, i) => {
                                    //  console.log()
                                const isChecked = chosenProSecondary.includes(option.item.index)
                                const isDisabled = chosenProSecondary.length >= secondaryMax && !isChecked
                                
                                const handleCheck = (e) => {
                                    
                                    const beenChecked = e.target.checked
    
                                    if(beenChecked){
    
                                        setChosenProSecondary((prevPro) => [...prevPro, e.target.name])
                                   
                                    }else if (!beenChecked){
    
                                        setChosenProSecondary((prevPro) => prevPro.filter((x) => x !== e.target.name))
                                    }
                                }
    
                                return(
                                    <p key={i}>
                                       <input
                                            checked={isChecked}
                                            type='checkbox'
                                            name={option.item.index}
                                            onChange={handleCheck}
                                            disabled={isChecked ? false : isDisabled}
                                            />
                                        <label htmlFor={option.item.index}>{option.item.name}</label> 
                                    </p>
                                )
                            })}
                        </div>
                    )
                }

                const bardInstrument = () => {

                    return setSecondaryInstrumentChoiceDiv(
                        <div className='proficiencyChoice'>
                            {secondaryChoices?.availableOptions[1]?.desc}
                            {secondaryChoices?.availableOptions[1]?.from?.options.map((option, i) => {
    
                                const isChecked = chosenInstrumentSecondary.includes(option.item.index)
                                const isDisabled = chosenInstrumentSecondary.length >= instrumentMax && !isChecked
    
                                const handleCheck = (e) => {
    
                                    const beenChecked = e.target.checked

                                    if(beenChecked){
    
                                        setChosenInstrumentSecondary((prevPro) => [...prevPro, e.target.name])
    
                                    }else if(!beenChecked){
    
                                        setChosenInstrumentSecondary((prevPro) => prevPro.filter((x) => x !== e.target.name))
                                    }
                                }

                                return(
                                    <p key={i}>
                                        <input
                                            type='checkbox'
                                            name={option.item.index}
                                            onChange={handleCheck}
                                            disabled={isChecked ? false : isDisabled}
                                        />
                                        <label htmlFor={option.item.index}>{option.item.name}</label>
                                    </p>
                                )
                            })}
                        </div>
                    )
                }
                
                bardPro()
                bardInstrument()
            }
        }
        primaryProChoice()
        secondaryProChoice()

    }, [chosenProPrimary, chosenProSecondary, character, primaryMax,chosenInstrumentPrimary, chosenInstrumentSecondary])

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
                {primaryInstrumentChoiceDiv}
            </div>
            <div>
                {secondaryProDiv}
                {secondaryProChoiceDiv}
                {secondaryInstrumentChoiceDiv}
            </div>
            
        </div>
    )
}