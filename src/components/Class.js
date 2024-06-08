import {useState, useEffect} from 'react'

export default function Class ({functions}) {

    const {character, setCharacter, fetchData, setPrimaryClassUrl} = functions
    
    const [primaryClassData, setPrimaryClassData] = useState('')
    const [secondaryClassData, setSecondaryClassData] = useState('')

    const [urlList, setUrlList] = useState([])
    const [classList, setClassList] = useState([])
    const [multiClassData, setMultiClassData] = useState([])

    const [optionDiv, setOptionDiv] = useState()

    const [stall, setStall] = useState(0)

    // sets the list of available classes
    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/classes')
        .then((res) => res.json())

        .then((data) => {
            setClassList(data.results)

            classList.map((className, i) => {
                setUrlList(className.url)
            })
        })
        .catch((err) => {
            console.error('Error fetching data: ', err)
        })
    }, [character])


    // Fetch the primaryClass data after its selected
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

            }).catch(err => {
                console.error('Error ', err)
            })
        }

    }, [primaryClassData])

    useEffect(() => {
        // fetch the multiclass prerequisites
        const fetchData = async () => {
            if(classList.length > 0){
                try{
                    const res = await Promise.all(classList.map(url=> fetch(`https://www.dnd5eapi.co${url.url}`)))
                    const data = await Promise.all(res.map(res => res.json()))

                    const updates = data.map((entry) => ({
                        name:entry.name,
                        multi_classing:entry.multi_classing
                    }))

                    setMultiClassData(updates)
                }catch(err){
                    console.error(err)
                }
            }
        }

        fetchData()
    }, [primaryClassData])

    // MultiClass logic for secondary class
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

            }).catch(err => {
                console.error('Error ', err)
            })
        }

    }, [secondaryClassData])
    console.log(fetchData)
    const verifyInput = (e) => {
        const input = e.target.value
        const inputName = e.target.name
        
        const selectedOption = fetchData.class_list.results.find(
            (item) => item.name === e.target.value
        )


        const compare = classList.some(element => element.name === input) || classList.some(element => element.name.toLowerCase() === input)
        
        if(inputName === 'primaryClass' && compare){
            // setPrimaryClassData(input.toLowerCase())
            // setClassUrl((...prevUrl) =>({
            //     ...prevUrl,
            //     primary:selectedOption.url
            // }))
            setPrimaryClassUrl(selectedOption.url)
        }else if(inputName === 'secondaryClass' && compare){
            setSecondaryClassData(input.toLowerCase())
        }
        //else for either being a wrong value
        console.log(e.target)
    }

    useEffect(() => {
        console.log({fetchData})
        setOptionDiv(
            <div>
                <div>
                    <label htmlFor='primaryClass'>Primary Class</label>
                    <input name='primaryClass' list='primaryClassList' onChange={verifyInput} autoComplete='on' id='primaryClass' className='class' placeholder='Class' />
                    <datalist id='primaryClassList'>
                        {fetchData?.class_list?.results?.map((item, i) => (
                            <option
                            key={i}
                            data-url={item.url}
                            value={item.name}/>
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

                                if(classData?.multi_classing?.prerequisites?.length){
                                    text += ' -Requires'
                                    text += classData?.multi_classing?.prerequisites.map(req => {
                                        return`${req.minimum_score} ${req.ability_score.name}`
                                    }).join(', ')
                
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
        if(stall === 0){
            setStall(1)
        }
    }, [fetchData.class_list])
console.log(classList)
    return(
        <div>
           {optionDiv}
        </div>
    )
}