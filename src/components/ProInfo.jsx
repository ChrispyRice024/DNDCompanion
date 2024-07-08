import {useState, React, useEffect} from 'react'
import { Children } from 'react'
import InfoCard from './InfoCard'

export default function ProInfo ({functions}) {


    // `secondary_pro_${i}${j}`
    // `primary_pro_${i}${j}`
    const {fetchData, setFetchData} = functions

    const [primaryProChoiceDiv, setPrimaryProChoiceDiv] = useState()

    const [isHovering, setIsHovering] = useState(false)
	const [hoveredKey, setHoveredKey] = useState(null)

    const handleMouseOver = (e, key) => {
		setIsHovering(true)
		setHoveredKey(key)
	}

    const handleMouseOut = (e) => {
		setIsHovering(false)
	}

    //Proficiency Options
    useEffect(() => {

        const primaryProChoice = () => {
        
            const primaryChoices = fetchData?.primary_class?.proficiencies?.proficiency_choices 

                setPrimaryProChoiceDiv(
                    <div className='proficiency_choice'>
                        {primaryChoices?.map((choice, i) => {
                            return(
                                <div className='primary_pro' key={i}>
                                    
                                    <p className='class_title'>
                                        <strong>{choice.desc}</strong>
                                    </p>

                                    {choice.from.options.map((option, j) => {

                                        const chosenPro = (fetchData?.primary_class[`chosen_pro_${i}`])
                                        const max = choice?.choose
                               
                                        const isChecked = chosenPro?.some(obj => obj?.name === option?.item?.name)
                                        const isDisabled = chosenPro?.length >= max && !isChecked
                          
                                        const handleCheck = (e) => {
                                            const beenChecked = e.target.checked

                                            if(beenChecked){

                                                setFetchData(prevData => ({
                                                    ...prevData,
                                                    primary_class: {
                                                        ...prevData.primary_class,
                                                        [`chosen_pro_${i}`]:[
                                                                ...(prevData.primary_class[`chosen_pro_${i}`] || []),
                                                            {
                                                                name: e.target.value,
                                                                url:e.target.getAttribute('data-url'),
                                                                index:e.target.name
                                                            }    
                                                        ]
                                                    }
                                                }))
                                                
                                            }else if (!beenChecked){
                                                setFetchData((prevData) => ({
                                                    ...prevData,
                                                    primary_class:{
                                                        ...prevData.primary_class,
                                                        [`chosen_pro_${i}`]:[
                                                            ...prevData.primary_class[`chosen_pro_${i}`].filter((x) => x.name !== e.target.value)
                                                        ]
                                                    }
                                                }))
                                            }
                                            
                                        }
                                        if(option.option_type === 'reference'){
                                            return(
                                                <div className='classChoices' key={j}>
                                                    <p>
                                                    <input
                                                        type='checkbox'
                                                        value={option?.item?.name}
                                                        checked={isChecked}
                                                        name={option?.item?.index}
                                                        onChange={handleCheck}
                                                        disabled={isChecked ? false : isDisabled}
                                                        data-url={option?.item?.url}
                                                        />
                                                    <label onMouseOver={(e) => {handleMouseOver(e, `primary_pro_${i}${j}`)}} onMouseOut={handleMouseOut} htmlFor={option?.item?.index}>{option?.item?.name}</label>
                                                </p>    
                                                </div>
                                            )
                                        }else if(option.option_type === 'choice'){

                                            return(
                                                <div>
                                                    {option?.choice?.from?.options?.map((item, k) => {
                                                        return(
                                                            <p key={k}>
                                                                <input
                                                                    type='checkbox'
                                                                    value={item?.item?.name}
                                                                    checked={isChecked}
                                                                    name={item?.item?.index}
                                                                    onChange={handleCheck}
                                                                    disabled={isChecked ? false : isDisabled}
                                                                    data-url={item?.item?.url}
                                                                    />
                                                                <label onMouseOver={(e) => {handleMouseOver(e, `primary_pro_${i}${j}`)}} onMouseOut={handleMouseOut} htmlFor={item?.item?.index}>{item?.item?.name}</label>
                                                            </p>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )}

        primaryProChoice()
    }, [fetchData, isHovering])

    //Proficiencies
    const [primaryProDiv, setPrimaryProDiv] = useState()

    useEffect(() => {
        const primaryPro = () => {

            const primary = fetchData?.primary_class?.proficiencies?.starting_proficiencies

                setPrimaryProDiv(
                    <div id='proficiencies_parent'>
                        <strong>{fetchData?.primary_class?.name}</strong>
                        <div key='sec_pro' className='proficiencies'>
                        

                        {primary.map((element, i) => (
                            

                            <div key={`sec_pro_${i}`}>
                                <p onMouseOver={(e) => {handleMouseOver(e, `primary_pro_${i}`)}} onMouseOut={handleMouseOut} key={i} className='classProficiencies' >
                                    {element.name}
                                </p>
                            </div>
                            
                        ))}
                    </div>
                    </div>
                    
                )
        }

        if('primary_class' in fetchData){
            primaryPro()
        }
    }, [fetchData, isHovering])

//final return statement
    return (
        <div id='classInfo'>
            
                {primaryProDiv}
                {primaryProChoiceDiv}
            
        </div>
    )
}