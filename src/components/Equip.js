import { useState, React, useEffect } from "react";
import InfoCard from "./InfoCard"

export default function Equip({ functions }) {
	const { fetchData, setFetchData } = functions;

	const [isHovering, setIsHovering] = useState(null);
	const [hoveredKey, setHoveredKey] = useState(null);

	const [choiceData, setChoiceData] = useState({})

	useEffect(() => {
		if(fetchData.equipment){
			delete fetchData.equipment
		}
		console.log(fetchData)
	}, [])

	const handleMouseOver = (e, key) => {
		setIsHovering(true);
		setHoveredKey(key);
		console.log(fetchData)
	};

	const handleMouseOut = (e) => {
		setIsHovering(false);
	};

	const handleMultipleChange = (e, i, choice, item) => {

		let cReffItem = choice.items.filter(x => x.option_type !== 'choice')
		console.log(cReffItem)
		let mappedItems = []
		console.log(item)
		console.log(choice)
		// ITEM ONLY EXISTS IF ONE OF THE OPTION_TYPES IS CHOICE
		if(item){
			const itemChoice = choice.items.find(x => x.option_type === 'choice')
			console.log(itemChoice)
			item.count = itemChoice.choice.choose
			item.option = i
			// BY THIS POINT ITEM SHOULD BE COMPLETE
			console.log(item)
		}else if(cReffItem.length > 1){
			cReffItem.map((reffItem, j) => {
				reffItem.of.option = i
				reffItem.of.count = reffItem.count
				mappedItems.push(reffItem.of)
			})
		}
		console.log(mappedItems)
		
		console.log(choice)
	
		const isChosen = fetchData?.chosen_equip?.some(item => item.option !== i)
		if(isChosen && item){

			setFetchData(prevData => ({
				...prevData,
				chosen_equip:[
					...prevData.chosen_equip.filter(x => x.option !== i),
					...mappedItems,
					item
				]
			}))
		}else if(isChosen && !item){
			setFetchData(prevData => ({
				...prevData,
				chosen_equip: [
					...prevData.chosen_equip.filter(x => x.option !== i),
					...mappedItems
				]
			}))

		}else if(!isChosen && item){
			console.log('not chosen')
			setFetchData(prevData => ({
				...prevData,
				chosen_equip:[
					...mappedItems,
					item
				]
			}))
		}else if(!isChosen && !item){
			setFetchData(prevData => ({
				...prevData,
				chosen_equip: [
					...mappedItems
				]
			}))
		}
	}

	const handleChange = (e, item, index, choice, quantity) => {

		const count = quantity || item.count

		const choiceIndex = {
			...item.of || item,
			option: index,
			count:count
		}
		console.log('choiceIndex', choiceIndex)
		const isChosen = fetchData?.chosen_equip?.some(item => item.option === index)

		if (isChosen) {
			setFetchData(prevData => ({
				...prevData,
				chosen_equip: [
					...prevData.chosen_equip.filter(x => x.option !== index),
					choiceIndex
				]
			}))
			console.log('hello')
		} else {
			setFetchData(prevData => ({
				...prevData,
				chosen_equip: [
					...prevData.chosen_equip || [],
					choiceIndex
				]
			}))
		}
		console.log(item, e.target)

	}

	const choiceFetch = async (url, targetKey) => {
		try {
			const res = await fetch(`https://www.dnd5eapi.co${url}`)
			const data = await res.json()

			setChoiceData(prevData => ({
				...prevData,
				[targetKey]: data
			}))
		} catch (err) {
			console.error(err)
		}
	}
	let isHidden
	if (fetchData.primary_class || fetchData.secondary_class) {
		isHidden = ''
	} else {
		isHidden = 'hidden'
	}

	return (
		<div id='outer_equip_parent' style={{ visibility: `${isHidden}` }}>
			<div id='inner_equip_parent' style={{ visibility: `${isHidden}` }}>
				{fetchData?.primary_class ?
					<div id='outer_equip_conditional'>
						<div id='primary_starting_equip'>
							<p>
								<strong>Starting Equipment For {fetchData?.primary_class?.name}</strong>
							</p>
							<span>
								{fetchData?.primary_class?.equip?.starting_equip?.map((item, i) => {

									return (
										<div key={`1_${i}`}>
											<p onMouseOver={(e) => { handleMouseOver(e, `primary_start_equip_${i}`) }} onMouseOut={handleMouseOut}>
												{item.equipment.name}
											</p>

											{isHovering && hoveredKey === `primary_start_equip_${i}` ?
												<InfoCard
													functions={{
														isHovering: isHovering,
														url: item.equipment.url,
													}} />
												: ''}
										</div>
									)
								})}
							</span>
						</div>
						<div id='primary_equip_options'>
							<span>
								<strong>Equip Choices</strong>
								{fetchData.primary_class?.equip?.equip_options?.map((option, i) => {

									// OPTIONS ARRAY
									if (option?.from?.option_set_type === 'options_array') {

										return (
											<div key={`2_${i}`} className='equip_options'>

												<h4 className='equip_title'>
													Choose 1
												</h4>
												{option.from.options.map((choice, j) => {
													console.log(choice)
													if (choice.option_type === 'counted_reference') {
														return (
															<div className='equip_option_parent'>
																<p className='equip_option' key={`j_${i}_${j}`}>
																	<input
																		type='radio'
																		name={i}
																		className='optionsArray equipChoice'
																		onChange={(e) => { handleChange(e, choice, i) }} />
																	<label onMouseOver={(e) => { handleMouseOver(e, `primary_equip_${i}_${j}`) }} onMouseOut={handleMouseOut} htmlFor={choice?.of?.name}>{choice.count} {choice?.of?.name}</label>
																	{choice?.prerequisites?.length > 0 ? choice?.prerequisites?.map((prereq, j) => (
																		<span>
																			<strong style={{ color: '#8B0000' }}>{' '}Requires {prereq?.type.charAt(0).toUpperCase() + prereq?.type.slice(1)} in {prereq?.proficiency?.name} counted ref</strong>
																		</span>
																	)) : ''}
																	{isHovering && hoveredKey === `primary_equip_${i}_${j}` ?
																		<InfoCard
																			functions={{
																				isHovering: isHovering,
																				url: choice.of.url,
																			}} />
																		: ''}
																</p>
															</div>
														)
													} else if (choice.option_type === 'multiple') {

														const choiceItem = choice.items.find(x => x.option_type === 'choice')
														const countedRefItem = choice.items.find(x => x.option_type === 'counted_reference')

														if (choice.items.find(x => x.option_type === 'choice')){
															console.log(choiceItem)
															if(!choiceData[`choice_${i}_${j}`]){
																choiceFetch(choiceItem.choice.from.equipment_category.url, `choice_${i}_${j}`)
															}
															console.log(choiceData[`choice_${i}_${j}`])

															

															return (
																<div >
																	
																	{console.log(choiceData?.[`choice_${i}_${j}`]?.equipment)}
																	
																	{choiceData?.[`choice_${i}_${j}`]?.equipment.map((item, k) => {

																		return(
																			<p className='equip_option' key={`j_${i}_${j}_${k}`}>
																				<input
																					type='radio'
																					name={i}
																					className='choice multiple'
																					onChange={(e) => {handleMultipleChange(e, i, choice, item)}}/>
																				<label onMouseOver={(e) => { handleMouseOver(e, `primary_equip_multiple_${i}`) }} onMouseOut={handleMouseOut} htmlFor={i}>
																					{item.name} and {countedRefItem.of.name} multiple with choice
																				</label>
																				
																			</p>
																		)
																	})}
																</div>
															)
														
														} else if (choice.items.find(x => x.option_type !== 'choice')) {
															console.log('countedRefItem', countedRefItem)
															console.log('choice in choice', choice)
															return (
																<div className='equip_option_parent'>
																	<p className='equip_option' key={`j_${i}_${j}`}>
																		<input
																			type='radio'
																			name={i}
																			className='optionsArray multiple'
																			onChange={(e) => { handleMultipleChange(e, i, choice) }} />

																		{choice.items.map((item, k) => (
																			<span key={`k_${k}`}>
																				{console.log('multiple', item)}
																				<label onMouseOver={(e) => { handleMouseOver(e, `primary_equip_multiple_${i}`) }} onMouseOut={handleMouseOut} htmlFor={i}>{item?.count} {item?.of?.name}{item?.count > 1 ? 's' : ''} {k !== choice.items.length - 1 ? ' and ' : ''}multiple countedRef</label>

																			</span>
																		))}

																		{choice?.prerequisites?.length > 0 ? choice?.prerequisites?.map((prereq, j) => (
																			<span>
																				<strong style={{ color: '#8B0000' }}>{' '}Requires {prereq?.type.charAt(0).toUpperCase() + prereq?.type.slice(1)} in {prereq?.proficiency?.name}</strong>
																			</span>
																		)) : ''}
																		{console.log(choice)}
																		{isHovering && hoveredKey === `primary_equip_multiple_${i}` ?
																			<InfoCard
																				functions={{
																					isHovering: isHovering,
																					url: choice?.items[0]?.of?.url,
																				}} />
																			: ''}
																	</p>
																</div>
															)
														}
														
														
														
													} else if (choice.option_type === 'choice') {
														if (!choiceData[`choice${i}_${j}`]) {
															choiceFetch(choice?.choice?.from?.equipment_category?.url, `choice${i}_${j}`)
														}
														console.log(choice.choice.choose)
														console.log('choice', choice)
														const count = choice.choice.choose
														console.log('count', count)
														return (
															<div>
																{choiceData[`choice${i}_${j}`]?.equipment?.map((item, k) => (
																	<div className='equip_option_parent'>
																		<p className='equip_option' key={`i_j_${i}_${j}_${k}`}>
																			<input
																				type='radio'
																				name={i}
																				className='optionsArray choice'
																				onChange={(e) => { handleChange(e, item, i, choice, count ) }} />
																			<label onMouseOver={(e) => { handleMouseOver(e, `primary_equip_${i}_${j}_${k}`) }} onMouseOut={handleMouseOut} htmlFor={i}>{choice.choice.choose} {item.name} choice</label>

																			{choice?.prerequisites?.length > 0 ? choice?.prerequisites?.map((prereq, j) => (
																				<span>
																					<strong style={{ color: '#8B0000' }}>{' '}Requires {prereq?.type.charAt(0).toUpperCase() + prereq?.type.slice(1)} in {prereq?.proficiency?.name}</strong>
																				</span>
																			)) : ''}

																			{isHovering && hoveredKey === `primary_equip_${i}_${j}_${k}` ?
																				<InfoCard
																					functions={{
																						isHovering: isHovering,
																						url: item.url,
																					}} />
																				: ''}
																		</p>
																	</div>
																))}
															</div>
														)
													} else {
														return (
															<p>
																'you forgot a option type ({choice.option_type})'
															</p>
														)
													}


												})}
											</div>
										)
									} else if (option?.from?.option_set_type === 'equipment_category') {
										console.log(option)
										if (!choiceData[`choice${i}`]) {
											choiceFetch(option?.from?.equipment_category?.url, `choice${i}`)
											// choiceFetch(choice?.choice?.from?.equipment_category?.url, `choice${i}`)
										}
										console.log('choiceData', choiceData)
										return (
											<div className='equip_options'>
												<h4 className='equip_title'>
													Choose 1
												</h4>
												{console.log(option)}
												{choiceData?.[`choice${i}`]?.equipment.map((choice, j) => (
													<div className='equip_option_parent'>
														<p className='equip_option'>
															{console.log('choice in choice', choice)}
															<input
																type='radio'
																name={i}
																className='equip_cat choice'
																onChange={(e) => { handleChange(e, choice, i, undefined, option.choose) }} />
															<label onMouseOver={(e) => { handleMouseOver(e, `primary_equip_${i}_${j}`) }} onMouseOut={handleMouseOut} htmlFor={i}>{choice?.name} choice</label>
															{isHovering && hoveredKey === `primary_equip_${i}_${j}` ?
																<InfoCard
																	functions={{
																		isHovering: isHovering,
																		url: choice.url,
																	}} />
																: ''}
														</p>
													</div>
												))}
											</div>
										)
									}
								})}
							</span>
						</div>

					</div>
					: ''}

			</div>
		</div>
	);
}