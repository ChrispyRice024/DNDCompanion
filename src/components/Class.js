import {useState, useEffect} from 'react'

export default function Class ({functions}) {

    const {character, setCharacter} = functions
    
    const [primaryClassData, setPrimaryClassData] = useState('')
    const [secondaryClassData, setSecondaryClassData] = useState('')

    const [classList, setClassList] = useState([])

    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/classes')
        .then((res) => res.json())

        .then((data) => {
            setClassList(data.results)
            console.log(data)
            // console.log(raceList)
        })
        .catch((err) => {
            console.error('Error fetching data: ', err)
        })
    
    }, [])

    useEffect(() => {
        if(primaryClassData !== ''){
        fetch(`https://www.dnd5eapi.co/api/classes/${primaryClassData}`)
            .then(res => res.json())
            .then(data => {
                setCharacter(prevCharacter => ({
                    ...prevCharacter,
                    proficiencies:{
                        ...prevCharacter.proficiencies,
                        classProficiencies:{
                            ...prevCharacter.proficiencies.classProficiencies,
                            primary:{
                                name:data.name,
                                classProficiencies: data.proficiencies,
                                availableOptions: data.proficiency_choices
                            }    
                            
                        }
                        
                    },
                    equipment:{
                        ...character.equipment,
                        startingEquipment:data.starting_equipment,
                        equipmentOptions: data.starting_equipment_options
                    },
                    combat:{
                        ...prevCharacter.combat,
                        savingThrows: {
                            savingThrows: data.saving_throws
                        }
                        
                    },
                    class:{
                        ...prevCharacter.class,
                        primary:{
                            name:data.name,
                            className:data.name,
                            url: data.url,
                            combat:{
                                hitDie: data.hit_die
                            },
                            multiClassing: data.multi_classing
                        }
                        
                    }
                }))
                console.log('data', data)
            }).catch(err => {
                console.error('Error ', err)
            })
        }

    }, [primaryClassData])

    useEffect(() => {
        if(secondaryClassData !== ''){
        fetch(`https://www.dnd5eapi.co/api/classes/${secondaryClassData}`)
            .then(res => res.json())
            .then(data => {
                setCharacter(prevCharacter => ({
                    ...prevCharacter,
                    class:{
                        ...prevCharacter.class,
                        secondary: data
                    }
                }))
                console.log({data})
                console.log({character})
            }).catch(err => {
                console.error('Error ', err)
            })
        }

    }, [secondaryClassData])

    const verifyInput = (e) => {
        const input = e.target.value
        const inputName = e.target.name
        console.log(character.class)
        const compare = classList.some(element => element.name === input) || classList.some(element => element.name.toLowerCase() === input)
        if(inputName === 'primaryClass' && compare){
            setPrimaryClassData(input.toLowerCase())
        }else if(inputName === 'secondaryClass' && compare){
            setSecondaryClassData(input.toLowerCase())
        }
        // else{
        //     input = ''
        // }
    }

    return(
        <div>
            <div>
                <label htmlFor='primaryClass'>Primary Class</label>
                <input name='primaryClass' list='primaryClassList' onChange={verifyInput} autoComplete='on' id='primaryClass' className='class' placeholder='Class' />
                <datalist id='primaryClassList'>
                    {classList.map((race, i) => (
                        <option
                        key={i}
                        value={race.name}/>
                    ))}
                </datalist>
            </div>
            <div>
            <label htmlFor='secondaryClass'>Secondary Class</label>
                <input name='secondaryClass' list='secondaryClassList' autoComplete='on' onChange={verifyInput} id='secondaryClass' className='class' placeholder='Class' />
                <datalist id='secondaryClassList'>
                    {classList.map((race, i) => (
                        <option
                        key={i}
                        value={race.name}/>
                    ))}
                </datalist>
            </div>
        </div>
    )
}