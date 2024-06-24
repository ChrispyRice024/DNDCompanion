import { useState, React, useEffect } from "react";
import InfoCard from "./InfoCard"

export default function Equip({ functions }) {
  const { character, setCharacter, fetchData, setFetchData } = functions;

  const [primaryEquip, setPrimaryEquip] = useState([]);
  const [primaryEquipOptions, setPrimaryEquipOptions] = useState([]);

  const [secondaryEquip, setSecondaryEquip] = useState([]);
  const [secondaryEquipOptions, setSecondaryEquipOptions] = useState([]);

  const [isHovering, setIsHovering] = useState(null);
  const [event, setEvent] = useState(null);
  const [spawnCount, setSpawnCount] = useState(0);
  const [key, setKey] = useState(null);
  const [hoveredKey, setHoveredKey] = useState(null);
  const [className, setClassName] = useState("");

  const [choiceData, setChoiceData] = useState({})

  const parentName = `Equipment_infoCard`;

  const handleMouseOver = (e, key) => {

    setIsHovering(true);
    setEvent(e);
    setKey(key);
    setHoveredKey(key);
  };

  const handleMouseOut = (e) => {
    setIsHovering(false);
    setEvent(null);
    setSpawnCount((prevCount) => prevCount + 1);
    console.log("goodbye");
  };

  const choiceFetch = async (url, targetKey) => {
    try{
      const res = await fetch(`https://www.dnd5eapi.co${url}`)
      const data = await res.json()

      // console.log(data)
      setChoiceData(prevData => ({
        ...prevData,
        [targetKey]: data
      }))
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    console.log(choiceData)
  }, [choiceData])

  // console.log(fetchData.equip_options)
//   useEffect(() => {
//     console.log({ isHovering, event, hoveredKey });
//   });
  // Makes the main useEffect re-render to display the fetched data
  const [stall, setStall] = useState(0);

  //fetches the equipmet and equipment options
  // useEffect(() => {
  //   const primaryUrl = character?.class?.primary?.url;
  //   const secondaryUrl = character?.class?.secondary?.url;

  //   if (primaryUrl) {
  //     fetch(`https://www.dnd5eapi.co${primaryUrl}/starting-equipment`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setPrimaryEquip(data.starting_equipment);
  //         setPrimaryEquipOptions(data.starting_equipment_options);

  //       });
  //   }
  //   if (secondaryUrl) {
  //     fetch(`https://www.dnd5eapi.co${secondaryUrl}/starting-equipment`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setSecondaryEquip(data.starting_equipment);

  //         setSecondaryEquipOptions(data.starting_equipment_options);
  //       });
  //   }
  // }, [character]);

  useEffect(() => {});

  // useEffect(() => {
  //   if (stall === 1 && !character.class.primary.className) {
  //     setStall(0);
  //   }
  // });

  const [primaryEquipDiv, setPrimaryEquipDiv] = useState();
  const [secondaryEquipDiv, setSecondaryEquipDiv] = useState();

  const [primaryOptionsDiv, setPrimaryOptionsDiv] = useState();
  const [secondaryOptionsDiv, setSecondaryOptionsDiv] = useState();

  const [chosenEquipPrimary, setChosenEquipPrimary] = useState([]);
  const [chosenequipSecondary, setChosenEquipSecondary] = useState([]);

  const [fetchedData, setFetchedData] = useState({});

  console.log(fetchData)
  //sets the divs with euipment and equipment options

  const populateStartingEquip = () => {
    if(fetchData?.primary_class?.equip?.starting_equip){
      setPrimaryEquipDiv(
        <>
          <strong>
            Starting Equipment For {fetchData.primary_class.name}
          </strong>
        </>
      )
    }
  }
  // useEffect(() => {
  //   if (fetchData?.primary_class?.equip?.starting_equip) {
  //     // List of items you are given. no choice
  //     setPrimaryEquipDiv(

  //       <div id="primaryEquip">
          
  //         <strong>
  //           {character.class.primary.className} Starting Equipment
  //         </strong>

  //         {primaryEquip.map((equip, i) => (
          
  //           <p key={i}>
  //             {equip.quantity} {equip.equipment.name}
  //           </p>
          
  //         ))}
  //       </div>
  //     );
  //   }
  //   //sets the options div
  //   if (fetchData?.equip?.equip_options) {
      
  //       setPrimaryOptionsDiv(
        
  //       <div>
          
  //         {character.class.primary.className} Equipment Options
  //         {/* iterates through the main options */}
          
  //         {primaryEquipOptions.map((option, i) => {
          
  //           // sets chosenEquipPrimary to the chosen equipment
  //           const handleChange = async (e, url) => {
  //             try {
  //               const res = await fetch(`https://www.dnd5eapi.co${url}`);
  //               const data = await res.json();

  //               setChosenEquipPrimary((prevEquip) => {
  //                 let newData = { ...prevEquip };
  //                 newData[e.target.name] = data;

  //                 return newData;
  //               });
  //             } catch (err) {
  //               console.error(err);
  //             }
  //           };
            
  //           // options_array is an array of 2 or more options
  //           if (option.from.option_set_type === "options_array") {
              
  //             return (
  //               <div>
  //                 pick one
                  
  //                 {option.from.options.map((choice, j) => {
  //                   const letter = ["A", "B", "C", "D", "E"];
                    
  //                   // counted_reference has a quantity(count) and item
  //                   if (choice.option_type === "counted_reference") {
  //                     return (
                        
  //                       <p>
                          
  //                         <input
  //                           type="radio"
  //                           name={`equipOption${i}_${j}`}
  //                           id={choice?.of?.index}
  //                           onChange={(e) => handleChange(e, choice?.of?.url)}
  //                         />
                          
  //                         <label
  //                           key={`primaryOption_${i}_${j}`}
  //                           htmlFor={choice.of.name}
  //                           onMouseOver={(e) =>
  //                             handleMouseOver(e, `primaryOption_${i}_${j}`)
  //                           }
  //                           onMouseOut={handleMouseOut}
  //                           data-url={choice.of.url}
  //                         >
  //                           {letter[j]} | {choice?.count}{" "}
                            
  //                           {choice?.count > 1
  //                             ? `${choice?.of?.name}s`
  //                             : choice?.of?.name}
  //                         </label>
                          
  //                         {isHovering &&
  //                         event &&
  //                         hoveredKey === `primaryOption_${i}_${j}` ? (
  //                           <InfoCard
  //                             functions={{
  //                               character: character,
  //                               event: event,
  //                               isHovering: isHovering,
  //                               spawnCount: spawnCount,
  //                               setSpawnCount: setSpawnCount,
  //                               className: hoveredKey,
  //                               parentName: parentName,
  //                               hoveredKey: hoveredKey,
  //                               url: choice.of.url,
  //                             }}
  //                           />
  //                         ) : (
  //                           ""
  //                         )}
  //                       </p>
  //                     );
  //                     // multiple has 2 or more counted_references that come together in one choice
  //                   } else if (choice.option_type === "multiple") {
  //                     return (
  //                       <p>
  //                         <input
  //                           type="radio"
  //                           name={`equipOption${i}`}
  //                           id={choice?.of?.index}
  //                           onChange={(e) => handleChange(e, choice?.of?.url)}
  //                         />
  //                         {choice.items.map((item, k) => {
  //                           return (
  //                             <span key={k}>
  //                               {item?.count}{" "}
  //                               {item?.count > 1
  //                                 ? `${item?.of?.name}s`
  //                                 : item?.of?.name}
  //                               {k < choice?.items?.length - 1 ? " and " : ""}
  //                             </span>
  //                           );
  //                         })}
  //                       </p>
  //                     );
  //                     //choice is a list retrieved from a fetch call
  //                   } else if (choice.option_type === "choice") {
  //                     const url = choice.choice.from.equipment_category.url;

  //                     //the fetch call setting fetchedData with a unique key
  //                     const getData = async () => {
  //                       let data;
  //                       try {
  //                         const res = await fetch(
  //                           `https://www.dnd5eapi.co${choice.choice.from.equipment_category.url}`
  //                         );
  //                         data = await res.json();

  //                         if (
  //                           !fetchedData[
  //                             `${character.class.primary.className}_${j}_C`
  //                           ]
  //                         ) {
  //                           setFetchedData((prevData) => ({
  //                             ...prevData,
  //                             [`${character.class.primary.className}_${i}_${j}_C`]:
  //                               data,
  //                           }));
  //                         }

  //                       } catch (err) {
  //                         console.error(err);
  //                       }
  //                     };
  //                     getData();

  //                     return (
  //                       <div>
  //                         <p>or any {choice.choice.desc}</p>
  //                         {fetchedData[
  //                           `${character?.class?.primary?.className}_${i}_${j}_C`
  //                         ]?.equipment
  //                           ?.sort((a, b) => a.name.localeCompare(b.name))
  //                           .map((item, k) => {
  //                             return (
  //                               <span key={`${item.name}_${j}_${k}`}>
  //                                 <input
  //                                   type="radio"
  //                                   name={`equipOption${i}_${j}_${k}`}
  //                                   id={item?.index}
  //                                   onChange={(e) => handleChange(e, item.url)}
  //                                 />
  //                                 <label
  //                                   onMouseOver={(e) =>
  //                                     handleMouseOver(
  //                                       e,
  //                                       `${item.name}_${i}_${j}_${k}`
  //                                     )
  //                                   }
  //                                   onMouseOut={handleMouseOut}
  //                                   data-url={item.url}
  //                                 >
  //                                   {item.name}
  //                                 </label>
  //                                 <p>
  //                                   {isHovering &&
  //                                   event &&
  //                                   hoveredKey ===
  //                                     `${item.name}_${i}_${j}_${k}` ? (
  //                                     <InfoCard
  //                                       functions={{
  //                                         character: character,
  //                                         event: event,
  //                                         isHovering: isHovering,
  //                                         spawnCount: spawnCount,
  //                                         setSpawnCount: setSpawnCount,
  //                                         className: hoveredKey,
  //                                         parentName: parentName,
  //                                         hoveredKey: hoveredKey,
  //                                         url: item.url,
  //                                       }}
  //                                     />
  //                                   ) : (
  //                                     ""
  //                                   )}
  //                                 </p>
  //                               </span>
  //                             );
  //                           })}
  //                       </div>
  //                     );
  //                   }
  //                 })}
  //               </div>
  //             );
  //             //equipment_category is a list of items from a fetch call
  //           } else if (option.from.option_set_type === "equipment_category") {
  //             //the fetch call sets fetchedData with a unique key
  //             const getData = async () => {
  //               const url = option.from.equipment_category.url;
  //               try {
  //                 const res = await fetch(`https://dnd5eapi.co${url}`);
  //                 const data = await res.json();

  //                 setFetchedData((prevData) => ({
  //                   ...prevData,
  //                   [`${character.class.primary.className}_${i}_EC`]: data,
  //                 }));
  //               } catch (err) {
  //                 console.error(err);
  //               }
  //             };
  //             getData();

  //             return (
  //               <div>
  //                 pick one{" "}
  //                 {
  //                   fetchedData[`${character.class.primary.className}_${i}_EC`]
  //                     ?.name
  //                 }
  //                 {fetchedData[
  //                   `${character.class.primary.className}_${i}_EC`
  //                 ]?.equipment.map((item, k) => {
  //                   return (
  //                     <p key={`${item.name}_ ${i}_${k}`}>
  //                       <input
  //                         type="radio"
  //                         name={`equipOption${i}`}
  //                         id={item?.index}
  //                         onChange={(e) => handleChange(e, item.url)}
  //                       />
  //                       <label
  //                         key={`${item.name}_${i}_${k}`}
  //                         htmlFor={item.name}
  //                         onMouseOver={(e) =>
  //                           handleMouseOver(e, `${item.name}_${i}_${k}`)
  //                         }
  //                         onMouseOut={handleMouseOut}
  //                         data-url={item.url}
  //                       >
  //                         {item.name}
  //                       </label>
  //                       <span>
  //                         {isHovering &&
  //                         event &&
  //                         hoveredKey === `${item.name}_${i}_${k}` ? (
  //                           <InfoCard
  //                             functions={{
  //                               character: character,
  //                               event: event,
  //                               isHovering: isHovering,
  //                               spawnCount: spawnCount,
  //                               setSpawnCount: setSpawnCount,
  //                               className: hoveredKey,
  //                               parentName: parentName,
  //                               hoveredKey: hoveredKey,
  //                               url: item.url,
  //                             }}
  //                           />
  //                         ) : (
  //                           ""
  //                         )}
  //                       </span>
  //                     </p>
  //                   );
  //                 })}
  //               </div>
  //             );
  //           }
  //         })}
  //       </div>
  //     );
  //   }

  //   if (secondaryEquip.length > 0) {
  //     setSecondaryEquipDiv(
  //       <div>
  //         <strong>
  //           {character.class.secondary.className} Starting Equipment
  //         </strong>
  //         {secondaryEquip.map((equip, i) => (
  //           <p key={i}>
  //             {equip.quantity} {equip.equipment.name}
  //           </p>
  //         ))}
  //       </div>
  //     );
  //   }
  //   if (secondaryEquipOptions.length > 0) {
  //     setSecondaryOptionsDiv(
  //       <div>
  //         {character.class.secondary.className} Equipment Options
  //         {/* iterates through the main options */}
  //         {secondaryEquipOptions.map((option, i) => {

  //           // sets chosenEquipSecondary to the chosen equipment
  //           const handleChange = async (e, url) => {
  //             try {
  //               const res = await fetch(`https://www.dnd5eapi.co${url}`);
  //               const data = await res.json();

  //               setChosenEquipSecondary((prevEquip) => {
  //                 let newData = { ...prevEquip };
  //                 newData[e.target.name] = data;

  //                 return newData;
  //               });
  //             } catch (err) {
  //               console.error(err);
  //             }
  //           };
  //           // options_array is an array of 2 or more options
  //           if (option.from.option_set_type === "options_array") {
  //             return (
  //               <div>
  //                 pick one
  //                 {option.from.options.map((choice, j) => {
  //                   const letter = ["A", "B", "C", "D", "E"];
  //                   // counted_reference has a quantity(count) and item
  //                   if (choice.option_type === "counted_reference") {
  //                     return (
  //                       <p>
  //                         <input
  //                           type="radio"
  //                           name={`equipOption${i}`}
  //                           id={choice?.of?.index}
  //                           onChange={(e) => handleChange(e, choice?.of?.url)}
  //                         />
  //                         {letter[j]} | {choice?.count}{" "}
  //                         {choice?.count > 1
  //                           ? `${choice?.of?.name}s`
  //                           : choice?.of?.name}
  //                       </p>
  //                     );
  //                     // multiple has 2 or more counted_references that come together in one choice
  //                   } else if (choice.option_type === "multiple") {
  //                     return (
  //                       <p>
  //                         <input
  //                           type="radio"
  //                           name={`equipOption${i}`}
  //                           id={choice?.of?.index}
  //                           onChange={(e) => handleChange(e, choice?.of?.url)}
  //                         />
  //                         {choice.items.map((item, k) => {
  //                           return (
  //                             <span key={k}>
  //                               {item?.count}{" "}
  //                               {item?.count > 1
  //                                 ? `${item?.of?.name}s`
  //                                 : item?.of?.name}
  //                               {k < choice?.items?.length - 1 ? " and " : ""}
  //                             </span>
  //                           );
  //                         })}
  //                       </p>
  //                     );
  //                     //choice is a list retrieved from a fetch call
  //                   } else if (choice.option_type === "choice") {
  //                     const url = choice.choice.from.equipment_category.url;

  //                     //the fetch call setting fetchedData with a unique key
  //                     const getData = async (url) => {
  //                       try {
  //                         const res = await fetch(
  //                           `https://www.dnd5eapi.co${choice.choice.from.equipment_category.url}`
  //                         );
  //                         const data = await res.json();
  //                         setFetchedData((prevData) => ({
  //                           ...prevData,
  //                           [`${character.class.secondary.className}_${j}_C`]:
  //                             data,
  //                         }));
  //                       } catch (err) {
  //                         console.error(err);
  //                       }
  //                     };
  //                     getData();

  //                     return (
  //                       <div>
  //                         <p>or any {choice.choice.desc}</p>
  //                         {fetchedData[
  //                           `${character?.class?.secondary?.className}_${j}_C`
  //                         ]?.equipment.map((item, k) => {
  //                           return (
  //                             <p>
  //                               <input
  //                                 type="radio"
  //                                 name={`equipOption${i}`}
  //                                 id={item?.index}
  //                                 onChange={(e) => handleChange(e, item.url)}
  //                               />
  //                               {item.name}
  //                             </p>
  //                           );
  //                         })}
  //                       </div>
  //                     );
  //                   }
  //                 })}
  //               </div>
  //             );
  //             //equipment_category is a list of items from a fetch call
  //           } else if (option.from.option_set_type === "equipment_category") {

  //             //the fetch call sets fetchedData with a unique key
  //             const getData = async () => {
  //               const url = option.from.equipment_category.url;
  //               try {
  //                 const res = await fetch(`https://dnd5eapi.co${url}`);
  //                 const data = await res.json();

  //                 setFetchedData((prevData) => ({
  //                   ...prevData,
  //                   [`${character.class.secondary.className}_${i}_EC`]: data,
  //                 }));
  //               } catch (err) {
  //                 console.error(err);
  //               }
  //             };
  //             getData();

  //             return (
  //               <div>
  //                 pick one{" "}
  //                 {
  //                   fetchedData[
  //                     `${character.class.secondary.className}_${i}_EC`
  //                   ]?.name
  //                 }
  //                 {fetchedData[
  //                   `${character.class.secondary.className}_${i}_EC`
  //                 ]?.equipment.map((item, k) => {
  //                   return (
  //                     <p>
  //                       <input
  //                         type="radio"
  //                         name={`equipOption${i}`}
  //                         id={item?.index}
  //                         onChange={(e) => handleChange(e, item.url)}
  //                       />
  //                       {item.name} hello
  //                     </p>
  //                   );
  //                 })}
  //               </div>
  //             );
  //           }
  //         })}
  //       </div>
  //     );
  //   }

  //   if (Object.getOwnPropertyNames(fetchedData).length === 0) {
  //     //makes the component re-render to display the fetch data after its received
  //     setStall(stall+1);
  //   }
  // }, [
  //   primaryEquip,
  //   primaryEquipOptions,
  //   secondaryEquip,
  //   secondaryEquipOptions,
  //   isHovering,
  //   fetchData
  // ]);

  return (
    <div>
      {/* <div>
        {primaryEquipDiv}
        {primaryOptionsDiv}
      </div>
      <div>
        {secondaryEquipDiv}
        {secondaryOptionsDiv}
      </div> */}
      <div>
        {fetchData?.primary_class ?
        <div>
          <p>
            <strong>Starting Equipment For {fetchData?.primary_class?.name}</strong>
          </p>
          <span>
            {fetchData.primary_class.equip.starting_equip?.map((item, i) => {

              return(
                <div key={`1${i}`}>
                  <p onMouseOver={(e) => {handleMouseOver(e, `primary_equip_${i}`)}} onMouseOut={handleMouseOut}>
                    {item.equipment.name}
                  </p>
                  {console.log(item)}
                  {/* {isHovering && hoveredKey === `primary_equip_${i}` ? 
                    <InfoCard 
                      functions={{
                        character: character,
                        event: event,
                        isHovering: isHovering,
                        spawnCount: spawnCount,
                        setSpawnCount: setSpawnCount,
                        className: hoveredKey,
                        hoveredKey: hoveredKey,
                        url: item.equipment.url,
                        parentName: parentName,
                }}/>
                 : ''}  */}
                </div>
              )
            })}
          </span>
          <span>
            <strong>Equip Choices</strong>
            {console.log(fetchData?.primary_class?.equip?.equip_options)}
            {fetchData.primary_class?.equip?.equip_options?.map((option, i) => {
              console.log(option.from.option_set_type)

              // OPTIONS ARRAY
              if(option?.from?.option_set_type === 'options_array'){

                return (
                  <>
                    <p>
                      Choose 1
                    </p>
                    {option.from.options.map((choice, j) => {
                      if(choice.option_type === 'counted_reference'){
                        return(
                          <p>
                            <input
                                type='radio'
                                name={i}
                                className='optionsArray equipChoice'
                                onChange={(e) => {handleCheck(e, choice)}}/>
                              <label htmlFor={choice?.of?.name}>{choice.count} {choice?.of?.name}</label>
                          </p>
                        )
                      }else if(choice.option_type === 'multiple'){
                        return(
                          <p>
                            {choice.items.map((item, k) => (
                              <span>
                                <input
                                  type='radio'
                                  name={i}
                                  className='optionsArray multiple'
                                  onChange={(e) => {handleCheck(e, choice)}}/>
                                <label htmlFor={i}>{item?.count} {item?.of?.name}{item?.count > 1 ? 's': ''} {k !== choice.items.length - 1 ? ' and ' :''}</label>
                              </span>
                            ))}
                          </p>
                        )
                      }else if(choice.option_type === 'choice'){
                        if(!choiceData[`choice${i}_${j}`]){
                          choiceFetch(choice?.choice?.from?.equipment_category?.url, `choice${i}_${j}`)
                        }
                        return(
                          <>
                            {choiceData[`choice${i}_${j}`]?.equipment?.map((item, k) => (
                              <p>
                                <input
                                  type='radio'
                                  name={i}
                                  className='optionsArray choice'
                                  onChange={(e) => {handleChange(e, choice)}}/>
                                <label htmlFor={i}>{item.name}</label>
                              </p>
                            ))}
                          </>
                        )
                        console.log(choice?.from)
                      }else{
                        return(
                          <p>
                            'you forgot a option type ({choice.option_type})'
                          </p>
                        )
                      }
                      
                })}
                  </>
                )
              }else if(option?.from?.options_set_type === 'equipment_category'){
                
                if(!choiceData[`choice${i}`]){
                  choiceFetch(choice?.choice?.from?.equipment_category?.url, `choice${i}`)
                }
                console.log('url', choice?.choice?.from?.equipment_category?.url)
                return(
                  <>
                  hello
                    {/* {choiceData[`choice${i}`]} */}
                  </>
                )
              }
            })}
            {/* {fetchData?.primary_class?.equip?.equip_options?.map((option, i) => {
              console.log(option)
              console.log(fetchData?.primary_class?.equip?.equip_options)
              
              const equipCat = option?.from?.option_set_type
              // OPTIONS ARRAY
              console.log(equipCat)
              // if(equipCat === 'options_array'){
                option.from.options.map((choice, j) => {
                  const optionType = choice.option_type
                  console.log('option.from.options', option.from.options)
                  // HANDLE CHECK GOES HERE USING 'CHOICE'
                  const handleRadio = (e, choice) => {
                    setFetchData(prevData => ({
                      ...prevData,
                      selected_equip:[
                        ...(prevData.selected_equip || []),
                        choice
                      ]
                    }))
                  }
                  
                    <p>
                      hello
                    </p>
                  
                  
                  // if(optionType === 'counted_reference'){
                  //   return(
                  //     <p key={`${choice.of.name}_${i}_${j}`}>
                  //       {console.log(choice)}
                  //       <input
                  //         type='checkbox'
                  //         name={choice.of.name}
                  //         className='optionsArray equipChoice'
                  //         id={`${choice.of.name}_${i}_${j}`}
                  //         onChange={(e) => {handleCheck(e, choice)}}/>
                  //       <label htmlFor={choice.of.name}>{choice.of.name}</label>
                  //     </p>
                  //   )
                  // }
                })
              // }
            })} */}
          </span>
        </div>
        : ''}
        
      </div>
    </div>
  );
}
