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
        setPrimaryMax(character?.proficiencies?.classProficiencies?.primary?.availableOptions[0]?.choose)
    }, [primaryChoices])

    useEffect(() => {
        setSecondaryMax(character?.proficiencies?.classProficiencies?.secondary?.availableOptions[0]?.choose)
    }, [secondaryChoices])

    //real time logs
    useEffect(() => {
        const isChosen = "name" in character.class.primary
        console.log({character})
        console.log(chosenInstrumentPrimary)
    }, [primaryProChoiceDiv, chosenInstrumentPrimary])

    //Proficiency Options
    useEffect(() => {

        const primaryProChoice = () => {
        
            const primaryChoices = character?.proficiencies?.classProficiencies?.primary
            const isEmpty = ("name" in character.class.primary)
            
            console.log(primaryChoices.availableOptions)
            if(!isEmpty && character.class.primary.className !== 'Bard'){
                
                console.log(primaryMax) 
                
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
                                    console.log(chosenInstrumentPrimary)
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
            console.log('ello', secondaryChoices?.availableOptions[0])
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
            }else if(!isEmpty && character.class.primary.className === 'Bard'){
                const bardPro = () => {
                    return setSecondaryProChoiceDiv(
                        <div className='proficiencyChoice'>
                            {primaryChoices?.availableOptions[0]?.desc}
                            {primaryChoices?.availableOptions[0]?.from?.options.map((option, i) => {
                                //       
                                const isChecked = chosenProSecondary.includes(option.item.index)
                                const isDisabled = chosenProSecondary.length >= primaryMax && !isChecked
                                
                                const handleCheck = (e) => {
                                    
                                    const beenChecked = e.target.checked
    
                                    if(beenChecked){
    
                                        setChosenProSecondary((prevPro) => [...prevPro, e.target.name])
                                   
                                    }else if (!beenChecked){
    
                                        setChosenProSecondary((prevPro) => prevPro.filter((x) => x !== e.target.name))
                                    }
                                }
                                console.log('hello')
                                
    
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

                const bardInstrument = () => {
                    return setSecondaryInstrumentChoiceDiv(
                        <div className='proficiencyChoice'>
                            {primaryChoices?.availableOptions[1]?.desc}
                            {primaryChoices?.availableOptions[1]?.from?.options.map((option, i) => {
    
                                const isChecked = chosenInstrumentSecondary.includes(option.item.index)
                                const isDisabled = chosenInstrumentSecondary.length >= instrumentMax && !isChecked
    
                                const handleCheck = (e) => {
    
                                    const beenChecked = e.target.checked
                                    console.log(chosenInstrumentSecondary)
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
        console.log(primaryProChoiceDiv)
    }, [chosenProPrimary, chosenProSecondary, character, primaryMax, chosenInstrumentPrimary])

    //Proficiencies
    const [primaryProDiv, setPrimaryProDiv] = useState()
    const [secondaryProDiv, setSecondaryProDiv] = useState()

    useEffect(() => {
        const primaryPro = () => {

            const primary = character?.proficiencies?.classProficiencies?.primary?.classProficiencies
            const isEmpty = ("name" in character.class.primary)
            console.log(isEmpty)

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
            
            const decideStyle = !isEmpty ? '' : 'none'

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

// "proficiency_choices": [
//     {
//         "desc": "Choose any three",
//         "choose": 3,
//         "type": "proficiencies",
//         "from": {
//             "option_set_type": "options_array",
//             "options": [
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-acrobatics",
//                         "name": "Skill: Acrobatics",
//                         "url": "/api/proficiencies/skill-acrobatics"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-animal-handling",
//                         "name": "Skill: Animal Handling",
//                         "url": "/api/proficiencies/skill-animal-handling"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-arcana",
//                         "name": "Skill: Arcana",
//                         "url": "/api/proficiencies/skill-arcana"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-athletics",
//                         "name": "Skill: Athletics",
//                         "url": "/api/proficiencies/skill-athletics"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-deception",
//                         "name": "Skill: Deception",
//                         "url": "/api/proficiencies/skill-deception"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-history",
//                         "name": "Skill: History",
//                         "url": "/api/proficiencies/skill-history"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-insight",
//                         "name": "Skill: Insight",
//                         "url": "/api/proficiencies/skill-insight"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-intimidation",
//                         "name": "Skill: Intimidation",
//                         "url": "/api/proficiencies/skill-intimidation"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-investigation",
//                         "name": "Skill: Investigation",
//                         "url": "/api/proficiencies/skill-investigation"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-medicine",
//                         "name": "Skill: Medicine",
//                         "url": "/api/proficiencies/skill-medicine"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-nature",
//                         "name": "Skill: Nature",
//                         "url": "/api/proficiencies/skill-nature"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-perception",
//                         "name": "Skill: Perception",
//                         "url": "/api/proficiencies/skill-perception"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-performance",
//                         "name": "Skill: Performance",
//                         "url": "/api/proficiencies/skill-performance"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-persuasion",
//                         "name": "Skill: Persuasion",
//                         "url": "/api/proficiencies/skill-persuasion"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-religion",
//                         "name": "Skill: Religion",
//                         "url": "/api/proficiencies/skill-religion"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-sleight-of-hand",
//                         "name": "Skill: Sleight of Hand",
//                         "url": "/api/proficiencies/skill-sleight-of-hand"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-stealth",
//                         "name": "Skill: Stealth",
//                         "url": "/api/proficiencies/skill-stealth"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "skill-survival",
//                         "name": "Skill: Survival",
//                         "url": "/api/proficiencies/skill-survival"
//                     }
//                 }
//             ]
//         }
//     },
//     {
//         "desc": "Three musical instruments of your choice",
//         "choose": 3,
//         "type": "proficiencies",
//         "from": {
//             "option_set_type": "options_array",
//             "options": [
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "bagpipes",
//                         "name": "Bagpipes",
//                         "url": "/api/proficiencies/bagpipes"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "drum",
//                         "name": "Drum",
//                         "url": "/api/proficiencies/drum"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "dulcimer",
//                         "name": "Dulcimer",
//                         "url": "/api/proficiencies/dulcimer"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "flute",
//                         "name": "Flute",
//                         "url": "/api/proficiencies/flute"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "lute",
//                         "name": "Lute",
//                         "url": "/api/proficiencies/lute"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "lyre",
//                         "name": "Lyre",
//                         "url": "/api/proficiencies/lyre"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "horn",
//                         "name": "Horn",
//                         "url": "/api/proficiencies/horn"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "pan-flute",
//                         "name": "Pan flute",
//                         "url": "/api/proficiencies/pan-flute"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "shawm",
//                         "name": "Shawm",
//                         "url": "/api/proficiencies/shawm"
//                     }
//                 },
//                 {
//                     "option_type": "reference",
//                     "item": {
//                         "index": "viol",
//                         "name": "Viol",
//                         "url": "/api/proficiencies/viol"
//                     }
//                 }
//             ]
//         }
//     }
// ],