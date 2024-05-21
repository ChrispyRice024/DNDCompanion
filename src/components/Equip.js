import {useState, React, useEffect} from 'react'

export default function Equip ({functions}) {

    const {character, setCharacter} = functions

    const [primaryEquip, setPrimaryEquip] = useState([])
    const [primaryEquipOptions, setPrimaryEquipOptions] = useState([])

    const [secondaryEquip, setSecondaryEquip] = useState([])
    const [secondaryEquipOptions, setSecondaryEquipOptions] = useState([])

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

    useEffect(() => {

        

        const fetchChoice = (url) => {

            fetch(`https://www.dnd5eapi.co${url}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
            })
        }

        const decideEquipType = (option, i) => {
            const equipType = primaryEquipOptions[i].from.options[i].optionType
            if (equipType === 'counted_reference'){
                return (
                    <p>
                        {/* {choice.choose} {choice.} */}
                    </p>
                )
            }
        }
if(character.class.primary.className){
    // fetchChoice(primaryEquipOptions[0].from.options[1].choice.from.equipment_category.url)
}
        console.log('primaryEquipOptions', primaryEquipOptions)
        if(primaryEquip.length > 0 && primaryEquipOptions.length > 0){

            setPrimaryEquipDiv(
                <div>
                    <strong>{character.class.primary.className} Starting Equipment</strong>
                        {primaryEquip.map((equip, i) => (
                            <p key={i}>
                            
                                {equip.equipment.name}
                                
                            </p>
                        ))}
                </div>
            )
            // console.log()
            setPrimaryOptionsDiv(
                // console.log(primaryEquipOptions)


                    <div>
                        
                        {character.class.primary.className} Equipment Options
                        {primaryEquipOptions.map((option, i) => {

                            if (option.from.option_set_type === 'options_array'){
                                // each item is a seperate choice (.map)
                                return(
                                    <div>
                                        pick one 
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
                                                    console.log(letter[i])
                                                console.log('choice.of.name', choice.of)
                                                return(
                                                    <p>
                                                        {letter[i]} | {choice.count} {choice.of.name}
                                                    </p>
                                                )
                                                }else if(choice.option_type === 'multiple'){
                                                    console.log(choice.items[0].of.name)
                                                    // choice.items.map((item, i) => {
                                                    //     return(
                                                    //         <p>
                                                    //             hello
                                                    //             {item.of.name} and
                                                    //         {console.log(item)}
                                                    //         </p>
                                                    //     )
                                                    // })
                                                    return(
                                                        <p>
                                                            {choice.items.map((item, k) => {

                                                                return(
                                                                    <span key={k}>
                                                                        {/* add this logic to every counted reference */}
                                                                        {item.count} {item.count > 1 ? `${item.of.name}s` : item.of.name} 
                                                                        {k < choice.items.length - 1 ? ' and ' : ''}
                                                                    </span>
                                                                )
                                                            })}
                                                        </p>
                                                    )
                                                }else if(choice.option_type === 'choice'){
                                                    console.log('choice', choice, choice.choice.from.equipment_category.url)
                                                    const url = choice.choice.from.equipment_category.url

                                                    let fetchedChoices

                                                    const fetchData = async () => {
                                                        await  fetch(`https://www.dnd5eapi.co${url}`)
                                                            .then((res) => res.json())
                                                            .then((data) => {
                                                                console.log(data)
                                                                return fetchedChoices = data
                                                            })
                                                    }
                                                     
                                                    fetchData()
                                                    return (
                                                        <span>
                                                            {fetchedChoices}
                                                        </span>
                                                    )
                                                }
                                                
                                            })
                                        }
                                        
                                    </div>
                                )
                            }else if(option.from.option_set_type === 'equip_category'){
                                //needs fetch from 'option.from.equipment_category.url'
                                //still has 'choose'
                                
                            }
                        })}
                    </div>
                
            )
            // setPrimaryOptionsDiv(
                // <div>
                //     <strong>{character.class.primary.className} Equipment Options</strong>
                //     {primaryEquipOptions.map((choice, i) => {
                //         console.log('choice', choice)
                //         return(
                //         <div>
                //             {/* option_type */}
                //             {console.log('choice', choice)}
                //             {/* {choice.from.options[0].option_type} */}
                //             {
                                
                //             }
                //             {choice?.from?.options.map((option) => {
                //                 console.log('choice.from.options', option)

                //                 if(option.option_type === 'counted_reference'){
                //                     return(
                //                         <p>
                //                             {option.count} {option.of.name}
                //                         </p>
                //                     )
                //                 }
                                // else if(option.option_type === 'choice'){

                                //     let equipChoice

                                //     console.log(option?.choice?.from?.equipment_category?.url)
                                //     fetch(`https://www.dnd5eapi.co${option?.choice?.from?.equipment_category?.url}`)
                                //     .then((res) => res.json())
                                //     .then((data) => {
                                        
                                //         console.log({data})
                                //         equipChoice = data
                                //         console.log(equipChoice?.equipment)
                                //     })
                                //     console.log(equipChoice?.equipment)
                                //     return(
                                //         <div>
                                //             {option.choice.from.equipment_category.name}
                                //             {equipChoice?.equipment.map((item, i) =>{

                                //                 return(
                                //                     <p>
                                //                         hello
                                //                         {item.name}
                                //                     </p>
                                //                 )
                                //             })}
                                //         </div>
                                //     )
                                // }
            //                     return(
            //                         <p>
            //                             {option.count} 
            //                         </p>
            //                     )
            //                 })}
            //             </div>
            //             )
            //         })}
            //     </div>
            // )
        }
    }, [primaryEquip, primaryEquipOptions])

    return(
        <div>
            {primaryEquipDiv}
            {primaryOptionsDiv}
        </div>
    )
}