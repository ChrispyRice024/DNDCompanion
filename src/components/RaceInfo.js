import react from 'react'
import { useState, useEffect, useRef } from 'react'
import InfoCard from './InfoCard'

export default function RaceInfo({ functions }) {
	const { character, setCharacter } = functions

	const parentName = 'RaceInfo_infoCard'
	const secondaryParentName = 'secondary_RaceInfo_infoCard'

	const primaryInfo = character?.race?.primary
	const secondaryInfo = character?.race?.secondary

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

	const primaryStyle = primaryRaceEmpty ? 'none' : ''
	const secondaryStyle = secondaryRaceEmpty ? 'none' : ''

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
	useEffect(() => {
		console.log({ primaryInfo })
		console.log(primaryInfo)
	}, [primaryInfo])

	useEffect(() => {
		if (spawnCount > 5) {
			setTimeout(() => setSpawnCount(0), 2000)
		}
	}, [spawnCount])

	const [chosenProPrimary, setChosenProPrimary] = useState([])


	const handleCheck = (e) => {
                                
		const beenChecked = e.target.checked

		if(beenChecked){

			const chosenSkill = e.target.name.replace('skill-', '')
			const skills = Object.keys(character.skills)

			setChosenProPrimary((prevPro) => [...prevPro, e.target.name])
			
			console.log(e.target.name)
			console.log(chosenProPrimary)
			console.log(chosenSkill)

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
			console.log(character)

	   
		}else if (!beenChecked){

			setChosenProPrimary((prevPro) => prevPro.filter((x) => x !== e.target.name))
		}
	}
	//populate the racial divs
	useEffect(() => {

		const fillPrimaryDiv = () => {

			setPrimaryDiv(
				<div id="primaryRaceInfo">
					<p>
						<strong>{primaryInfo.name}</strong>
					</p>
					<p>
						{/* Age */}
						{primaryInfo.age ? (
							<>
								<strong>Age:</strong> {primaryInfo.age}
							</>)
							 :''}
					</p>
					<p>
						{/* Alignment */}
						{primaryInfo.alignment ? (
							<>
								<strong>Alignment: </strong>{primaryInfo.alignment}
							</>
						):''}
					</p>
					<p>
						{/* Language description */}
						{primaryInfo.language_desc ? (
							<>
								<strong>Languages: </strong> {primaryInfo.language_desc}
							</>
						):''}
					</p>
					<p>
						{/* Size */}
						{primaryInfo.size ? (
							<>
								<strong>Size: </strong> {primaryInfo.size}
							</>
						):''}
					</p>
					<p>
						{/* Size Description */}
						{primaryInfo.size_description ? (
							<>
								{primaryInfo?.size_description}
							</>
						):''}
						</p>
					<p>
						{/* Speed */}
						{primaryInfo.speed ? (
							<>
								<strong>Speed:</strong> {primaryInfo?.speed}
							</>
						):''}
						
					</p>

					
					<span>
						{console.log(primaryInfo.starting_proficiencies)}
						{primaryInfo.starting_proficiencies.length > 0 ? (
								<>
									<p>
										<strong>Starting Proficiencies</strong>
									</p>
									<span className="raceProList">
										{primaryInfo?.starting_proficiencies?.map(
											(proficiency, i) => (
												<div>
													<p className="raceProList" key={i}>
														{proficiency.name}
													</p>
												</div>
											)
										)}
									</span>
								</>
							):''}
					</span>
					{primaryInfo.starting_proficiency_options ? (
						<>
							<p>
								{primaryInfo?.starting_proficiency_options?.desc}
							</p>
							<span>
								{primaryInfo?.starting_proficiency_options?.from?.options?.map(
								(option, i) => (
									<span>
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
												data-url={option.url}
												htmlFor={primaryInfo.name}>
												{option?.item?.name}
											</label>
											{console.log(isHovering)}
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
					{primaryInfo.traits ? (
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
								// spawnCount < 5
								}	
							</span>
						</>
					): ''}
				</div>
			)
		}

		const fillSecondaryDiv = () => {

			setSecondaryDiv(
				<div id="secondaryRaceInfo">
					<p>
						<strong>{secondaryInfo.name}</strong>
					</p>
					<p>
						{/* Age */}
						{secondaryInfo.age ? (
							<>
								<strong>Age:</strong> {secondaryInfo.age}
							</>)
							 :''}
					</p>
					<p>
						{/* Alignment */}
						{secondaryInfo.alignment ? (
							<>
								<strong>Alignment: </strong>{secondaryInfo.alignment}
							</>
						):''}
					</p>
					<p>
						{/* Language description */}
						{secondaryInfo.language_desc ? (
							<>
								<strong>Languages: </strong> {secondaryInfo.language_desc}
							</>
						):''}
					</p>
					<p>
						{/* Size */}
						{secondaryInfo.size ? (
							<>
								<strong>Size: </strong> {secondaryInfo.size}
							</>
						):''}
					</p>
					<p>
						{/* Size Description */}
						{secondaryInfo.size_description ? (
							<>
								{secondaryInfo?.size_description}
							</>
						):''}
						</p>
					<p>
						{/* Speed */}
						{secondaryInfo.speed ? (
							<>
								<strong>Speed:</strong> {secondaryInfo?.speed}
							</>
						):''}
						
					</p>

					
					<span>
						{secondaryInfo.starting_proficiencies ? (
								<>
									<p>
										<strong>Starting Proficiencies</strong>
									</p>
									<span className="raceProList">
										{secondaryInfo?.starting_proficiencies?.map(
											(proficiency, i) => (
												<div>
													<p className="raceProList" key={i}>
														{proficiency.name}
													</p>
												</div>
											)
										)}
									</span>
								</>
							):''}
					</span>
					{secondaryInfo.starting_proficiency_options ? (
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
												name={secondaryInfo.name}
											/>
											<label
												onMouseOver={e =>
													handleMouseOver(e, `secondary_proficiency_options_${i}`
													)
												}
												onMouseOut={handleMouseOut}
												data-url={option.url}
												htmlFor={secondaryInfo.name}>
												{option?.item?.name}
											</label>
											{console.log(option)}
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
					{secondaryInfo.traits ? (
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
								// spawnCount < 5
								}	
							</span>
						</>
					): ''}
				</div>
			)
		}

		if(!primaryRaceEmpty){
			fillPrimaryDiv()
		}
		if(!secondaryRaceEmpty){
			fillSecondaryDiv()
		}
	}, [primaryInfo, secondaryInfo, isHovering])

	return (
		<div id="raceInfo">
			{primaryDiv}
			{secondaryDiv}
		</div>
	)
}
