import {useState, useEffect} from 'react'
import {useLocation, useParams} from 'react-router-dom'

export default function CharDisplay({functions}) {
	const {decideAc} = functions
	const {name} = useParams()
	const location = useLocation()
	const {char} = location.state



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
			</div>

			<div id='char_equip'>
				{equipment.map((item, i) => (
					<div className='single_equip'>
						{item?.equipment_category?.name === 'Weapon' ? (
							<div className='char_weapon'>
								<p>
                                    {console.log(item.two_handed_damage)}
									{item.name} / {item.damage.damage_dice}
									{item.properties.some(
										(x) => x.name === 'Versatile'
									) ? <>({item.two_handed_damage.damage_dice})</>:''}{' '}
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
                                    {item.cost.quantity} {item.cost.unit} | {item.weight} lbs
                                </p>
							</div>
						) : item.equipment_category.name ===
						  'Adventuring Gear' ? (
							<div></div>
						) : item.equipment_category.name === 'Armor' ? (
							<div>
                                {item.name} / {item.armor_class.base} {item.armor_class.dex_bonus ? <></>:''}
                            </div>
						) : (
							`${item.equipment_category.name}`
						)}
					</div>
				))}
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
	)
}
