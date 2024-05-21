import {useState, React, useEffect} from 'react'
import { Children } from 'react';

export default function ProInfo ({functions}) {

    const {character, setCharacter} = functions

    // hit die--- #hit_die#
    // name --- 'name'

    // proficiencies --- [proficiencies] => 'index' = 'name' = 'url' 
    
    
    
    // proficiency choices--- [proficiency_choices] => #choose# = 'desc' = {from} = 'type'
        // {from} --- 'option_set_type' = [options]
            //[options] --- {item} => 'index' = 'name' = 'url' = 'option_type'
    
    
    
            // saving_throws --- [saving_throws] => 'index' = 'name' = 'url'
    
   
   
    // spellcasting --- spellcasing => [info] = #level# = {spellcasting_ability}
        // [info]--- [desc] = 'name'
            //{spellcasting_ability} --- 'index' = 'name' = 'url'
    
            // spells--- spells
    
    //startting_equipment--- [{starting_equipment}] => {equipment} = #quantity#
        // {equipment} --- 'index' = 'name' = 'url'
    
    // [{starting_equipment_options}] --- 'desc' = {from} = 'type'
        //{from} --- option_set_type = [options]
            //[options]--- #count# = {of} = 'option_type'
                                            // could be "counted_reference" ||"choice"
                //{of}--- 'index' = 'name' = 'url'

    //[subclasses]--- [{subclasses}] => 'index' = 'name' = 'url'
    //'url'

    //change to useEffect with this dep array [character.class]



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
    const [primaryMax, setPrimaryMax] = useState()
    const [secondaryMax, setSecondaryMax] = useState(0)

    useEffect(() => {
        setChosenProPrimary([])
        setChosenInstrumentPrimary([])
    }, [character.class.primary.className])

    useEffect(() => {
        setChosenProSecondary([])
        setChosenInstrumentSecondary([])
    },[character.class.secondary.className])

    

    useEffect(() => {
        setPrimaryMax(character?.proficiencies?.classProficiencies?.primary?.availableOptions[0]?.choose)
    }, [primaryChoices])

    useEffect(() => {
        setSecondaryMax(character?.proficiencies?.classProficiencies?.secondary?.availableOptions[0]?.choose)
    }, [secondaryChoices])

    //real time logs
    useEffect(() => {
        // console.log({character})
    }, [primaryProChoiceDiv, chosenInstrumentPrimary])

    //Proficiency Options
    useEffect(() => {

        const primaryProChoice = () => {
        
            const primaryChoices = character?.proficiencies?.classProficiencies?.primary
            const isEmpty = ("name" in character.class.primary)

            if(!isEmpty && character.class.primary.className !== 'Bard'){
                
                return setPrimaryProChoiceDiv(
                    <div className='proficiencyChoice'>
                        {primaryChoices?.availableOptions[0]?.desc}
                        {primaryChoices?.availableOptions[0]?.from?.options.map((option, i) => {
                             
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
                // console.log('hello')
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
                    // console.log('hello')
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
                                // console.log(chosenInstrumentSecondary)
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
            const isEmpty = ("name" in character.class.primary)

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
            const isEmpty = ("name" in character.class.secondary)

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

        primaryPro()
        secondaryPro()
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