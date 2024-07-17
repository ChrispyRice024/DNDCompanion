    import {useState, useEffect} from 'react'

    export default function ClassFeatures ({functions}){

        const {fetchData, setFetchData} = functions
        console.log(fetchData)

        const features = fetchData?.primary_class?.features
        const classSpecific = fetchData?.primary_class?.level_data?.[0]?.class_specific

        const isHidden = fetchData?.primary_class?.name ? '' : 'none'

        return(
            <div id='feature_parent' style={{display:isHidden}} >
                <div id='feature'>
                    {features?.map((feature, i) => {
                        return(
                            <span key={i}>
                                <strong>{feature?.name}</strong>
                                {feature?.desc?.map((desc, j) => (
                                    <p key={j}>
                                        {desc}
                                    </p>
                                ))}
                            </span>
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