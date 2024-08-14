import react from 'react'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import fs from 'fs'

export default function CharacterList({functions}) {
	const {decideAc} = functions
	const [characterData, setCharacterData] = useState([])

	// const [baseAc, setBaseAc] =

	useEffect(() => {
		fs.readFile('save.json', 'utf8', (err, data) => {
			
			if (err) {
				console.error(err)
			} else {
				console.log(data)
				setCharacterData(JSON.parse(data))
			}
		})
	}, [])

    
	// const decideAc = (char) => {
	//     let baseAc = parseInt(10+char.mods.dex)

	//     if(char?.chosen_equip.length > 0){
	//         char?.chosen_equip.map((item, i) => {
	//             console.log(item)
	//             if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && !item.armor_class.max_bonus){
	//                 console.log('light armor')
	//                 baseAc = (parseInt(item.armor_class.base) + parseInt(char.mods.dex))
	//                 console.log('AC', baseAc)
	//             }else if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && item.armor_class.max_bonus > 0 && char?.mods.dex >= 2){
	//                 console.log('medium armor')
	//                 baseAc = (parseInt(item.armor_class.base) + parseInt(item.armor_class.max_bonus))
	//                 console.log('AC', baseAc)
	//             }else if(item.equipment_category.name === 'Armor' && !item.armor_class.dex_bonus){
	//                 console.log('heavy armor')
	//                 baseAc = (item.armor_class.base)
	//                 console.log('AC', baseAc)
	//             }
	//         })
	//     }
	//     return baseAc
	// }

	// const decideAC = async (char) => {
	//     let baseAc

	//     if(char?.chosen_equip?.length > 0){
	//         const equipUrls = char?.chosen_equip?.map((item, i) => {
	//             return item.url
	//         })
	//         console.log(equipUrls)
	//         try{
	//             const fetchUrls = equipUrls.map((url, i) => fetch(`https://www.dnd5eapi.co${url}`))
	//             const res = await Promise.all(fetchUrls)

	//             res.forEach(res => {
	//                 if(!res){
	//                     throw new Error(`failed to fetch from ${res.url}`)
	//                 }
	//             })
	//             const data = await Promise.all(res.map(res => res.json()))
	//             data.map((item, i) => {
	//                 if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && !item.armor_class.max_bonus){
	//                     console.log('light armor')
	//                     baseAc = (parseInt(item.armor_class.base) + parseInt(char.mods.dex))
	//                     console.log('AC', baseAc)
	//                 }else if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && item.armor_class.max_bonus > 0 && char?.mods.dex >= 2){
	//                     console.log('medium armor')
	//                     baseAc = (parseInt(item.armor_class.base) + parseInt(item.armor_class.max_bonus))
	//                     console.log('AC', baseAc)
	//                 }else if(item.equipment_category.name === 'Armor' && !item.armor_class.dex_bonus){
	//                     console.log('heavy armor')
	//                     baseAc = (item.armor_class.base)
	//                     console.log('AC', baseAc)
	//                 }
	//             })
	//             console.log('data', data)
	//         }catch(err){
	//             console.error(err)
	//         }
	//     }else{
	//         console.log('goodbye')
	//     }
	//     return baseAc
	// }

	console.log('characterData', characterData)
	return (
		<div id='char_list'>
			{characterData?.length > 0
				? characterData?.map((char, i) => {
						console.log(char)
						const equipUrls = char?.chosen_equip?.map((item, i) => {
							return item.url
						})
                        
                        const img = char.char_img ? Buffer.from(char.char_img, 'base64') : 'No Image To Display'
                        // const handleImg = () => {

                        //     if(char.char_img){
                        //         // fs.readFile()
                        //         const img = Buffer.from(char.char_img, 'base64')
                        //     }
                        // }
						// console.log(equipUrls)
						return (
							<div className='char_footnote'>
								<Link
									to={`/char/${char.id}`}
									state={char.id}
									style={{
										textDecoration: 'none',
										color: 'inherit'
									}}
								>
			 						<div className='identity'>
										<div className='race'>
											{char.race.name}
										</div>
										<div className='name'>
											{char.char_name}
										</div>
										<div className='class'>
											{char.primary_class.name}
										</div>
									</div>

									<div>
										<div className='stats_combat'>
											<div className='stats_grid'>
												<div className='stat'>
													<strong>STR:</strong>{' '}
													{char?.stats?.str} (
													{char.mods.str})
												</div>
												<div className='stat'>
													<strong>INT:</strong>{' '}
													{char?.stats?.int} (
													{char.mods.int})
												</div>
												<div className='stat'>
													<strong>DEX:</strong>{' '}
													{char?.stats?.dex} (
													{char.mods.dex})
												</div>
												<div className='stat'>
													<strong>WIS:</strong>{' '}
													{char?.stats?.wis} (
													{char.mods.wis})
												</div>
												<div className='stat'>
													<strong>CON:</strong>{' '}
													{char?.stats?.con} (
													{char.mods.con})
												</div>
												<div className='stat'>
													<strong>CHA:</strong>{' '}
													{char?.stats?.cha} (
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
														<strong>
															Hit Die:{' '}
														</strong>
														1d
														{
															char.primary_class
																.hit_die
														}
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

												{char.race.traits.map(
													(trait, j) => (
														<div className='single_trait'>
															{trait.name}
														</div>
													)
												)}
											</div>
											<div className='pro_parent'>
												<div className='pro class_pro'>
													<strong>
														Proficiencies from{' '}
														{
															char.primary_class
																.name
														}
													</strong>
													{char.primary_class
														.chosen_pro_0
														? char.primary_class.chosen_pro_0.map(
																(pro, l) => (
																	<div className='single_pro'>
																		{
																			pro.name
																		}
																	</div>
																)
														  )
														: ''}
													{Array.isArray(
														char.primary_class
															.chosen_pro_1
													) ? (
														char.primary_class.chosen_pro_1.map(
															(pro, l) => (
																<div className='single_pro'>
																	{pro.name}
																</div>
															)
														)
													) : (
														<div>
															{
																char
																	?.primary_class
																	?.chosen_pro_1
																	?.name
															}
														</div>
													)}
												</div>
												<div className='pro race_pro'>
													<strong>
														Proficiencies from{' '}
														{char.race.name}
													</strong>
													{Array.isArray(
														char.race.chosen_pro
													) ? (
														char.race.chosen_pro.map(
															(pro, l) => (
																<div>
																	{pro.name}
																</div>
															)
														)
													) : (
														<div>
															{
																char?.race
																	?.chosen_pro
																	?.name
															}
														</div>
													)}
												</div>
											</div>
										</div>
										<div className='skills_img'>
											<div className='skills'>
												{Object.keys(char.skills).map(
													(skill, k) => (
														<div>
															<strong>
																{skill}:{' '}
															</strong>
															{
																char.skills[
																	skill
																].value
															}
														</div>
													)
												)}
											</div>
											<div className='char_img'>
												{img}
											</div>
										</div>
									</div>

									<button
										onClick={(e) => {
											e.preventDefault()
											console.log(char)
										}}
									>
										Character Log
									</button>
								</Link>
							</div>
						)
				  })
				: 'You have no characters'}
		</div>
	)
}
