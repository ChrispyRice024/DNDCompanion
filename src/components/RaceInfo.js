import react from 'react'
import {useState, useEffect} from 'react'

export default function RaceInfo({functions}) {

    const {character} = functions

    const primaryInfo = character.misc.primaryRace ? character.misc.primaryRace : {}
    const secondaryInfo = character.misc.secondaryRace ? character.misc.secondaryRace : {}

    const primaryRaceEmpty = Object.keys(character.misc.primaryRace).length === 0
    const secondaryRaceEmpty = Object.keys(character.misc.secondaryRace).length === 0

    const raceStyle = primaryRaceEmpty ? 'none' : ''

    const raceKeys = Object.keys(primaryInfo)
    useEffect(() => {
            console.log(raceKeys)
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

    const renderNestedContent = (nestedObject) => {
        if (!nestedObject) {
            return null;
        }
        return Object.keys(nestedObject).map((nestedKey) => (
            <p key={nestedKey}>
                {nestedKey}: {nestedObject[nestedKey]}
            </p>
        ))
    }

    return(
        <div id='raceInfo' style={{display: raceStyle}}>
            {/* {
                Object.entries(character.misc.primaryRace).map(([key, val]) => 
                    <p key={key}>
                        {key}: {val}
                    </p>
                )
            } */}
            {/* {renderRaceInfo(character.misc.primaryRace)} */}
            <div>
                <p>
                    <strong>{`${primaryInfo.name} Age`}:</strong> {primaryInfo.age}
                </p>
                <p>
                    <strong>{`${secondaryInfo.name} Age`}: </strong> {secondaryInfo.age}
                </p>
            </div>
            <div>    
                <p>
                    <strong>{`${primaryInfo.name} Alignemnt:`}</strong> {primaryInfo.alignment}
                </p>
                <p>
                    <strong>{`${secondaryInfo.name} Alignment`} </strong> {secondaryInfo.alignment}
                </p>
                
            </div>
            <div>    
                <p>
                    <strong>{`${primaryInfo.name} Languages:`}</strong> {primaryInfo.language_desc}
                </p>
                <p>    
                    <strong>{`${secondaryInfo.name} Languages:`} </strong> {secondaryInfo.language_desc}
                </p>
            </div>
            <div>           
                <p>
                    <input type='radio' name='size' value={primaryInfo.size} /><strong>{`${primaryInfo.name} Size:`}</strong> {primaryInfo.size}
                </p>
                <p>
                    {primaryInfo.size_description}

                </p>
            </div>
            <div>
                <p>
                <input type='radio' name='size' value={secondaryInfo.size} /><strong>{`${secondaryInfo.name} Size:`} </strong> {secondaryInfo.size}
                </p>
                <p>
                    {secondaryInfo.size_description}
                </p>
            </div>
            <div>
                <p>
                    {/* Make sure to only display the fastest speed from either race */}
                    <strong>Speed:</strong> {primaryInfo.speed}
                </p>
            </div>
            <div>
                <p>
                    <strong>{`${primaryInfo.name} Starting Proficiencies`}</strong>
                    
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
                    <strong>{`${secondaryInfo.name} Starting Proficiencies`} </strong>
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
            </div>
            <div>
                <p>
                    <strong>{`${primaryInfo.name} Traits`}</strong>
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
                <p>
                    <strong>{`${secondaryInfo.name} Traits`}</strong>
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
            {/* {raceKeys.map((key) => (
                <div key={key}>
                    <p>Key: {key}</p>
                    <p>
                        Value in PrimaryRaceData: {renderNestedContent(primaryInfo[key])}
                        Value in secondaryRaceData: {renderNestedContent(secondaryInfo[key])}
                    </p>
                </div>
            ))} */}

        </div>
    )
}