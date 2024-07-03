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

  const handleChange = (e, choice, index) => {
    console.log('choice', choice)
    const choiceIndex = {
      ...choice.of || choice,
      index:index
    }
    const isChosen = fetchData?.chosen_equip?.some(item => item.index === index)
    console.log('choiceIndex', choiceIndex, choice)
    // console.log(fetchData?.chosen_equip.filter(x => x.index !== index))
    if(isChosen){
      setFetchData(prevData => ({
        ...prevData,
        chosen_equip:[
          ...prevData.chosen_equip.filter(x => x.index !== index),
          choiceIndex
        ]
      }))
      console.log('hello')
    }else{
      setFetchData(prevData => ({
        ...prevData,
        chosen_equip:[
          ...prevData.chosen_equip || [],
          choiceIndex
        ]
      }))
    }
    console.log(choice, e.target)
    
  }

  const choiceFetch = async (url, targetKey) => {
    try{
      const res = await fetch(`https://www.dnd5eapi.co${url}`)
      const data = await res.json()

      setChoiceData(prevData => ({
        ...prevData,
        [targetKey]: data
      }))
    }catch(err){
      console.error(err)
    }
  }
  let isHidden
  if(fetchData.primary_class || fetchData.secondary_class){
    isHidden = ''
  }else{
    isHidden = 'hidden'
  }

  return (
    <div id='outer_equip_parent' style={{visibility:`${isHidden}`}}>
      <div id='inner_equip_parent' style={{visibility:`${isHidden}`}}>
        {fetchData?.primary_class ?
        <div id='outer_equip_conditional'>
          <div id='primary_starting_equip'>
            <p>
              <strong>Starting Equipment For {fetchData?.primary_class?.name}</strong>
            </p>
            <span>
              {fetchData.primary_class.equip.starting_equip?.map((item, i) => {

                return(
                  <div key={`1_${i}`}>
                    <p onMouseOver={(e) => {handleMouseOver(e, `primary_start_equip_${i}`)}} onMouseOut={handleMouseOut}>
                      {item.equipment.name}
                    </p>

                    {isHovering && hoveredKey === `primary_start_equip_${i}` ? 
                      <InfoCard 
                        functions={{
                          isHovering: isHovering,
                          url: item.equipment.url,
                        }}/>
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
                if(option?.from?.option_set_type === 'options_array'){

                  return (
                    <div key={`2_${i}`} className='equip_options'>
                      <p>
                        Choose 1
                      </p>
                      {option.from.options.map((choice, j) => {
                        if(choice.option_type === 'counted_reference'){
                          return(
                            
                            <p key={`j_${i}_${j}`}>
                              <input
                                  type='radio'
                                  name={i}
                                  className='optionsArray equipChoice'
                                  onChange={(e) => {handleChange(e, choice, i)}}/>
                                <label onMouseOver={(e) => {handleMouseOver(e, `primary_equip_${i}_${j}`)}} onMouseOut={handleMouseOut} htmlFor={choice?.of?.name}>{choice.count} {choice?.of?.name}</label>
                                {/* {console.log(option)} */}
                                {choice?.prerequisites?.length > 0 ? choice?.prerequisites?.map((prereq, j) =>(
                                  <span>
                                    <strong style={{color:'#8B0000'}}>{' '}Requires {prereq?.type.charAt(0).toUpperCase() + prereq?.type.slice(1)} in {prereq?.proficiency?.name}</strong>
                                  </span>
                                )) :''}
                                {isHovering && hoveredKey === `primary_equip_${i}_${j}` ? 
                                  <InfoCard 
                                    functions={{
                                      isHovering: isHovering,
                                      url: choice.of.url,
                                    }}/>
                                : ''}
                            </p>
                          )
                        }else if(choice.option_type === 'multiple'){
                          return(
                            <p key={`j_${i}_${j}`}>
                              <input
                                    type='radio'
                                    name={i}
                                    className='optionsArray multiple'
                                    onChange={(e) => {handleCheck(e, choice, i)}}/>

                              {choice.items.map((item, k) => (
                                <span key={`k_${k}`}>
                                  
                                  <label onMouseOver={(e) => {handleMouseOver(e, `primary_equip_multiple_${i}`)}} onMouseOut={handleMouseOut} htmlFor={i}>{item?.count} {item?.of?.name}{item?.count > 1 ? 's': ''} {k !== choice.items.length - 1 ? ' and ' :''}</label>
                                  
                                </span>
                              ))}

                              {choice?.prerequisites?.length > 0 ? choice?.prerequisites?.map((prereq, j) =>(
                                  <span>
                                    <strong style={{color:'#8B0000'}}>{' '}Requires {prereq?.type.charAt(0).toUpperCase() + prereq?.type.slice(1)} in {prereq?.proficiency?.name}</strong>
                                  </span>
                                )) :''}
                              {console.log(choice)}
                              {isHovering && hoveredKey === `primary_equip_multiple_${i}` ? 
                                    <InfoCard 
                                      functions={{
                                        isHovering: isHovering,
                                        url: choice.items[0].of.url,
                                      }}/>
                                  : ''}
                            </p>
                          )
                        }else if(choice.option_type === 'choice'){
                          if(!choiceData[`choice${i}_${j}`]){
                            choiceFetch(choice?.choice?.from?.equipment_category?.url, `choice${i}_${j}`)
                          }
                          return(
                            <>
                              {choiceData[`choice${i}_${j}`]?.equipment?.map((item, k) => (
                                <p key={`i_j_${i}_${j}_${k}`}>
                                  <input
                                    type='radio'
                                    name={i}
                                    className='optionsArray choice'
                                    onChange={(e) => {handleChange(e, item, i)}}/>
                                  <label onMouseOver={(e) => {handleMouseOver(e, `primary_equip_${i}_${j}_${k}`)}} onMouseOut={handleMouseOut} htmlFor={i}>{item.name}</label>

                                  {choice?.prerequisites?.length > 0 ? choice?.prerequisites?.map((prereq, j) =>(
                                    <span>
                                      <strong style={{color:'#8B0000'}}>{' '}Requires {prereq?.type.charAt(0).toUpperCase() + prereq?.type.slice(1)} in {prereq?.proficiency?.name}</strong>
                                    </span>
                                  )) :''}

                                  {isHovering && hoveredKey === `primary_equip_${i}_${j}_${k}` ? 
                                    <InfoCard 
                                        functions={{
                                          isHovering: isHovering,
                                          url: item.url,
                                        }}/>
                                  : ''}
                                </p>
                              ))}
                            </>
                          )
                        }else{
                          return(
                            <p>
                              'you forgot a option type ({choice.option_type})'
                            </p>
                          )
                        }
                        
                  })}
                    </div>
                  )
                }else if(option?.from?.options_set_type === 'equipment_category'){
                  
                  if(!choiceData[`choice${i}`]){
                    choiceFetch(choice?.choice?.from?.equipment_category?.url, `choice${i}`)
                  }
                  return(
                    <>
                    {/* {console.log('hello!!!!!', choiceData)} */}
                    you need logic here (line205)
                    </>
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
