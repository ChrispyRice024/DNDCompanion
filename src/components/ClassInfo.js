import {useState, useEffect} from 'react'

export default function ClassInfo ({functions}) {

    const {character} = functions

    const primaryInfo = character?.class?.primary ? character?.class?.primary : {}
    const secondaryInfo = character?.class?.secondary ? character?.class?.secondary : {}

    const [classStats, setClassStats] = useState(null)

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

    useEffect(() => {

        const getClassStats = () => {

            const divsToDisplay = []

            const primary = character?.class?.primary
            const isPrimaryEmpty = Object.keys(character?.class?.primary).length === 0
    
            const secondary = character?.class?.secondary
            const isSecondaryEmpty = Object.keys(character?.class?.secondary).length === 0
            
            const decideStyle = !isPrimaryEmpty || !isSecondaryEmpty ? '' : 'none'
            console.log({decideStyle})
            const getProficiencies = () => {
                
                const proDivs = []
                
                console.log({divsToDisplay})

                const getName = (div) => {
                    if(div === 0){
                        return `${primary.name}`
                    }else{
                        return `${secondary.name}`
                    }
                }


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
                        </p>
                    )))
                }else if(!isPrimaryEmpty && !isSecondaryEmpty){
                    proDivs.push(primary?.proficiencies.map((proficiencies, i) =>(
                        <p key={i} id='primaryPro' className='classProficiencies'>
                            {proficiencies.name} 
                        </p>
                    )))

                    proDivs.push(secondary?.proficiencies.map((proficiencies, i) =>( 
                        <p key={i} id='secondaryPro' className='classProficiencies'>
                            {proficiencies.name}
                        </p>
                    )))
                }

                return (
                    <div>
                        <div id='proficiencies'>
                            <strong className='title'>Proficiencies</strong>
                        </div>
                        {
                            proDivs.map((element, i) => (
                                <div id={`proficiencies${i}`} key={i}>
                                    <strong>{getName(i)}</strong>
                                        {element}
                                </div>
                            ))
                        }
                    </div>
                )
                console.log({isSecondaryEmpty})

            }
        
            const getProChoices = () => {
    
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
    
            return(
                <div style={{display: decideStyle}} id='proficiencies'>
                    <div>
                        {getProficiencies()}
                    </div>
                    
                </div>
            )
        }

        setClassStats(getClassStats)
        console.log({classStats})
    }, [character.class])
    


    return (
        <div key={'classStats'}>
            {classStats}
        </div>
    )
}