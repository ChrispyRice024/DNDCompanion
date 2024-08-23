import {useState, useEffect} from 'react'
import {useLocation, useParams, Link} from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import CharFeatures from '../components/CharFeatures.js'
import CharSpells from '../components/CharSpells.js'
import CharEquip from '../components/CharEquip.js'
import Backstory from '../components/Backstory'
import LevelUp from '../components/LevelUp'
import fs from 'fs'

export default function CharDisplay({functions}) {
	const {decideAc} = functions
	const {name} = useParams()
	const location = useLocation()
	// const {char} = location.state
	const id = location.state
console.log(id)
	const [char, setChar] = useState()
	
	useEffect(() => {
		fs.readFile('save.json', 'utf8', (err, data) => {
			const jsonData = JSON.parse(data)
			const targetChar = jsonData.find(x => x.id === id)
			setChar(targetChar)
		})
		console.log(char)	
	},[])



	const [charChanges, setCharChanges] = useState(char)

	const [actionPage, setActionPage] = useState('equip')

	const [isLevelingUp, setIsLevelingUp] = useState(false)

	const lvl = 0

	const decideST = (stat) => {
		let isProficient
		const proBonus = char.primary_class.level_data[lvl].prof_bonus
		const statValue = char?.mods?.[stat]

		const hasBonus = char?.race?.ability_bonuses?.some(obj => obj.ability_score?.index === stat)

		char?.primary_class?.saving_throws?.forEach((obj) => {

			if (obj.index === stat) {
				isProficient = true
			}
		})

		if (isProficient) {
			return statValue + proBonus
		} else {
			return statValue
		}
	}

	const handleLvlUp = () => {
		setIsLevelingUp(true)
	}


	// function findObjectsWithThreeEntries(obj) {
	// 	let result = [];

	// 	function traverse(current) {
	// 		if (typeof current === 'object' && current !== null) {
	// 			if (Array.isArray(current)) {
	// 				// If it's an array, recursively check each element
	// 				current.forEach(element => traverse(element));
	// 			} else {
	// 				// Check if the current object has exactly 3 entries
	// 				if (Object.keys(current).length === 3) {
	// 					result.push(current);
	// 				}
	// 				// Recursively check each property
	// 				for (let key in current) {
	// 					if (current.hasOwnProperty(key)) {
	// 						traverse(current[key]);
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}

	// 	traverse(obj);
	// 	console.log('result', result)
	// 	return result;
	// }

	// findObjectsWithThreeEntries(char)
	

    const equipment = char?.equipment
    console.log('equipment', equipment)
	return (
		<div id='single_char'>
			{console.log(char)}
			{char !== undefined ? 
			<>
				{isLevelingUp ?
					<LevelUp functions={{
						char,
						setIsLevelingUp,
						charChanges,
						setCharChanges,
						decideAc
					}} />
				:''}
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
					<div className='skills_saves'>
						<div className='skills_sheet '>
							{Object.keys(char.skills).map((skill, k) => (
								<div>
									<strong>{skill}: </strong>
									{char.skills[skill].value}
								</div>
							))}
						</div>
						<div className='char_saves'>
							<p>
								<strong>Saving Throws</strong>	
							</p>
							<p className='str'>
								STR: {decideST('str')}
							</p>
							<p className='dex'>
								DEX: {decideST('dex')}
							</p>
							<p className='con'>
								CON: {decideST('con')}
							</p>
							<p className='int'>
								INT: {decideST('int')}
							</p>
							<p className='wis'>
								WIS: {decideST('wis')}
							</p>
							<p className='cha'>
								CHA: {decideST('cha')}
							</p>
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
					<button
						onClick={(e) => {e.preventDefault(); setIsLevelingUp(true)}}>Level Up</button>
				</div>

				<div id='char_actions'>
					<div className='char_bar'>
						<strong className='char_nav equip' onClick={(e) => { setActionPage('char_equip') }}>Equipment</strong>
						{char.primary_class.spellcasting ? <strong className='char_nav spells' onClick={(e) => { setActionPage('char_spells') }}>Spells</strong> : ''}
						<strong className='char_nav features' onClick={(e) => { setActionPage('char_features') }}>Features</strong>
					</div>
					<div id={setActionPage}>

						
						{
							actionPage === 'char_equip' ?
								<CharEquip char={char} />
								: actionPage === 'char_spells' ?
									<CharSpells char={char} />
									: actionPage === 'char_features' ?
										<CharFeatures char={char} /> 
											: <CharEquip char={char}/>
						}
					</div>
				</div >
				<div id='char_desc'>
					<Backstory
						functions={{
							char:char,
							setChar:setChar,
							charChanges:charChanges,
							setCharChanges:setCharChanges}} />
				</div>
				
				{char.primary_class.spellcasting ? 
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
				:''}
			
			</>
		:'Loading Character'}

			
		</div>
	)
}
