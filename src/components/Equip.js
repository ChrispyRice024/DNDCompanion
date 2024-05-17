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
                console.log(data.starting_equipment)

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
        
        console.log(primaryEquip)
        console.log(primaryEquipOptions)
        
    }, [character])

    const [primaryEquipDiv, setPrimaryEquipDiv] = useState()
    const [secondaryEquipDiv, setSecondaryEquipDiv] = useState()

    const [chosenEquipPrimary, setChosenEquipPrimary] = useState([])
    const [chosenequipSecondary, setChosenEquipSecondary] = useState([])

    useEffect(() => {

        console.log(primaryEquipOptions)
        if(primaryEquip.length > 0){
            console.log('number 1')
            setPrimaryEquipDiv(
                <div>
                    <strong>{character.class.primary.className} Starting Equipment</strong>
                    {primaryEquip.map((equip, i) => (
                        <p key={i}>
                        
                            {equip.equipment.name}
                            
                        </p>
                    ))}
                    <div>
                        <strong>{character.class.primary.className} Equipment Options</strong>
                        {primaryEquipOptions.map((option, i) => {

                            const isChecked = chosenEquipPrimary.includes(option)
                            //you need to map inside of a map
                            //option is an object 
                            //option.from.options has the sets you can choose from.
                            //there are multiple sets
                            
                            //be sure to include the counted reference when 
                            //saving the data to the character model

                        })}
                    </div>
                    
                </div>
            )
        }
    }, [primaryEquip, secondaryEquip])

    return(
        <div>
            {primaryEquipDiv}
        </div>
    )
}