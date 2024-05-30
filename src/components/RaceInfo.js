import react from 'react'
import {useState, useEffect, useRef} from 'react'
import InfoCard from './InfoCard'

export default function RaceInfo({functions}) {

    const {character} = functions

    const parentName = 'RaceInfo_infoCard'
    const secondaryParentName = 'secondary_RaceInfo_infoCard'

    const primaryInfo = character?.race?.primary ? character.race.primary : {}
    const secondaryInfo = character.race.secondary ? character.race.secondary : {}

    const primaryRaceEmpty = Object.keys(character?.race?.primary).length === 0
    const secondaryRaceEmpty = Object.keys(character?.race?.secondary).length === 0

    const primaryStyle = primaryRaceEmpty ? 'none' : ''
    const secondaryStyle = secondaryRaceEmpty ? 'none' : ''

    const [isHovering, setIsHovering] = useState(false)
    const [event, setEvent] = useState(null)
    const [spawnCount, setSpawnCount] = useState(0)
    const [key, setKey] = useState(null)
    const [hoveredKey, setHoveredKey] = useState(null)
    const [className, setClassName] = useState('')

    const debounceTimeout = useRef(null)

    const handleMouseOver = (e, key) => {

        setIsHovering(true)
        setEvent(e)
        setKey(key)
        setHoveredKey(key)

    }

    const handleMouseOut = (e) => {

            setIsHovering(false)
            setEvent(null)
            setSpawnCount((prevCount) => prevCount+1)
        console.log('goodbye')
    }
    useEffect(() => {
        console.log({event, isHovering, key, hoveredKey})
    }, event)

    useEffect(() => {
        if(spawnCount > 5){
            setTimeout(() => setSpawnCount(0), 2000)
        }
    }, [spawnCount])

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
                <span className='raceProList'>
                    {
                        primaryInfo?.starting_proficiencies?.map((proficiency, i) => 
                            <div>
                                <p className='raceProList' key={i}>
                                    {proficiency.name}
                                </p>
                            </div>
                        )
                    }
                </span>
                
                
                {/* proficiency options go here */}
                <p>
                    <strong>Traits</strong>
                </p>
                <span className='racialTraits'>
                    {
                        
                          primaryInfo?.traits?.map((traits, i) =>
                          <div className='innerMapProRaceDiv' key={`primary_${i}`}> 
                            <p className='primaryTraits' onMouseOver={(e) => handleMouseOver(e, `primary_${i}`)} onMouseOut={handleMouseOut} data-url={traits.url} >
                                {traits.name}
                            </p>
                            {isHovering && event && hoveredKey === `primary_${i}` ? 
                                <InfoCard functions={{
                                    character:character, 
                                    event:event, 
                                    isHovering:isHovering, 
                                    spawnCount:spawnCount, 
                                    setSpawnCount:setSpawnCount, 
                                    className:hoveredKey,
                                    hoveredKey:hoveredKey,
                                    url:traits.url,
                                    parentName:parentName}} /> : ''}
                            </div>
                            )
                            // spawnCount < 5 
                        
                        
                    }
                </span>
            </div>
            <div id='secondaryRaceInfo' style={{display: secondaryStyle}}>
            <p>
                    <strong>Age:</strong> {secondaryInfo.age}
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
                <span className='raceProList'>
                    {
                        secondaryInfo?.starting_proficiencies?.map((proficiency, i) => 
                            <p className='raceProList' key={i}>
                                {proficiency.name}
                            </p>
                        )
                    }
                </span>
                <p>
                    <strong>Traits</strong>
                </p>
                <span className='racialTraits'>
                    {
                        secondaryInfo?.traits?.map((traits, i) => 
                            <div className='innerMapProRaceDiv' key={`secondary_${i}`}>
                                <p className='secondaryTraits' onMouseOver={(e) => handleMouseOver(e, `secondary_${i}`)} onMouseOut={handleMouseOut} data-url={traits.url} >
                                    {traits.name}
                                </p>
                                {isHovering && event && hoveredKey === `secondary_${i}` ? <InfoCard functions={{character:character, event:event, isHovering:isHovering, spawnCount:spawnCount, setSpawnCount:setSpawnCount, parentName:secondaryParentName, className:hoveredKey, url:traits.url}} /> : ''}
                            </div>
                        
                        )
                    }
                </span>
            </div>
        </div>

    )
}