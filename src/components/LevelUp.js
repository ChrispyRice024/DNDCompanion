import React from 'react'
import { useState, useEffect } from 'react'


export default function LevelUp ({functions}) {

    const {char, setIsLevelingUp, charChanges} = functions

    const [leveledChar, setLeveledChar] = useState(char)

    // HIT DIE
    const [hitDieRoll, setHitDieRoll] = useState(0)
    const [dieRollValue, setDieRollValue] = useState({
        hitDie:0,
    })


    // LEVEL DATA
    const classLevel = (charClass, lvl) => {
        if(charClass === char.primary_class.name){
            console.log('levelData', char.primary_class.level_data[lvl-1])
            return char.primary_class.level_data[lvl]
        }else{
            // Object.keys(char.secondary_classes)
        }
    }

    // CLASS lIST AND CLASS DATA
    const [classList, setClassList] = useState([])
    const [classListData, setClassListData] = useState([])
    useEffect(() => {

        const dataFetch = async (url) => {
            console.log(url)
            if(Array.isArray(url)){
                // PROMISE.ALL
                const multiRes = url.map( async endpoint => {
                    const res = await fetch(`https://www.dnd5eapi.co${endpoint.url}`)
                    const data = await res.json()
                    return data
                })
                const multiData = await Promise.all(multiRes)
                console.log(multiData)
                setClassListData(multiData)
            }else{
                // SINGLE PROMISE
            }
        }

        const classListFetch = async () => {
            try{
                const res = await fetch(`https://www.dnd5eapi.co/api/classes`)
                const data = await res.json()
                console.log(data)
                setClassListData(data.results)
                dataFetch(data.results)
            }catch(err){
                console.error(err)
            }
        }
        classListFetch()
    }, [])

    // PREREQUISITES
    useEffect(() => {
        const prerequisiteSetter = () => {
            let list = []
            classListData.map((item, i) => {
                let text
                text = item.name
                console.log(item.multi_classing)

                text += ' - Requires '

                if (item?.multi_classing?.prerequisites) {
                    text += item?.multi_classing?.prerequisites?.map((pre, j) => {
                        return `${pre.minimum_score} ${pre.ability_score.name}`
                    }).join(' AND ')
                } else if (item?.multi_classing?.prerequisite_options) {
                    text += item.multi_classing.prerequisite_options.from.options.map((option, j) => {
                        console.log('option', option.ability_score.name)
                        return `${option.minimum_score} ${option.ability_score.name}`
                    }).join(' OR ')
                } else {
                    return 'needs another else'
                }
                list.push(text)
            })
            console.log('text', list)
            setClassList(list)
            console.log(classList)
        }
        prerequisiteSetter()
    }, [classListData])

    // STAT INCREASE (MAINLY DEALS WITH NUMBERS)
    const increaseStats = (e, statKey, newValue) => {
        if(statKey === 'hp'){
            setLeveledChar(prevChar => ({
                ...prevChar,
                hp: parseInt(prevChar.hp + newValue)
            }))
        }
        
    }

    // DIE ROLLER
    const reRoll = (die, targetKey) => {
        const rollDie = Math.floor(Math.random() * (die) + 1)
        console.log('rollDie', rollDie)
        setDieRollValue(prevValue => ({
            ...prevValue,
            [targetKey]: rollDie
        }))
    }

    // MULTICLASSING
    // FETCHING THE LEVEL DATA FOR THE NEW CLASS
    const fetchLevels = async (url) => {
        console.log('url', url)
        try{
            const res = await fetch(`https://www.dnd5eapi.co${url}`)
            const data = await res.json()
            console.log(data)
        }catch(err){
            console.error(err)
        }
    }
    
    const [prevMulticlassValue, setPrevMulticlassValue] = useState()
    const [isMulticlassing, setIsMulticlassing] = useState(false)
    const [leveledClass, setLeveledClass] = useState(char.primary_class)

    const handleMultiClass = (e) => {

        const newClass = classListData.find(x => e.target.value.includes(x.name))
        console.log(newClass)
        setLeveledClass(newClass)
        
        // DURRING *THIS* LEVEL UP YOU HAVE ONLY SELECTED A MULTICLASS ONCE
        // WITHOUT CHANGING YOUR SELECTION
        if (leveledChar.multiclass && prevMulticlassValue === undefined){
            console.log('if undefined')
            setLeveledChar(prevChar => ({
                ...prevChar,
                multiclass: [
                    ...prevChar.multiclass,
                    newClass
                ]
            }))
        //DURRING *THIS* LEVEL UP YOU HAVE CHANGED THE SELECTION OF YOUR NEW CLASS
        } else if (leveledChar.multiclass && prevMulticlassValue && !char?.multiclass?.some(x => x.name === newClass.name) && !newClass.name === char.primary_class.name){
            console.log('else if')
            setLeveledChar(prevChar => ({
                ...prevChar,
                multiclass:[
                    ...prevChar.multiclass.filter(x => x.name !== prevMulticlassValue.name),
                    newClass
                ]
            }))
        
        //WHEN YOU TRY TO SELECT A CLASS YOU ALREADY HAVE
        }else if(newClass.name === char.primary_class.name || char?.multiclass?.some(x => x.name === newClass.name)){
            console.log('included')
        // THIS IS YOUR FIRST MULTICLASS
        }else{
            console.log('else')
            console.log('leveledChar', leveledChar)
            setLeveledChar(prevChar => ({
                ...prevChar,
                multiclass:[
                    newClass
                ]
            }))
        }
        // FETCHES THE LEVEL DATA FOR THE NEW CLASS
        fetchLevels(newClass.class_levels)
        // SAVES THE PREVIOUS VALUE OF THE MULTICLASS INPUT
        setPrevMulticlassValue(classListData.find(x => e.target.value.includes(x.name)))
        console.log('newClass', newClass)
    }
    useEffect(() => {
        console.log('leveledChar', leveledChar)
        console.log(prevMulticlassValue)
    }, [leveledChar])

    const multiClassSpellSlotsTable = {
        level_1: {
            lvl_1: 2,
            lvl_2: 0,
            lvl_3: 0,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_2: {
            lvl_1: 3,
            lvl_2: 0,
            lvl_3: 0,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_3: {
            lvl_1: 4,
            lvl_2: 2,
            lvl_3: 0,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_4: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 0,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_5: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 2,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_6: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_7: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 1,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_8: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 2,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_9: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 1,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_10: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_11: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_12: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_13: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_14: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_15: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 1,
            lvl_9: 0,
        },
        level_16: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 1,
            lvl_9: 0,
        },
        level_17: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 1,
            lvl_9: 1,
        },
        level_18: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 3,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 1,
            lvl_9: 1,
        },
        level_19: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 3,
            lvl_6: 2,
            lvl_7: 1,
            lvl_8: 1,
            lvl_9: 1,
        },
        level_20: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 3,
            lvl_6: 2,
            lvl_7: 2,
            lvl_8: 1,
            lvl_9: 1,
        }

    }

    console.log(char)

    return(
        <div>
            {/* HEALTH AND HIT DICE */}
            <div>
                {/* YOU GAIN A NEW HIT DIE EACH CHARACTER LEVEL */}
                <strong>Roll Your Hit-Die or Use the Built-in Roller</strong>
                <p>
                    Hit-Die({char.primary_class.hit_die}) + Con Mod({char.mods.con})
                </p>
                <button onClick={(e) => { reRoll(8, 'hitDie') }}>Roll Hit-Die</button>
                <input
                    type='number'
                    name='hp'
                    onChange={(e) => {
                        increaseStats(e, 'hp', e.target.value)
                    }}
                    value={dieRollValue.hitDie}
                    />
                + {char.mods.con} + {char.hp} = {parseInt(dieRollValue.hitDie + char.mods.con + char.hp)}
            </div>

            {/* MULTICLASSING */}
            <div>
                <p>
                    Check if You Would Like To Multi-Class
                    <input
                        type='checkbox'
                        name='isMulticlassing'
                        onChange={(e) => {setIsMulticlassing(e.target.checked)}} />
                </p>
                {isMulticlassing ? 
                    <p>
                        <select name='multiClass' onChange={(e) => { handleMultiClass(e) }} id='multi_class_list' defaultValue=''>
                            <option value='' disabled>Multi-Class?</option>
                            {classList.map((item, i) => {

                                return (
                                    <option>
                                        {item}
                                    </option>
                                )
                            })}
                        </select>
                    </p>
                :''}
                
            </div>
            {/* CLASS LEVELS */}
            <div>
                
            </div>
        </div>
    )
}