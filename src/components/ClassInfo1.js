import {useState, useEffect} from 'react'
import { Children } from 'react';

export default function ClassInfo ({functions}) {

    const {character, setCharacter} = functions

    const primaryInfo = character?.class?.primary ? character?.class?.primary : {}
    const secondaryInfo = character?.class?.secondary ? character?.class?.secondary : {}

    const instrumentMax = 3
    const [primaryMax, setPrimaryMax] = useState()
    const [secondaryMax, setSecondaryMax] = useState(0)
    const [classStats, setClassStats] = useState(null)
    // const [isDisabled, setIsDisabled] = useState(false)
    // const [proChoice, setProChoice] = useState(null)
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
    const [primaryProDiv, setPrimaryProDiv] = useState()

    const shouldDisable = (max, option) => {

        const isChecked = chosenProPrimary.includes(option)

        if(!isChecked && chosenProPrimary.length >= max){
            return true
        }else if(isChecked && chosenProPrimary.length >= max){
            return false
        }else{
            return false
        }
    }

    const [proChoiceDiv, setProChoiceDiv] = useState(
        <div>
            
        </div>
    )

    useEffect(() => {
        console.log({chosenProPrimary})

        // if(choenPro.length >= )
    }, [chosenProPrimary])

    const handleCheck = (e, item, max) => {
        const isChecked = e.target.checked


        setChosenProPrimary((currentPro) => {
            if(isChecked){
                return[...currentPro, item]
            }

            return currentPro.filter((x) => x !== item.index)
        })
        console.log({chosenProPrimary})

        console.log('end', chosenProPrimary)

    }
    
    const primaryChoices = character?.proficiencies?.classProficiencies?.primary
    useEffect(() => {
        const primaryChoices = character?.proficiencies?.classProficiencies?.primary
        setPrimaryMax(character?.proficiencies?.classProficiencies?.primary?.availableOptions[0]?.choose)
    }, [primaryChoices])

    useEffect(() => {
        const isChosen = "name" in character.class.primary
        console.log({character})
        console.log()
    }, [character])
    useEffect(() => {

        const primaryProChoice = () => {
        
            const primaryChoices = character?.proficiencies?.classProficiencies?.primary
            const secondaryChoices = character?.proficiencies?.classProficiencies?.secondary

            const isEmpty = !("name" in character.class.primary)
            const isSecondaryEmpty = Object.keys(character?.class?.secondary).length === 0
            
            if(!isEmpty && character.class.primary.name !== 'Bard'){
                
                console.log(primaryMax)
           
                // const isDisabled = chosenProPrimary.length >= primaryMax ? true : false   
                
                return setPrimaryProDiv(
                    <div>
                        {/* {primaryChoices[0].desc} */}
                        {primaryChoices.classProficiencies.map((option, i) => {
                            //       
                            const isChecked = chosenProPrimary.includes(option.index)
                            const isDisabled = chosenProPrimary.length >= primaryMax && !isChecked
                            
                            const handleCheck = (e) => {
                                
                                console.log(e)
                                const beenChecked = e.target.checked
                                if(beenChecked){
                                    setChosenProPrimary((prevPro) => [...prevPro, e.target.name])
                                }else if (!beenChecked){
                                    setChosenProPrimary((currentPro) => currentPro.filter((x) => x !== e.target.name))
                                }
                                console.log(chosenProPrimary)

                        
                            }

                            

                            return(
                                <p key={i}>
                                   <input
                                        type='checkbox'
                                        name={option.index}
                                        onChange={handleCheck}
                                        disabled={isChecked ? false : isDisabled}
                                        
                                        />
                                    <label htmlFor={option.index}>{option.name}</label> 
                                </p>
                            )
                        })}
                    </div>
                )
                    
                
            }
        
        }
        primaryProChoice()
    }, [chosenProPrimary, character, primaryMax])


    // const proChoice = () => {
    //     const primaryChoices = character?.proficiencies?.classProficiencies?.primary
    //     const secondaryChoices = character?.proficiencies?.classProficiencies?.secondary

    //     const isPrimaryEmpty = Object.keys(character?.class?.primary).length === 0
    //     const isSecondaryEmpty = Object.keys(character?.class?.secondary).length === 0

    //     if(!isPrimaryEmpty && isSecondaryEmpty){
                
    //         return primaryChoices.map((set) => {
    //             setPrimaryMax(set.choose)
    //             return (
    //                <div>
    //                 <strong>Choose {`${set.choose}`} for {`${primaryInfo.name}`}</strong>
                    
    //                 {/* {setProChoiceDiv( */}
    //                     {set.from.options.map((option) => {
                        
    //                     if(shouldDisable(set.choose, option)){
                            
    //                         return(
    //                             <p>
    //                                 <input
    //                                     name={option.item.index}
    //                                     type='checkbox'
    //                                     onChange={(e) => handleCheck(e, option.item, set.choose)}
    //                                     className='proChoice'
    //                                     data-chosenClass='primary'
    //                                     disabled
    //                                 />
    //                                 <label  htmlFor={option.item.index} >{option.item.name}</label>
    //                             </p>
    //                         )
    //                     }else if(!shouldDisable(set.choose, option)){
    //                         return(
    //                             <p>
    //                                 <input
    //                                     name={option.item.index}
    //                                     type='checkbox'
    //                                     onChange={(e) => handleCheck(e, option.item, set.choose)}
    //                                     className='proChoice'
    //                                     data-chosenClass='primary'
    //                                 />
    //                                 <label  htmlFor={option.item.index} >{option.item.name}</label>
    //                             </p>
    //                         )
    //                     }
    //                 })}
    //             </div> 
    //             )
                
    //         })
        
    //     }
    // }


    // useEffect(() => {
    //     console.log('proChoiceDiv', proChoiceDiv)
    //     console.log('primaryMax', primaryMax)
    //     console.log(chosenProPrimary.length)

    //     const decideDisabled = () => {
    //         const primaryChoices = character?.proficiencies?.classProficiencies?.primary
    //         const secondaryChoices = character?.proficiencies?.classProficiencies?.secondary
    
    //         const isPrimaryEmpty = Object.keys(character?.class?.primary).length === 0
    //         const isSecondaryEmpty = Object.keys(character?.class?.secondary).length === 0

    //         if(chosenProPrimary.length >= primaryMax){
    //             proChoice()
    //         }
    //     }
    //     decideDisabled()
    // }, [chosenProPrimary, character, primaryMax])



    // useEffect(() => {
    //     proChoice()
    // }, [classStats])




    useEffect(() => {

        const getClassStats = () => {

            const divsToDisplay = []

            const primary = character?.proficiencies?.primary?.classProficiencies
            const isPrimaryEmpty = Object.keys(character?.class?.primary).length === 0
    
            const secondary = character?.proficiencies?.secondary?.classProficiencies
            const isSecondaryEmpty = Object.keys(character?.class?.secondary).length === 0
            
            const decideStyle = !isPrimaryEmpty || !isSecondaryEmpty ? '' : 'none'
            
            console.log({decideStyle})
        //Proficiencies
            const getProficiencies = () => {
                
                const proDivs = []
                
                console.log({divsToDisplay})

                const getName = (element, i) => {
                    if(element[i].props.id === 'primaryPro'){
                        return `${character?.class?.primary?.name ?? ''}`
                    }else {
                        return `${character?.class?.secondary?.name ?? ''}`
                    }
                }
                // console.log(secondary.name)

                if(!isPrimaryEmpty && isSecondaryEmpty){                
                    proDivs.push(primary?.proficiencies.map((proficiencies, i) =>(
                        <p key={i} id='primaryPro' className='classProficiencies'>
                            {proficiencies.name} 
                        </p>
                    )))
                }else if(!isSecondaryEmpty && isPrimaryEmpty){
                    proDivs.push(secondary?.proficiencies.map((proficiencies, i) =>( 
                        <p key={i} id='secondaryPro' className='classProficiencies'>
                            {proficiencies.name}
                            {console.log(proficiencies.name)}
                        </p>
                    )))
                }else if(!isPrimaryEmpty && !isSecondaryEmpty){
                    proDivs.push(primary?.map((proficiencies, i) =>(
                        <p key={i} id='primaryPro' className='classProficiencies'>
                            {proficiencies.name} 
                        </p>
                    )))

                    proDivs.push(secondary?.map((proficiencies, i) =>( 
                        <p key={i} id='secondaryPro' className='classProficiencies'>
                            {proficiencies.name}
                        </p>
                    )))
                }else if(isPrimaryEmpty && isSecondaryEmpty){
                    return
                }
console.log('proDivs[0].props', proDivs)
                return (
                    <div>
                        <div id='proficiencies'>
                            <strong className='title'>Proficiencies</strong>
                        </div>

                        {/* {
                            proDivs.map((element, i) => (
                                <div key={i}>
                                    {console.log('the log', element[i].props.id)}
                                    <strong>{getName(element, i)}</strong>
                                        {element}
                                </div>
                            ))
                        } */}
                    </div>
                )
                console.log({isSecondaryEmpty})

            }

            const getSavingThrows = () => {
    
            }
    
            const getSpellcasting = () => {
    
            }
    
            const startingEquip = () => {
    
            }
    
            const getStartingEquipOptions = () => {
    
            }
    
            const getSubClasses = () => {
                
            }
            // getProChoices()
            return(
                <div style={{display: decideStyle}} id='proficiencies'>
                    <div>
                        {getProficiencies()}
                    </div>
                    <div>
                        {proChoiceDiv}
                        {/* {proChoice()} */}
                        {/* {getProChoices()} */}
                        {/* {choiceDivs.map((choice) => (
                            {choice}
                        ))} */}
                    </div>
                    
                </div>
            )
        }

        setClassStats(getClassStats)
        console.log({classStats})
    }, [character.class])


    const proChoices = () => {


    }
    

//final return statement
    return (
        <div key={'classStats'}>
            {classStats}
            {primaryProDiv}
            {/* {proChoice} */}
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