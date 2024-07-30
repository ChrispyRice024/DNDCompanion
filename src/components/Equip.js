import { useState, React, useEffect } from "react";
import InfoCard from "./InfoCard"

export default function Equip({ functions }) {
	const { fetchData, setFetchData } = functions;

	const [isHovering, setIsHovering] = useState(null);
	const [hoveredKey, setHoveredKey] = useState(null);

	const [choiceData, setChoiceData] = useState({})

	const handleMouseOver = (e, key) => {
		setIsHovering(true);
		setHoveredKey(key);
		console.log(fetchData)
	};

	const handleMouseOut = (e) => {
		setIsHovering(false);
	};

	const handleMultipleChange = () => {
		
	}

	const handleChange = (e, choice, index, multiple) => {
		console.log('choice', choice)
		const choiceIndex = {
			...choice.of || choice,
			index: index
		}
		console.log('multiple', multiple)
		if(multiple){
			console.log('handleChange countedRefItem', multiple)
		}
		const isChosen = fetchData?.chosen_equip?.some(item => item.index === index)
		console.log('choiceIndex', choiceIndex, choice)
		// console.log(fetchData?.chosen_equip.filter(x => x.index !== index))
		if (isChosen) {
			setFetchData(prevData => ({
				...prevData,
				chosen_equip: [
					...prevData.chosen_equip.filter(x => x.index !== index),
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
		console.log(choice, e.target)

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
																	{/* {console.log(option)} */}
																	{choice?.prerequisites?.length > 0 ? choice?.prerequisites?.map((prereq, j) => (
																		<span>
																			<strong style={{ color: '#8B0000' }}>{' '}Requires {prereq?.type.charAt(0).toUpperCase() + prereq?.type.slice(1)} in {prereq?.proficiency?.name}</strong>
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
																					onChange={(e) => {handleChange(e, item, i, choice)}}/>
																				<label onMouseOver={(e) => { handleMouseOver(e, `primary_equip_multiple_${i}`) }} onMouseOut={handleMouseOut} htmlFor={i}>
																					{item.name} and {countedRefItem.of.name} multiple with choice
																				</label>
																				
																			</p>
																		)
																	})}
																	
																	{/* {choiceData?.[`choice_${i}_${j}`]?.equipment?.forEach((item, k) => {
																		console.log(item)
																		return (
																			<p>
																				{item.name}
																			</p>
																		) 
																	})} */}
																</div>
															)
														
														} else if (!choice.items.find(x => x.option_type === 'choice')) {
															console.log('countedRefItem', countedRefItem)
															return (
																<div className='equip_option_parent'>
																	<p className='equip_option' key={`j_${i}_${j}`}>
																		<input
																			type='radio'
																			name={i}
																			className='optionsArray multiple'
																			onChange={(e) => { handleChange(e, choice, i) }} />

																		{choice.items.map((item, k) => (
																			<span key={`k_${k}`}>
																				{console.log('multiple', item)}
																				<label onMouseOver={(e) => { handleMouseOver(e, `primary_equip_multiple_${i}`) }} onMouseOut={handleMouseOut} htmlFor={i}>{item?.count} {item?.of?.name}{item?.count > 1 ? 's' : ''} {k !== choice.items.length - 1 ? ' and ' : ''}</label>

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
														console.log(choice)
														return (
															<div>
																{choiceData[`choice${i}_${j}`]?.equipment?.map((item, k) => (
																	<div className='equip_option_parent'>
																		<p className='equip_option' key={`i_j_${i}_${j}_${k}`}>
																			<input
																				type='radio'
																				name={i}
																				className='optionsArray choice'
																				onChange={(e) => { handleChange(e, item, i, choice) }} />
																			<label onMouseOver={(e) => { handleMouseOver(e, `primary_equip_${i}_${j}_${k}`) }} onMouseOut={handleMouseOut} htmlFor={i}>{choice.choice.choose} {item.name}</label>

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

												{choiceData?.[`choice${i}`]?.equipment.map((choice, j) => (
													<div className='equip_option_parent'>
														<p className='equip_option'>
															<input
																type='radio'
																name={i}
																className='equip_cat choice'
																onChange={(e) => { handleChange(e, choice, i) }} />
															<label onMouseOver={(e) => { handleMouseOver(e, `primary_equip_${i}_${j}`) }} onMouseOut={handleMouseOut} htmlFor={i}>{choice?.name}</label>
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
