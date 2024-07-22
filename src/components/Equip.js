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

  const [baseAc, setBaseAc] = useState(10 + parseInt(fetchData.mods.dex))
  // useEffect(() => {

  //   const decideAC = async () => {
  //       if(fetchData?.chosen_equip?.length > 0){
  //           const equipUrls = fetchData?.chosen_equip?.map((item, i) => {
  //               return item.url
  //           })
  //           console.log(equipUrls)
  //           try{
  //               const fetchUrls = equipUrls.map((url, i) => fetch(`https://www.dnd5eapi.co${url}`))
  //               const res = await Promise.all(fetchUrls)

  //               res.forEach(res => {
  //                   if(!res){
  //                       throw new Error(`failed to fetch from ${res.url}`)
  //                   }
  //               })
  //               const data = await Promise.all(res.map(res => res.json()))
  //               console.log('chosen equip data', data)
  //               data.map((item, i) => {
  //                   if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && !item.armor_class.max_bonus){
  //                       console.log('light armor')
  //                       setBaseAc(parseInt(item.armor_class.base) + parseInt(fetchData.mods.dex))
  //                       console.log('AC', baseAc)
  //                   }else if(item.equipment_category.name === 'Armor' && item.armor_class.dex_bonus && item.armor_class.max_bonus > 0 && fetchData?.mods.dex >= 2){
  //                       console.log('medium armor')
  //                       setBaseAc(parseInt(item.armor_class.base) + parseInt(item.armor_class.max_bonus))
  //                       console.log('AC', baseAc)
  //                   }else if(item.equipment_category.name === 'Armor' && !item.armor_class.dex_bonus){
  //                       console.log('heavy armor')
  //                       setBaseAc(item.armor_class.base)
  //                       console.log('AC', baseAc)
  //                   }

  //                   for(let i=0; i < fetchData?.chosen_equip?.length; i++){
  //                     // for(let j=0; j < data.length; i++){
  //                     //   if(data[j].index === fetchData?.chosen_equip[i]?.index){

  //                     //   }
  //                     // }
  //                     const chosenEquip = fetchData?.chosen_equip

  //                     // chosenEquip.filter
  //                   }
  //               })


  //               console.log('data', data)
  //           }catch(err){
  //               console.error(err)
  //           }
  //       }else{
  //           console.log('goodbye')
  //       }
  //   }
  //   decideAC()
  // }, [fetchData.chosen_equip])

  // const [equipStorage, setEquipStorage] = useState([]) 
  // const equipFetch = (e, choice, i) => {
  //   console.log('choice', choice)
  //   try{
  //     const res = fetch(`https://dnd5eapi.co${choice?.of?.url}`)
  //     const data = res.json()

  //     console.log(data)
  //     // if(fetchData) 
  //   }catch(err){
  //     console.error(err)
  //   }
  // }

  const handleChange = async (e, choice, option, i) => {
    console.log('choice', choice)
    console.log('option', option)

    // if(option.from.option_set_type === 'options_array' && option.from)
    try{
      const res = await fetch(`https://dnd5eapi.co${choice?.of?.url}`)
      console.log('res', res)
      const data = await res.json()
      
      // ADDING INDEX TO CHOICE
      const dataIndex = {
        ...data,
        index:i
      }
      // REMOVING ANY ITEM THAT SHARES AN INDEX
      const isChosen = fetchData?.chosen_equip?.some(item => item.i === i)
      // IF YOURE CHANGING YOUR SELECTION FOR THAT CHOICE
      if(isChosen){
        setFetchData(prevData => ({
          ...prevData,
          chosen_equip:[
            ...prevData.chosen_equip.filter(x => x.index !== i),
            dataIndex
          ]
        }))
        console.log('hello')
      // IF YOU HAVE NOT MADE A PREVIOUS SELECTION FOR THAT CHOICE
      }else{
        setFetchData(prevData => ({
          ...prevData,
          chosen_equip:[
            ...prevData.chosen_equip || [],
            dataIndex
          ]
        }))
      }
      console.log(fetchData?.chosen_equip)
    }catch(err){
      console.error(err)
    }
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
              {fetchData?.primary_class?.equip?.starting_equip?.map((item, i) => {

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
                      options_arrray
                      <h4 className='equip_title'>
                        Choose 1
                      </h4>
                      {option.from.options.map((choice, j) => {
                        if(choice.option_type === 'counted_reference'){
                          return(
                            <div className='equip_option_parent'>
                            <p className='equip_option' key={`j_${i}_${j}`}>
                              <input
                                  type='radio'
                                  name={i}
                                  className='optionsArray equipChoice'
                                  // equipFetch(e, choice, i)
                                  onChange={(e) => {handleChange(e, choice, option, i); }}/>
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
                            </div>
                          )
                        }else if(choice.option_type === 'multiple'){
                          return(
                            <div className='equip_option_parent'>
                              multiple
                            <p className='equip_option' key={`j_${i}_${j}`}>
                              <input
                                    type='radio'
                                    name={i}
                                    className='optionsArray multiple'
                                    onChange={(e) => {handleChange(e, choice, option, i)}}/>

                              {choice.items.map((item, k) => (
                                <span key={`k_${k}`}>
                                  {console.log('multiple', item)}
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
                                        url: choice?.items[0]?.of?.url,
                                      }}/>
                                  : ''}
                            </p>
                            </div>
                          )
                        }else if(choice.option_type === 'choice'){
                          if(!choiceData[`choice${i}_${j}`]){
                            choiceFetch(choice?.choice?.from?.equipment_category?.url, `choice${i}_${j}`)
                          }
                          return(
                            <>
                              {choiceData[`choice${i}_${j}`]?.equipment?.map((item, k) => (
                                <div className='equip_option_parent'>
                                  choice
                                <p className='equip_option' key={`i_j_${i}_${j}_${k}`}>
                                  <input
                                    type='radio'
                                    name={i}
                                    className='optionsArray choice'
                                    onChange={(e) => {handleChange(e, item, option, i)}}/>
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
                                </div>
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
                }else if(option?.from?.option_set_type === 'equipment_category'){
                  console.log(option)
                  if(!choiceData[`choice${i}`]){
                    choiceFetch(option?.from?.equipment_category?.url, `choice${i}`)
                    // choiceFetch(choice?.choice?.from?.equipment_category?.url, `choice${i}`)
                  }
                  console.log('choiceData', choiceData)
                  return(
                    <div className='equip_options'>
                      choice<h4 className='equip_title'>
                        Choose 1
                      </h4>
                    
                    {choiceData?.[`choice${i}`]?.equipment.map((choice, j) => (
                      <div className='equip_option_parent'>
                      <p className='equip_option'>
                        <input
                          type='radio'
                          name={i}
                          className='equip_cat choice'
                          onChange={(e) => {handleChange(e, choice, i)}}/>
                        <label onMouseOver={(e) => {handleMouseOver(e, `primary_equip_${i}_${j}`)}} onMouseOut={handleMouseOut} htmlFor={i}>{choice?.name}</label>
                        {isHovering && hoveredKey === `primary_equip_${i}_${j}` ? 
                          <InfoCard 
                              functions={{
                                isHovering: isHovering,
                                url: choice.url,
                              }}/>
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
