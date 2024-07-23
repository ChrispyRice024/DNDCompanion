import {useState, useEffect} from 'react'
import {useLocation, useParams} from 'react-router-dom'

export default function CharDisplay({functions}) {
	const {decideAc} = functions
	const {name} = useParams()
	const location = useLocation()
	const {char} = location.state

	const lvl = 0

	let [spells, setSpells] = useState({})
	useEffect(() => {
			const decideSpells = () => {
				if (char.primary_class.name === 'Paladin') {
					const spellsForLvl =
						char.primary_class.level_data[lvl].spellcasting

					Object.entries(spellsForLvl).forEach(([key, value], i) => {
						console.log(key, value)
						// if (value > 0) {
							const spellLvl = key.slice(-1)
							const spellsOfLvl = `level_${spellLvl}_spells`
							console.log('spellLvl', spellLvl)
							console.log('spellsOfLvl', spellsOfLvl)
							console.log(
								char.primary_class.spells.level_1_spells
							)
							setSpells((prevSpells) => ({
								...prevSpells,
								[spellsOfLvl]:
									char.primary_class.spells[
										`level_${spellLvl}_spells`
									]
							}))
						// }
					})
					console.log('spells', spells)
				}
			}
	}, [])


	useEffect(() => {
		console.log('spells', spells)
	}, [spells])

    const equipment = [...char.chosen_equip]
    console.log('equipment', equipment)
	return (
		<div id='single_char'>
			<div id='char_sheet'>
				<div className='identity'>
					<div className='race'>{char.race.name}</div>
					<div className='name'>{char.char_name}</div>
					<div className='class'>{char.primary_class.name}</div>
				</div>

				<div className='stats_combat'>
					{/* STATS */}
					<div className='stats_grid'>
						<div className='stat'>
							<strong>STR:</strong> {char?.stats?.str} (
							{char.mods.str})
						</div>
						<div className='stat'>
							<strong>INT:</strong> {char?.stats?.int} (
							{char.mods.int})
						</div>
						<div className='stat'>
							<strong>DEX:</strong> {char?.stats?.dex} (
							{char.mods.dex})
						</div>
						<div className='stat'>
							<strong>WIS:</strong> {char?.stats?.wis} (
							{char.mods.wis})
						</div>
						<div className='stat'>
							<strong>CON:</strong> {char?.stats?.con} (
							{char.mods.con})
						</div>
						<div className='stat'>
							<strong>CHA:</strong> {char?.stats?.cha} (
							{char.mods.cha})
						</div>
					</div>

					<div className='combat'>
						<div className='ac'>
							<strong>AC: </strong>
							{decideAc(char)}
						</div>
						<div className='health'>
							<div className='hit_die'>
								<strong>Hit Die: </strong>1d
								{char.primary_class.hit_die}
							</div>
							<div className='hp'>
								<strong>HP: </strong>
								{char.hp}
							</div>
						</div>
						<div className='init'>
							<strong>Init: </strong>
							{char.mods.dex}
						</div>
					</div>
				</div>
				<div className='traits_pro'>
					<div className='traits'>
						<strong>Racial Traits</strong>

						{char.race.traits.map((trait, j) => (
							<div className='single_trait'>{trait.name}</div>
						))}
					</div>
					<div className='pro_parent'>
						<div className='pro class_pro'>
							<strong>
								Proficiencies from {char.primary_class.name}
							</strong>
							{char.primary_class.chosen_pro_0
								? char.primary_class.chosen_pro_0.map(
										(pro, l) => (
											<div className='single_pro'>
												{pro.name}
											</div>
										)
								  )
								: ''}
							{Array.isArray(char.primary_class.chosen_pro_1) ? (
								char.primary_class.chosen_pro_1.map(
									(pro, l) => (
										<div className='single_pro'>
											{pro.name}
										</div>
									)
								)
							) : (
								<div>
									{char?.primary_class?.chosen_pro_1?.name}
								</div>
							)}
						</div>

						<div className='pro race_pro'>
							<strong>Proficiencies from {char.race.name}</strong>
							{Array.isArray(char.race.chosen_pro) ? (
								char.race.chosen_pro.map((pro, l) => (
									<div>{pro.name}</div>
								))
							) : (
								<div>{char?.race?.chosen_pro?.name}</div>
							)}
						</div>
					</div>
				</div>
				<div className='skills_img'>
					<div className='skills_sheet '>
						{Object.keys(char.skills).map((skill, k) => (
							<div>
								<strong>{skill}: </strong>
								{char.skills[skill].value}
							</div>
						))}
					</div>
					<div className='char_img'></div>
				</div>
				<button
					onClick={(e) => {
						e.preventDefault()
						console.log(char)
					}}
				>
					Character Log
				</button>
			</div>

			<div id='char_equip'>
				{equipment.map((item, i) => (
					<div className='single_equip'>
						{item?.equipment_category?.name === 'Weapon' ? ( //still other equip types i need to get. must fix the equip component first
							<div className='char_weapon'>
								<p>
									{console.log(item.two_handed_damage)}
									{item.name} / {item.damage.damage_dice}
									{item.properties.some(
										(x) => x.name === 'Versatile'
									) ? (
										<>
											(
											{item.two_handed_damage.damage_dice}
											)
										</>
									) : (
										''
									)}{' '}
									{item.damage.damage_type.name}
								</p>
								<>
									{item.desc.map((desc, j) => (
										<p>{desc}</p>
									))}
								</>
								<p>
									{item.special.length > 0 ??
										item.special.map((special, j) => (
											<>{special}</>
										))}
								</p>
								<p>
									{item.category_range} ({item.range.normal}
									ft) |{' '}
									{item.properties.map((prop, j) => (
										<>
											{prop.name}{' '}
											{item.properties.length > j ??
												' | '}
										</>
									))}
								</p>
								<p>
									{item.cost.quantity} {item.cost.unit} |{' '}
									{item.weight} lbs
								</p>
							</div>
						) : item.equipment_category.name ===
						  'Adventuring Gear' ? (
							<div></div>
						) : item.equipment_category.name === 'Armor' ? (
							<div>
								{item.name} / {item.armor_class.base}{' '}
								{item.armor_class.dex_bonus ? <></> : ''}
							</div>
						) : (
							`${item.equipment_category.name}`
						)}
					</div>
				))}
			</div>

			<div id='spell_char_desc'>
				{char.primary_class?.spellcasting
					? char.primary_class?.spellcasting?.info.map((desc, i) => ( //might move to spellbook component once i get that up
							<div className='spell_desc'>
								<h3>{desc.name}</h3>
								{desc.desc}
							</div>
					  ))
					: ''}
			</div>
			<div id='char_spells'>
				{char?.primary_class?.spellcasting?.length > 0 ? ( // not sure why i did this. spellcasting isnt even an array, although it does have the casting mod, so keep for future reference
					<div>
						{char.primary_class?.chosen_spells.spell_0?.map(
							(spell, i) => (
								<div>{spell.name}</div>
							)
						)}
					</div>
				) : (
					''
				)}
				<div id='char_spells_list'>
					{char.primary_class.name === 'Paladin' //probably dont need this conditional. should decide if paladin in decideSpells()
						? Object.keys(spells).map((lvl, i) => {
							console.log('lvl', lvl)
							spells[lvl].map((spell, j) => (
								<div>
									{spell.name}
								</div>
							))
						})
					:''}

					{char?.primary_class?.level_data[lvl]?.spellcasting //this displays the spellslots, so i may need to move it
						? Object.entries(
								char?.primary_class?.level_data[0]?.spellcasting
						  ).map(([key, value], i) => {
								if (value !== 0) {
									const entries = Object.entries(
										char.primary_class?.level_data[0]
											?.spellcasting
									)
									const nextValue = entries[i + 1]

									return (
										<span>
											<strong style={{color: '#FFD700'}}>
												{key
													.replace(/_/g, ' ')
													.replace(/\b\w/g, (char) =>
														char.toUpperCase()
													)}
											</strong>{' '}
											({value}){' '}
											{nextValue[1] !== 0 ? '| ' : ''}
										</span>
									)
								}
						  })
						: ''}
				</div>
			</div>
		</div>
	)
}
