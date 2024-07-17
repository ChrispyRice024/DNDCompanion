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

    const isHidden = fetchData?.primary_class?.name ? '' : 'none'

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
                    <div className='proficiency_choice'  >
                        {primaryChoices?.map((choice, i) => {
                            return(
                                <div className='primary_pro' key={i}>
                                    
                                    <p className='class_title'>
                                        <strong>{choice.desc}</strong>
                                    </p>
                                    {console.log('choice', choice)}
                                    {choice.from.options.map((option, j) => {
                                        // {console.log('option', option)}
                                        const chosenPro = (fetchData?.primary_class?.[`chosen_pro_${i}`])
                                        const max = choice?.choose
                               
                                        // const isChecked = chosenPro?.some(obj => obj?.name === option?.item?.name)
                                        const isDisabled = chosenPro?.length >= max && !chosenPro?.some(obj => obj?.name === option?.item?.name)
                          
                                        const handleCheck = (e) => {
                                            const beenChecked = e.target.checked
                                            console.log('beenChecked', beenChecked)
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
                                                        {console.log('option', option)}
                                                    <input
                                                        type={choice.choose === 1 ? 'radio' : 'checkbox'}
                                                        value={option?.item?.name || ''}
                                                        // checked={isChecked}
                                                        name={option?.item?.index}
                                                        onChange={handleCheck}
                                                        disabled={isDisabled}
                                                        data-url={option?.item?.url}
                                                        />
                                                    <label onMouseOver={(e) => {handleMouseOver(e, `primary_pro_${i}${j}`)}} onMouseOut={handleMouseOut} htmlFor={option?.item?.index}>{option?.item?.name}</label>
                                                </p>    
                                                </div>
                                            )
                                        }
                                        if(option.option_type === 'choice'){
                                            console.log('choiceOption', option)
                                            return(
                                                <div id='classChoice2'>
                                                    {option?.choice?.from?.options?.map((item, k) => {
                                                        console.log(item)

                                                        const handleRadio = (checked) => {
                                                            if(checked){
                                                                setFetchData(prevData => ({
                                                                    ...prevData,
                                                                    primary_class:{
                                                                        ...prevData.primary_class,
                                                                        [`chosen_pro_${i}`]:item.item
                                                                    }
                                                                    
                                                                }))
                                                            }
                                                        }
                                                        
                                                        return(
                                                            <div className='classChoices'>
                                                                <p key={k}>
                                                                    <input
                                                                        type='radio'
                                                                        value={item?.item?.name}
                                                                        // checked={isChecked}
                                                                        name={`pro_${i}`}
                                                                        onChange={(e) => {handleRadio(e.target.checked)}}
                                                                        // disabled={isChecked && choice.choose === 1 ? false : isDisabled}
                                                                        data-url={item?.item?.url}
                                                                        />
                                                                    <label onMouseOver={(e) => {handleMouseOver(e, `primary_pro_${i}${k}`)}} onMouseOut={handleMouseOut} htmlFor={item?.item?.index}>{item?.item?.name}</label>
                                                                </p>
                                                            </div>
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

            const primary = fetchData?.primary_class?.proficiencies?.starting_proficiencies || []

                setPrimaryProDiv(
                    <div id='proficiencies_parent'>
                        <strong>{fetchData?.primary_class?.name}</strong>
                        <div key='sec_pro' className='proficiencies'>
                        

                        {primary.map((element, i) => (

                            <div className='single_proficiency' key={`sec_pro_${i}`}>
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
        <div id='classInfo' style={{display:isHidden}}>
            
                {primaryProDiv}
                {primaryProChoiceDiv}
            
        </div>
    )
}