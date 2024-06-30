import react from 'react'
import { useState, useEffect, useRef } from 'react'
import InfoCard from './InfoCard'

export default function RaceInfo({ functions }) {
	const { character, setCharacter, fetchData } = functions

	const parentName = 'RaceInfo_infoCard'
	const secondaryParentName = 'secondary_RaceInfo_infoCard'

	const isHidden = fetchData?.primary_race?.name ? '' : 'none'
	const isHidden2 = fetchData?.secondary_race?.name ? '' : 'none'

	const primaryInfo = fetchData?.primary_race
	const secondaryInfo = fetchData?.secondary_race

	const [primaryDiv, setPrimaryDiv] = useState()
	const [secondaryDiv, setSecondaryDiv] = useState()

	const primaryRaceEmpty = (
		character &&
		character.race &&
		character.race.primary &&
		Object.keys(character.race.primary).length === 0
	)
	const secondaryRaceEmpty = (
		character &&
		character.race &&
		character.race.primary &&
		Object.keys(character.race.secondary).length === 0
	)

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
						<strong>{primaryInfo?.name}</strong>
					</p>
					<p>
						{/* Age */}
						{primaryInfo?.age ? (
							<>
								<strong>Age:</strong> {primaryInfo?.age}
							</>)
							 :''}
					</p>
					<p>
						{/* Alignment */}
						{primaryInfo?.alignment ? (
							<>
								<strong>Alignment: </strong>{primaryInfo?.alignment}
							</>
						):''}
					</p>
					<p>
						{/* Language description */}
						{primaryInfo?.language_desc ? (
							<>
								<strong>Languages: </strong> {primaryInfo?.language_desc}
							</>
						):''}
					</p>
					<p>
						{/* Size */}
						{primaryInfo?.size ? (
							<>
								<strong>Size: </strong> {primaryInfo?.size}
							</>
						):''}
					</p>
					<p>
						{/* Size Description */}
						{primaryInfo?.size_description ? (
							<>
								{primaryInfo?.size_description}
							</>
						):''}
						</p>
					<p>
						{/* Speed */}
						{primaryInfo?.speed ? (
							<>
								<strong>Speed:</strong> {primaryInfo?.speed}
							</>
						):''}
						
					</p>

					
					<span>
						{primaryInfo?.starting_proficiencies?.length > 0 ? (
								<>
									<p>
										<strong>Starting Proficiencies</strong>
									</p>
									<span className="raceProList">
										{primaryInfo?.starting_proficiencies?.map(
											(proficiency, i) => (
												<div key={i}>
													<p className="raceProList">
														{proficiency?.name}
													</p>
												</div>
											)
										)}
									</span>
								</>
							):''}
					</span>
					{primaryInfo?.starting_proficiency_options ? (
						<>
							<p>
								{primaryInfo?.starting_proficiency_options?.desc}
							</p>
							<span>
								{primaryInfo?.starting_proficiency_options?.from?.options?.map(
								(option, i) => (
									<span key={i}>
										<p>
											<input
												type="checkbox"
												name={primaryInfo.name}
											/>
											<label
												onMouseOver={e =>
													handleMouseOver(e, `primary_proficiency_options_${i}`)
												}
												onMouseOut={handleMouseOut}
												data-url={option?.url}
												htmlFor={primaryInfo?.name}>
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
					{primaryInfo?.traits ? (
						<>
							<p>
								<strong>Traits</strong>
							</p>
							<span className="racialTraits">
								{primaryInfo?.traits?.map((traits, i) => (
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
							</span>
						</>
					): ''}
				</div>
				<div style={{display: isHidden2}} id="secondaryRaceInfo">
					<p>
						<strong>{secondaryInfo?.name}</strong>
					</p>
					<p>
						{/* Age */}
						{secondaryInfo?.age ? (
							<>
								<strong>Age:</strong> {secondaryInfo?.age}
							</>)
							 :''}
					</p>
					<p>
						{/* Alignment */}
						{secondaryInfo?.alignment ? (
							<>
								<strong>Alignment: </strong>{secondaryInfo?.alignment}
							</>
						):''}
					</p>
					<p>
						{/* Language description */}
						{secondaryInfo?.language_desc ? (
							<>
								<strong>Languages: </strong> {secondaryInfo?.language_desc}
							</>
						):''}
					</p>
					<p>
						{/* Size */}
						{secondaryInfo?.size ? (
							<>
								<strong>Size: </strong> {secondaryInfo?.size}
							</>
						):''}
					</p>
					<p>
						{/* Size Description */}
						{secondaryInfo?.size_description ? (
							<>
								{secondaryInfo?.size_description}
							</>
						):''}
						</p>
					<p>
						{/* Speed */}
						{secondaryInfo?.speed ? (
							<>
								<strong>Speed:</strong> {secondaryInfo?.speed}
							</>
						):''}
						
					</p>

					
					<span>
						{secondaryInfo?.starting_proficiencies ? (
								<>
									<p>
										<strong>Starting Proficiencies</strong>
									</p>
									<span className="raceProList">
										{secondaryInfo?.starting_proficiencies?.map(
											(proficiency, i) => (
												<div>
													<p className="raceProList" key={i}>
														{proficiency?.name}
													</p>
												</div>
											)
										)}
									</span>
								</>
							):''}
					</span>
					{secondaryInfo?.starting_proficiency_options ? (
						<>
							<p>
								{secondaryInfo?.starting_proficiency_options?.desc}
							</p>
							<span>
								{secondaryInfo?.starting_proficiency_options?.from?.options?.map(
								(option, i) => (
									<span>
										<p>
											<input
												type="checkbox"
												name={secondaryInfo?.name}
											/>
											<label
												onMouseOver={e =>
													handleMouseOver(e, `secondary_proficiency_options_${i}`
													)
												}
												onMouseOut={handleMouseOut}
												data-url={option?.url}
												htmlFor={secondaryInfo?.name}>
												{option?.item?.name}
											</label>
										</p>
										{isHovering &&
										event &&
										hoveredKey ===
											`secondary_proficiency_options_${i}` ? (
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
					{secondaryInfo?.traits ? (
						<>
							<p>
								<strong>Traits</strong>
							</p>
							<span className="racialTraits">
								{secondaryInfo?.traits?.map((traits, i) => (
									<div
										className="innerMapProRaceDiv"
										key={`secondary_${i}`}>
										<p
											className="secondaryTraits"
											onMouseOver={e =>
												handleMouseOver(e, `secondary_${i}`)
											}
											onMouseOut={handleMouseOut}
											data-url={traits.url}>
											{traits.name}
										</p>
										{isHovering &&
										event &&
										hoveredKey === `secondary_${i}` ? (
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
							</span>
						</>
					): ''}
				</div>
		</div>
	)
}
