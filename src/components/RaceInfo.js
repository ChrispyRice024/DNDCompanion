import react from 'react'
import {useState, useEffect} from 'react'

export default function RaceInfo({functions}) {

    const {character} = functions

    const primaryInfo = character?.race?.primary ? character.race.primary : {}
    const secondaryInfo = character.race.secondary ? character.race.secondary : {}

    const primaryRaceEmpty = Object.keys(character?.race?.primary).length === 0
    const secondaryRaceEmpty = Object.keys(character?.race?.secondary).length === 0

    const primaryStyle = primaryRaceEmpty ? 'none' : ''
    const secondaryStyle = secondaryRaceEmpty ? 'none' : ''

    return(
        <div id='raceInfo'>
            <div id='primaryRaceInfo' style={{display: primaryStyle}}>
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
            <div id='secondaryRaceInfo' style={{display: secondaryStyle}}>
            <p>
                    <strong>secondaryAge:</strong> {secondaryInfo.age}
                </p>
                <p>
                    <strong>Alignemnt:</strong> {secondaryInfo.alignment}
                </p>
                <p>
                    <strong>Languages:</strong> {secondaryInfo.language_desc}
                </p>
                <p>
                    <strong>Size:</strong> {secondaryInfo.size}
                </p>
                <p>
                    {secondaryInfo.size_description}
                </p>
                <p>
                    <strong>Speed:</strong> {secondaryInfo.speed}
                </p>
                <p>
                    <strong>Starting Proficiencies</strong>
                </p>
                <span>
                    {
                        secondaryInfo?.starting_proficiencies?.map((proficiency, i) => 
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
                        secondaryInfo?.traits?.map((traits, i) => 
                        <p key={i}>
                            {traits.name}
                        </p>
                        )
                    }
                </span>
            </div>
        </div>

    )
}