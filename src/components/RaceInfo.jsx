import react from 'react'
import { useState, useEffect, useRef } from 'react'
import InfoCard from './InfoCard'

export default function RaceInfo({ functions }) {
	const { character, setCharacter, fetchData } = functions

	const parentName = 'RaceInfo_infoCard'

	const isHidden = fetchData?.race?.name ? '' : 'none'

	const racialInfo = fetchData?.race

	const [isHovering, setIsHovering] = useState(false)
	const [event, setEvent] = useState(null)
	const [spawnCount, setSpawnCount] = useState(0)
	const [key, setKey] = useState(null)
	const [hoveredKey, setHoveredKey] = useState(null)

	const handleMouseOver = (e, key) => {
		setIsHovering(true)
		setEvent(e)
		setKey(key)
		setHoveredKey(key)
	}

	const handleMouseOut = e => {
		setIsHovering(false)
		setEvent(null)
		setSpawnCount(prevCount => prevCount + 1)
	}

	const [chosenProPrimary, setChosenProPrimary] = useState([])


	const handleCheck = (e) => {
                                
		const beenChecked = e.target.checked

		if(beenChecked){

			const chosenSkill = e.target.name.replace('skill-', '')
			const skills = Object.keys(character.skills)

			setChosenProPrimary((prevPro) => [...prevPro, e.target.name])

			setCharacter((prevCharacter) => {
				const updatedSkills = {...prevCharacter.skills}

				if(updatedSkills[chosenSkill]){
					updatedSkills[chosenSkill] = {
						...updatedSkills[chosenSkill],
						isProficient:true
					}
				}
				return {
					...prevCharacter,
					skills: updatedSkills
				}
			})
	   
		}else if (!beenChecked){

			setChosenProPrimary((prevPro) => prevPro.filter((x) => x !== e.target.name))
		}
	}

	return (
		<div id="raceInfo" >
			{/* {primaryDiv}
			{secondaryDiv} */}

			<div id="primaryRaceInfo" style={{display:isHidden}}>
					<p>
						<strong>{racialInfo?.name}</strong>
					</p>
					<p>
						{/* Age */}
						{racialInfo?.age ? (
							<>
								<strong>Age:</strong> {racialInfo?.age}
							</>)
							 :''}
					</p>
					<p>
						{/* Alignment */}
						{racialInfo?.alignment ? (
							<>
								<strong>Alignment: </strong>{racialInfo?.alignment}
							</>
						):''}
					</p>
					<p>
						{/* Language description */}
						{racialInfo?.language_desc ? (
							<>
								<strong>Languages: </strong> {racialInfo?.language_desc}
							</>
						):''}
					</p>
					<p>
						{/* Size */}
						{racialInfo?.size ? (
							<>
								<strong>Size: </strong> {racialInfo?.size}
							</>
						):''}
					</p>
					<p>
						{/* Size Description */}
						{racialInfo?.size_description ? (
							<>
								{racialInfo?.size_description}
							</>
						):''}
						</p>
					<p>
						{/* Speed */}
						{racialInfo?.speed ? (
							<>
								<strong>Speed:</strong> {racialInfo?.speed}
							</>
						):''}
						
					</p>

					
					<div className="raceProList">
						{racialInfo?.starting_proficiencies?.length > 0 ? (
								<>
									<p className="raceProList">
										<strong>Starting Proficiencies</strong>
									</p>
									<span>
										{racialInfo?.starting_proficiencies?.map(
											(proficiency, i) => (
												<div key={i}>
													<p className="raceProListItem">
														{proficiency?.name}
													</p>
												</div>
											)
										)}
									</span>
								</>
							):''}
					</div>
					{racialInfo?.starting_proficiency_options ? (
						<>
							<p>
								{racialInfo?.starting_proficiency_options?.desc}
							</p>
							<span>
								{racialInfo?.starting_proficiency_options?.from?.options?.map(
								(option, i) => (
									<span key={i}>
										<p>
											<input
												type="radio"
												name={racialInfo.name}
											/>
											<label
												onMouseOver={e =>
													handleMouseOver(e, `primary_proficiency_options_${i}`)
												}
												onMouseOut={handleMouseOut}
												data-url={option?.url}
												htmlFor={racialInfo?.name}>
												{option?.item?.name}
											</label>
										</p>
										{isHovering &&
										event &&
										hoveredKey ===
											`primary_proficiency_options_${i}` ? (
											<InfoCard
												functions={{
													character: character,
													event: event,
													isHovering: isHovering,
													spawnCount: spawnCount,
													setSpawnCount: setSpawnCount,
													className: hoveredKey,
													hoveredKey: hoveredKey,
													url: `/api/equipment/${option.item.index}`,
													parentName: parentName,
												}}
											/>
										) : (
											''
										)}
									</span>
								)
							)}
							</span>
						</>
					): ''}
					{racialInfo?.traits ? (
						<div className='racialTraitsParent'>
							<p>
								<strong>Traits</strong>
							</p>
							<div className="racialTraits">
								{racialInfo?.traits?.map((traits, i) => (
									<div
										className="innerMapProRaceDiv"
										key={`primary_${i}`}>
										<p
											className="primaryTraits"
											onMouseOver={e =>
												handleMouseOver(e, `primary_${i}`)
											}
											onMouseOut={handleMouseOut}
											data-url={traits.url}>
											{traits.name}
										</p>
										{isHovering &&
										event &&
										hoveredKey === `primary_${i}` ? (
											<InfoCard
												functions={{
													character: character,
													event: event,
													isHovering: isHovering,
													spawnCount: spawnCount,
													setSpawnCount: setSpawnCount,
													className: hoveredKey,
													hoveredKey: hoveredKey,
													url: traits.url,
													parentName: parentName,
												}}
											/>
										) : (
											''
										)}
									</div>
								))
								}	
							</div>
						</div>
					): ''}
				</div>
		</div>
	)
}
