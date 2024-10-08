    import {useState, useEffect} from 'react'

    export default function ClassFeatures ({functions}){

        const {fetchData, setFetchData} = functions
        // console.log(fetchData)

        const features = fetchData?.primary_class?.features
        const classSpecific = fetchData?.primary_class?.level_data?.[0]?.class_specific
        const [results, setResults] = useState([])

        const [featureData, setFeatureData] = useState([])

        const featuresList = features ? features?.map((feature) => {
            if (feature?.feature_specific?.subfeature_options) {
                return feature?.feature_specific?.subfeature_options?.from?.options?.map(option => {
                    // console.log('option in map', option)
                    return option?.item?.url
                })
            } else {
                return 'null_string'
            }
        }) : undefined

        useEffect(() => {
            console.log('hello')
            
            
            const featureFetch = async () => {
                 
                const optionsFetch = async (options, index) => {
                    try {
                        console.log(...fetchData.primary_class.features)
                        console.log('hello', index)
                        const fetchUrls = options.map(async (url) => {
                            const res = await fetch(`https://dnd5eapi.co${url}`)
                            if (!res) {
                                console.error(`failed to fetch for ${url}`)
                            }

                            return await res.json()
                        })
                        console.log(fetchUrls)

                        const data = await Promise.all(fetchUrls)
                        if (index === 0) {
                            console.log('hello', index)
                        }
                        console.log(data)
                        const featureLocation = fetchData?.primary_class?.features
                        console.log(featureLocation)
                        const newFeatures = featureLocation?.map((feature, i) => {
                            if (i === index && feature.feature_specific) {
                                return feature.feature_specific.subfeature_options.from.options.map((entry, j) => {
                                    console.log(entry)
                                    return data[j]
                                })
                            } else {
                                return feature
                            }
                        })
                        setFetchData(prevData => ({
                            ...prevData,
                            primary_class: {
                                ...prevData.primary_class,
                                features: [
                                    ...fetchData.primary_class.features.map((feature, i) =>
                                        index === i ?
                                            {
                                                ...feature,
                                                feature_specific: {
                                                    ...feature.feature_specific,
                                                    subfeature_options:{
                                                        ...feature.feature_specific.subfeature_options,
                                                        from:{
                                                            ...feature.feature_specific.subfeature_options.from,
                                                            options: data
                                                        }
                                                    }
                                                }
                                            } : feature
                                    )

                                ]
                            }
                        }))
                        console.log('newFeatures', newFeatures)
                        console.log('hello')
                        console.log('fetchUrls', fetchUrls)
                    } catch (err) {
                        console.error(err)
                        console.log('error')
                    }

                }

                    featuresList?.map((options, i) => {
                            optionsFetch(options, i)
                    })
                }

            if(fetchData.primary_class?.name){
                featureFetch()
            }
            

        }, [fetchData?.primary_class?.name])

        const handleChange = (e, option, i) => {
            const beenChecked = e.target.checked

            if(beenChecked){
                setFetchData(prevData => ({
                    ...prevData,
                    primary_class:{
                        ...prevData.primary_class,
                        chosen_features:{
                            [`feature_${i}`]:[
                                ...(prevData.primary_class.chosen_features?.[`feature_${i}`] || []),
                                option
                            ]
                        }
                    }
                }))
            }
        }

        const isHidden = fetchData?.primary_class?.name ? '' : 'none'

        return(
            <div id='feature_parent' style={{display:isHidden}} >
                <div>
                    {features?.map((feature, i) => {
                        return(
                            <div className='feature' key={i}>
                                <p className='feature_title'>
                                    <strong>{feature?.name}</strong>
                                </p>
                                {feature?.desc?.map((desc, j) => (
                                    <p key={j}>
                                        {desc}
                                    </p>
                                ))}
                                {feature?.feature_specific?.subfeature_options ? 
                                    <div>
                                        <p>
                                            Choose {feature.feature_specific.subfeature_options.choose}
                                        </p>
                                        {feature.feature_specific.subfeature_options.from.options.map((option, j) => {
                                            
                                            const chosenFeatures = fetchData?.primary_class?.chosen_features?.[`feature_${i}`]
                                            const maxFeatures = feature.feature_specific.subfeature_options.choose
                                            
                                            const isChecked = chosenFeatures?.some(obj => obj.index === option.index)
                                            const isDisabled = chosenFeatures?.length >= maxFeatures && !isChecked
                                            return(
                                                <div className='feature_choices'>
                                                    <p>
                                                        <input
                                                            type='checkbox'
                                                            name={`featureChoice_${i}_${j}`}
                                                            onChange={(e) => { handleChange(e, option, i) }}
                                                            disabled={isChecked ? false : isDisabled} />
                                                        <label htmlFor={`featureChoice_${i}_${j}`}>{option.name}</label>
                                                    </p>
                                                    <p>
                                                        {option.desc}
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                :''}
                            </div>
                        )
                    })}
                </div>
                {/* SPELL SLOTS */}

                <div id='class_specific'>
                    {/* IF MONK */}
                    {fetchData?.primary_class?.name === 'Monk' ?
                        `Key Points: ${classSpecific?.ki_points} |
                        Martial Arts Die: ${classSpecific?.martial_arts?.dice_count}d${classSpecific?.martial_arts?.dice_value}
                        `    
                    :''}
                    {/* IF BARBARIAN */}
                    {fetchData?.primary_class?.name === 'Barbarian' ? 
                    <p>
                        <strong>Rage Counters:</strong> {classSpecific?.rage_count} | 
                        <strong>Rage Damage Bonus:</strong> {classSpecific?.rage_damage_bonus}
                    </p>
                        
                    :''}
                    {/* IF ROUGE */}
                    {fetchData?.primary_class?.name === 'Rogue' ? 
                        <p>
                            <strong>Sneak Attack: </strong> {classSpecific?.sneak_attack?.dice_count}d{classSpecific?.sneak_attack?.dice_value}
                        </p>
                    :''}
                    {/* IF SORCERER */}
                    {fetchData?.primary_class?.name === 'Sorcerer' ? 
                        <p>
                            <strong>Unfortunatley, there are no Sorcerous Origin options available from the Systems Reference Document</strong>
                        </p>
                    :''}
                    {fetchData?.primary_class?.name === 'Wizard' ? 
                        <p>
                            <strong>Arcane Recovery Levels: </strong>{classSpecific?.arcane_recovery_levels}
                        </p>
                    :''}
                </div>
            </div>
        )
    }