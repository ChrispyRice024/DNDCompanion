import React from 'react'
import { useState, useEffect } from 'react'


export default function LevelUp ({functions}) {

    const {char, setIsLevelingUp, charChanges, decideAc} = functions

    const [leveledChar, setLeveledChar] = useState(char)


    // HIT DIE
    const [hitDieRoll, setHitDieRoll] = useState(0)
    const [dieRollValue, setDieRollValue] = useState({
        hitDie:0,
    })
    // CLASS lIST AND CLASS DATA
    const [classList, setClassList] = useState([])
    const [classListData, setClassListData] = useState([])
    const [selectedClass, setSelectedClass] = useState(char.primary_class)
    const [isMulticlassing, setIsMulticlassing] = useState(false)
    const [fetchData, setFetchData] = useState()

    // USING THE CURRENT LEVEL TO FIND THE INDEX, THEN UPDATING THE LEVEL AT THE END OF LEVEL UP
    const levelData = selectedClass?.level_data?.[selectedClass.level]

    // INITIAL FETCH
    useEffect(() => {

        const classListFetch = async () => {
            try {
                //FETCHING CLASS LIST
                const res = await fetch(`https://www.dnd5eapi.co/api/classes`)
                const data = await res.json()

                //FETCHING CLASS DETAILS
                const multiRes = await data.results.map(async endpoint => {
                    const res = await fetch(`https://www.dnd5eapi.co${endpoint.url}`)
                    const data = await res.json()
                    return data
                })
                const multiData = await Promise.all(multiRes)

                const levelRes = multiData.map( async (item) => {
                    //FETCH THE LEVELS FOR EACH CLASS
                    const levelFetch = await fetch(`https://www.dnd5eapi.co${item.class_levels}`)
                    const levelData = await levelFetch.json()

                    item.level_data = levelData

                    //FETCH THE FEATURES FOR EACH LEVEL
                    for (const level of item.level_data){
                        level.features = await Promise.all(level.features.map(async feature => {
                            const res = await fetch(`https://www.dnd5eapi.co${feature.url}`)
                            const data = await res.json()
                            return data
                        }))

                    }
                    return item
                })
                const levelData = await Promise.all(levelRes)
                const spellRes = multiData.map( async (item) => {
                    if(item.spells){
                        const res = await fetch(`https://www.dnd5eapi.co${item.spells}`)
                        const data = await res.json()

                        item.spells = data.results
                        return data
                    }
                })

                setClassListData(multiData)
                
                return multiData
            } catch (err) {
                console.error(err)
            }
        }
        classListFetch()
    }, [])

    const dataFetch = async (url, setData, targetKey) => {
        console.log(url)
        if(Array.isArray(url)){
            // PROMISE.ALL
            const multiRes = url.map( async endpoint => {
                const res = await fetch(`https://www.dnd5eapi.co${endpoint.url}`)
                const data = await res.json()
                return data
            })
            const multiData = await Promise.all(multiRes)
            if(setData){
                setData(multiData)
            }
            return multiData
            
        }else{
            // SINGLE PROMISE
            const res = await fetch(`https://www.dnd5eapi.co${url}`)
            const data = await res.json()

            setData(prevData => ({
                ...prevData,
                [targetKey]:data
            }))
        }
    }

    // PREREQUISITES
    useEffect(() => {
        const prerequisiteSetter = () => {
            let list = []
            classListData.map((item, i) => {
                let text
                text = item.name
                text += ' - Requires '

                if (item?.multi_classing?.prerequisites) {
                    text += item?.multi_classing?.prerequisites?.map((pre, j) => {
                        return `${pre.minimum_score} ${pre.ability_score.name}`
                    }).join(' AND ')
                } else if (item?.multi_classing?.prerequisite_options) {
                    text += item.multi_classing.prerequisite_options.from.options.map((option, j) => {
                        return `${option.minimum_score} ${option.ability_score.name}`
                    }).join(' OR ')
                } else {
                    return 'needs another else'
                }
                list.push(text)
            })

            setClassList(list)
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
        setDieRollValue(prevValue => ({
            ...prevValue,
            [targetKey]: rollDie
        }))
        setLeveledChar(prevChar => ({
            ...prevChar,
            hp:parseInt(char.hp + rollDie + char.mods.con)
        }))
        console.log(leveledChar)
    }

    // MULTICLASSING
    // FETCHING THE LEVEL DATA FOR THE NEW CLASS
    const fetchLevels = async (url) => {
        try{
            const res = await fetch(`https://www.dnd5eapi.co${url}`)
            const data = await res.json()
        }catch(err){
            console.error(err)
        }
    }

    const [prevMulticlassValue, setPrevMulticlassValue] = useState()

    const handleMultiClass = (e) => {
        
        // dataFetch(e.target)
        const newClass = classListData.find(x => e.target.value.includes(x.name))
        newClass.level = 0

        setSelectedClass(newClass)

        // DURRING *THIS* LEVEL UP YOU HAVE ONLY SELECTED A MULTICLASS ONCE
        // WITHOUT CHANGING YOUR SELECTION
        if (leveledChar.multiclass && prevMulticlassValue === undefined){
            setLeveledChar(prevChar => ({
                ...prevChar,
                multiclass: [
                    ...prevChar.multiclass,
                    newClass
                ]
            }))
        //DURRING *THIS* LEVEL UP YOU HAVE CHANGED THE SELECTION OF YOUR NEW CLASS
        } else if (leveledChar.multiclass && prevMulticlassValue && !char?.multiclass?.some(x => x.name === newClass.name) && !newClass.name === char.primary_class.name){
            console.log('changed')
            setLeveledChar(prevChar => ({
                ...prevChar,
                multiclass:[
                    ...prevChar.multiclass.filter(x => x.name !== prevMulticlassValue.name),
                    newClass
                ]
            }))
        
        //WHEN YOU TRY TO SELECT A CLASS YOU ALREADY HAVE
        }else if(newClass.name === char.primary_class.name || char?.multiclass?.some(x => x.name === newClass.name)){
            console.log('already have')
            // THIS IS YOUR FIRST MULTICLASS
        }else{
            console.log('first')
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
    }

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
    const [selectedChoices, setSelectedChoices] = useState([])
     
    const handleOptionChange = (e, choice) => {
        const beenChecked = e.target.checked
        
        if(beenChecked){
            setSelectedChoices(prevSelection => ([
                ...prevSelection,
                choice
            ]))
            setLeveledChar(prevChar => ({
                ...prevChar,
                multiclass:prevChar?.multiclass?.map(x => 
                    x.name === choice.class.name
                    ? {...x, features:x.features
                        ? [...x.features, choice]
                        :[choice]
                    }:x
                )
            }))
        }else if(!beenChecked){
            setSelectedChoices(prevSelection => (
                prevSelection.filter(x => x.name !== choice.name)
            ))
            setLeveledChar(prevChar => ({
                ...prevChar,
                multiclass:prevChar?.multiclass?.map(x =>
                    x.name === choice.class.name
                    ?{...x, features:x.features.filter(x => x.name !== choice.name)}
                    :[choice]
                )
            }))
        }
        
    }

    const renderFeatures = () => {
        const features = levelData?.features
        // console.log(levelData)
        return(
            <div id='features_lvl'>
                <h3>{selectedClass.name} Class Features</h3>
                <div>
                    {features?.map((feature, i) => (
                        <div key={i}>
                            <p className='feature_title_lvl'>
                                <strong>{feature?.name}</strong>
                            </p>
                            {feature?.prerequisites?.length > 0 ?
                                <div className='feature_pre_lvl'>
                                    {feature?.prerequisites?.map((pre, j) => {
                                        if(pre.type === 'ability_score'){
                                            return (
                                                <p>
                                                    Requires {pre?.minimum_score} {pre?.ability_score?.name} {feature.prerequisites.length = j+1 ? ' | ':''}
                                                </p>
                                            )
                                        }
                                        
                                    })}
                                </div>
                            :''}
                            <div>
                                {feature?.desc?.map(desc => (
                                    <p className='feature_desc_lvl'>
                                        {desc}
                                    </p>
                                ))}
                            </div>
                            <div>
                                {feature?.feature_specific?.subfeature_options ? 
                                    <div className='subfeature_option_parent_lvl'>
                                        <h3>Choose {feature?.feature_specific?.subfeature_options.choose} of the following</h3>
                                        {feature?.feature_specific?.subfeature_options?.from?.options?.map((option, i) => {

                                            if(!fetchData?.[`subfeature_option_${i}`]){
                                                dataFetch(option.item.url, setFetchData, `subfeature_option_${i}`)
                                            }
                                            const choice = fetchData?.[`subfeature_option_${i}`]

                                            const chosenFeatures = selectedClass?.features
                                            const max = feature?.feature_specific?.subfeature_options.choose
                                            console.log('choice', max)
                                            const isFalse = selectedChoices.length >= max
                                            const isDisabled = selectedChoices.length >= max && !selectedChoices?.some(obj => obj?.name === choice?.name)
                                            console.log(selectedChoices, isFalse, isDisabled, choice)
                                            return(
                                                <div className='subfeature_option'>
                                                    <p>
                                                        <input
                                                            type='checkbox'
                                                            name='subfeature'
                                                            disabled={isDisabled}
                                                            onChange={(e) => {
                                                                handleOptionChange(e, choice)
                                                            }}/>
                                                        <strong>{choice?.name}</strong>
                                                    </p>
                                                    <p>
                                                        {choice?.desc?.map(desc => (
                                                            <p>
                                                                {desc}
                                                            </p>
                                                        ))}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                :''}
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        )
    }

    const renderProficiencies = () => {
        const proficiencies = selectedClass.multi_classing.proficiencies
        if(isMulticlassing && selectedClass.name !== char.primary_class.name){
            return (
                <div>
                    <strong>Class Proficiencies</strong>
                    {proficiencies.map(pro => {

                        return (
                            <p>
                                {pro.name}
                            </p>
                        )
                    })}
                </div>
            )
        }
        
    }

    const renderClassSpecifics = () => {

        const classSpecifics = levelData?.class_specific
        if(selectedClass?.name === 'Rogue'){
            return(
                <div>
                    <p>
                        <strong>Sneak Attack: </strong>{classSpecifics?.sneak_attack?.dice_count}d{classSpecifics?.sneak_attack?.dice_value}
                    </p>
                </div>
            )
        }else if(selectedClass?.name === 'Druid'){
            return(
                <div>
                    {classSpecifics?.wild_shape_max_cr > 1 ? 
                        <div>
                            <p>
                                <strong>Max Wild-Shape CR: </strong> {levelData?.class_specific?.wild_shape_max_cr}
                            </p>
                            <p>
                                {classSpecifics?.wild_shape_swim ? 'Can Swim in Wild-Shape' : 'Cannot Swim in Wild-Shape'}
                            </p>
                            <p>
                                {classSpecifics?.wild_shape_fly ? 'Can Fly in Wild-Shape' : 'Cannot Fly in Wild-Shape'}
                            </p>
                        </div>
                    : ''}
                </div>
            )
        }else if(selectedClass?.name === 'Monk'){
            return(
                <div>
                    {classSpecifics?.ki_points > 0 ? 
                        <p>
                            <strong>Ki Points: </strong> {classSpecifics?.ki_points}
                        </p>
                    :''}
                    {classSpecifics?.unarmored_movement > 0 ? 
                    <p>
                            <strong>Unarmored Movement: </strong> {classSpecifics?.unarmored_movement}
                    </p>:''}
                    <p>
                        <strong>Martial-Arts Die: </strong> {classSpecifics?.martial_arts_die?.dice_count}d{classSpecifics?.martial_arts_die?.dive_value}
                    </p>
                </div>
            )
        }else if(selectedClass?.name === 'Sorcerer'){
            return(
                <div>
                    {classSpecifics?.creating_spell_slots?.map((item, i) =>{

                        return(
                            <p>
                                {item?.sorcery_point_cost} Sorcery Points to Create 1 Level {item?.spell_slot_level} Spell Slot
                            </p>
                        )
                    })}
                    {classSpecifics?.metamagic_known > 0 ? 
                        <p>
                            <strong>Meta-Magic Known: </strong>{classSpecifics?.metamagic_known}
                        </p>
                    :''}
                    {classSpecifics?.sorcery_points > 0 ? 
                        <p>
                            <strong>Sorcery Points: </strong> {classSpecifics?.sorcery_points}
                        </p>
                    :''}
                </div>
            )
        }else{

            return(
                <div>
                    {classSpecifics ? 
                        <div>
                            {Object.entries(classSpecifics)?.map(([key, value], i) => {
                                const newKey = key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
                                return (
                                    <div>
                                        {value > 0 ?
                                            <p>
                                                <strong>{newKey}: </strong> {value}
                                            </p> : ''}
                                    </div>
                                )
                            })}
                        </div>
                    :''}
                </div>
            )
        }
    }

    const [boostedStats, setBoostedStats] = useState([])

    const abilityScoreBonus = () => {
        const {mods:leveledMods, stats:leveledStats} = leveledChar

        const bonus = 2
        // KEEPING TRACK OF HOW MANY TIMES A STAT HAS BEEN RAISED
        const numberOfUps = Object.values(boostedStats).reduce((sum, stat) => sum + (stat?.value || 0), 0)
        
        const handleStatChange = (stat, direction) => {
            // KEEPING TRACK OF THE CURRENT STAT VALUE
            const currentStatValue = leveledStats[stat] || 0
            // KEEPING TRACK OF HOW MANY TIMES A STAT HAS BEEN RAISED
            const boostedStatValue = boostedStats[stat]?.value || 0

            if(direction === 'up' && numberOfUps < bonus){
                updateStat(stat, boostedStatValue + 1, currentStatValue + 1)
            }else if(direction === 'down' && boostedStatValue > 0){
                updateStat(stat, boostedStatValue - 1, currentStatValue - 1)
            }else{
                console.log('nothing')
            }

        }

        const updateStat = (stat, newBoostedStat, newStatValue) => {
            setBoostedStats(prevStats => ({
                ...prevStats,
                [stat]:{value:newBoostedStat}
            }))

            setLeveledChar(prevChar => ({
                ...prevChar,
                stats:{
                    ...prevChar.stats,
                    [stat]:newStatValue
                },
                mods:{
                    ...prevChar.mods,
                    [stat]:Math.floor((newStatValue - 10) / 2)
                }
            }))
        }

        const renderInputs = (statLabel, stat) => (
            <>
                <strong>{statLabel}: </strong> {leveledStats?.[stat]}
                <button onClick={() => { handleStatChange(stat, 'up') }} >↑</button>
                <button onClick={() => { handleStatChange(stat, 'down') }}>↓</button>
            </>
        )

        return(
            <div id='stats_lvl'>
                <p>
                    {renderInputs('STR', 'str')}
                    {renderInputs('INT', 'int')}
                </p>
                <p>
                    {renderInputs('DEX', 'dex')}
                    {renderInputs('WIS', 'wis')}
                </p>
                <p>
                    {renderInputs('CON', 'con')}
                    {renderInputs('CHA', 'cha')}
                </p>
            </div>
        )
    }

    const handleSkills = () => {
        const skills = Object.entries(leveledChar.skills)
        console.log('skills', skills)

        return (
            skills.map(([skill, details], i) => {
                details.value = leveledChar.mods[details.stat]
            return (
                <div id='skills_lvl'>
                    <strong>{skill}: </strong> {details.value}
                </div>
            )
        }))
    }


    const handleSubmit = () => {
        console.log(leveledChar)
    }
    
    return(
        <div id='level_up'>
            {/* HEALTH AND HIT DICE */}
            <div id='health_lvl'>
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
                            <option value='' disabled>{classList.length > 0 ? 'Multi-Class?' : 'Loading Classes'}</option>
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
            <div id='skills_stats_lvl'>
                {/* {abilityBonus()} */}
                <div id='stats_parent_lvl'>
                    {abilityScoreBonus()}
                    <p>
                        <strong>Proficiency Bonus: </strong>{levelData.prof_bonus}{' | '}
                        <strong>AC: </strong>{decideAc(leveledChar)}
                    </p>
                </div>
                <div id='skills_parent_lvl'>
                    {handleSkills()}
                </div>
            </div>
            <div id='bottom_block_lvl'>
                <p>
                    {renderProficiencies()}
                </p>
                <div id='features_specifics_lvl'>
                    {/* CLASS SPECIFICS */}
                    <div id='specifics_parent'>
                        {renderClassSpecifics()}
                    </div>
                    <div id='features_parent'>
                        {renderFeatures()}
                    </div>
                </div>
            </div>
            
            <button onClick={handleSubmit}>Finish Level Up</button>
        </div>
    )
}