import {useState, useEffect} from 'react'

export default function Class ({functions}) {

    const {character, setCharacter} = functions
    
    const [primaryClassData, setPrimaryClassData] = useState('')
    const [secondaryClassData, setSecondaryClassData] = useState('')

    const [urlList, setUrlList] = useState([])
    const [classList, setClassList] = useState([])
    const [multiClassData, setMultiClassData] = useState([])

    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/classes')
        .then((res) => res.json())

        .then((data) => {
            setClassList(data.results)
            console.log(data)
            classList.map((className, i) => {
                setUrlList(className.url)
            })
            console.log(urlList)
        })
        .catch((err) => {
            console.error('Error fetching data: ', err)
        })
    }, [character])



    useEffect(() => {
        if(primaryClassData !== ''){
        fetch(`https://www.dnd5eapi.co/api/classes/${primaryClassData}`)
            .then(res => res.json())
            .then(data => {
                console.log('Class.js', {data})
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
                        ...prevCharacter.equipment,
                        startingEquipment:data.starting_equipment,
                        equipmentOptions: data.starting_equipment_options
                    },
                    combat:{
                        ...prevCharacter.combat,
                        savingThrows: {
                            primaryClass: data.saving_throws
                        }
                        
                    },
                    class:{
                        ...prevCharacter.class,
                        primary:{
                            className:data.name,
                            classIndex: data.index,
                            url: data.url,
                            combat:{
                                hitDie: data.hit_die,
                                spellcasting: {
                                    ...prevCharacter.class.primary.combat.spellcasting,
                                    info: data?.spellcasting?.info,
                                    level:data?.spellcasting?.level,
                                    spellCastingAbility: data?.spellcasting?.spellcasting_ability
                                }
                            },
                            multiClassing: data.multi_classing
                        }
                        
                    }
                }))
                // console.log('data', data)
            }).catch(err => {
                console.error('Error ', err)
            })
        }

    }, [primaryClassData])

    useEffect(() => {
        const fetchData = async () => {
            if(classList.length > 0){
                try{
                    const res = await Promise.all(classList.map(url=> fetch(`https://www.dnd5eapi.co${url.url}`)))
                    const data = await Promise.all(res.map(res => res.json()))
                    console.log('hello', data)
                    

                    const updates = data.map((entry) => ({
                        name:entry.name,
                        multi_classing:entry.multi_classing
                    }))

                    setMultiClassData(updates)
                    // setMultiClassData((prevData) => {
                    //     const updates = data.reduce((acc, entry) => {
                    //         acc[entry.name] = entry.multi_classing
                    //         return acc
                    //     }, {})

                    //     return{
                    //         ...prevData,
                    //         ...updates
                    //     }
                    // })
                }catch(err){
                    console.error(err)
                }
            }
        }

        fetchData()
    }, [primaryClassData])

    useEffect(() => {
        console.log(classList)

        console.log('multiClassData', multiClassData)

        console.log(multiClassData)
    },[classList])
    useEffect(() => {

        const canMultiClass = character.class.primary.multiClassing
        console.log(canMultiClass)
        if(secondaryClassData !== ''){
        fetch(`https://www.dnd5eapi.co/api/classes/${secondaryClassData}`)
            .then(res => res.json())
            .then(data => {
                setCharacter(prevCharacter => ({
                    ...prevCharacter,
                    proficiencies:{
                        ...prevCharacter.proficiencies,
                        classProficiencies:{
                            ...prevCharacter.proficiencies.classProficiencies,
                            secondary:{
                                name:data.name,
                                classProficiencies: data.proficiencies,
                                availableOptions: data.proficiency_choices
                            }
                        }
                    },
                    equipment:{
                        ...prevCharacter.equipment,
                        startingEquipment:data.starting_equipment,
                        equipmentOptions: data.starting_equipment_options
                    },
                    combat:{
                        ...prevCharacter.combat,
                        savingThrows:{
                            secondaryClass:data.saving_throws
                        }
                    },
                    class:{
                        ...prevCharacter.class,
                        secondary:{
                            className:data.name,
                            url:data.url,
                            combat:{
                                hitDie: data.hit_die,
                                spellcasting: data.spellcasting
                            },
                            multiClassing:data.multi_classing
                        }
                    }
                }))
                // console.log({data})
                // console.log({character})
            }).catch(err => {
                console.error('Error ', err)
            })
        }

    }, [secondaryClassData])

    const verifyInput = (e) => {
        const input = e.target.value
        const inputName = e.target.name
        
        const compare = classList.some(element => element.name === input) || classList.some(element => element.name.toLowerCase() === input)
        
        if(inputName === 'primaryClass' && compare){
            setPrimaryClassData(input.toLowerCase())
        
        }else if(inputName === 'secondaryClass' && compare){
            setSecondaryClassData(input.toLowerCase())
        }
    }

    const decidePrerequisites = () => {

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
                    {
                        multiClassData.map((classData, i) => {
                            let text = classData.name
                            console.log(classData?.multi_classing?.prerequisites?.length)
                            if(classData?.multi_classing?.prerequisites?.length){
                                text += ' -Requires'
                                text += classData?.multi_classing?.prerequisites.map(req => {
                                    return`${req.minimum_score} ${req.ability_score.name}`
                                }).join(', ')
                                console.log(text)
                            }
                            return(
                                <option value={classData.name}>{text}</option>
                            )
                        })
                    }
                </datalist>
            </div>
        </div>
    )
}