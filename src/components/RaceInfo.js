import react from 'react'
import {useState, useEffect} from 'react'

export default function RaceInfo({functions}) {

    const {character} = functions

    const primaryInfo = character.misc.primaryRace ? character.misc.primaryRace : {}

    const primaryRaceEmpty = Object.keys(character.misc.primaryRace).length === 0
    const secondaryRaceEmpty = Object.keys(character.misc.secondaryRace).length === 0

    const primaryStyle = primaryRaceEmpty ? 'none' : ''

    useEffect(() => {

    }, [character])

    const renderRaceInfo = (race) => {
        return Object.entries(race).map(([key, val]) => {
            if(typeof val === 'object'){
                return(
                    <div key={key}>
                        <h4>{key}</h4>
                        {renderRaceInfo(val)}
                    </div>
                )
            }else{
                return(
                    <p key={key}>
                        {key}: {val}
                    </p>
                )
            }
    })
    }
    const abilityScores = 'ability_scores'
    console.log(abilityScores.split('_'))

console.log(character.misc)
    return(
        <div id='primaryRaceInfo' style={{display: primaryStyle}}>
            {/* {
                Object.entries(character.misc.primaryRace).map(([key, val]) => 
                    <p key={key}>
                        {key}: {val}
                    </p>
                )
            } */}
            {/* {renderRaceInfo(character.misc.primaryRace)} */}
            <p>
                <strong>Age:</strong> {primaryInfo.age}
            </p>
            <p>
                <strong>Alignemnt:</strong> {primaryInfo.alignment}
            </p>
            <p>
                <strong>Languages:</strong> {primaryInfo.language_desc}
            </p>
            <p>
                <strong>Size:</strong> {primaryInfo.size}
            </p>
            <p>
                {primaryInfo.size_description}
            </p>
            <p>
                <strong>Speed:</strong> {primaryInfo.speed}
            </p>
            <p>
                <strong>Starting Proficiencies</strong>
            </p>
            <span>
                {
                    primaryInfo?.starting_proficiencies?.map((proficiency, i) => 
                        <p key={i}>
                            {proficiency.name}
                        </p>
                    )
                }
            </span>
            <p>
                <strong>Traits</strong>
            </p>
            <span>
                {
                    primaryInfo?.traits?.map((traits, i) => 
                    <p key={i}>
                        {traits.name}
                    </p>
                    )
                }
            </span>
        </div>
    )
}