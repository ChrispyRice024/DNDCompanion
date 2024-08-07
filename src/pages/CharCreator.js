import react from 'react'
import {useState, useEffect} from 'react'
import {lazy} from 'react'
import Stats from '../components/Stats'
import Combat from '../components/Combat'
import Skills from '../components/Skills'
import SavingThrows from '../components/SavingThrows'
import Race from '../components/Race'
import RaceInfo from '../components/RaceInfo'
import Class from '../components/Class'
import ProInfo from '../components/ProInfo'
import Spellcasting from '../components/Spellcasting'
import Equip from '../components/Equip'
import InfoCard from '../components/InfoCard'
import ClassFeatures from '../components/ClassFeatures'
const fs = require("fs");

export default function CharCreator () {

    const [character, setCharacter] = useState({
        level:1,
        race:{
            primary:{},
            secondary:{},
            racialAbilityBonus:{}
        },
        class:{
            primary:{
                multiClassing:{},
                subClasses:{},
                combat:{
                    spellcasting:{
                        spellList:{}
                    }
                }
            },
            secondary:{
                multiClassing:{},
                subClasses:{},
                combat:{
                    spellcasting:{
                        spellList:{}
                    }
                }
            }
        },
        inventory:{
            equipment:{
                armor:{

                },
                weapons:{
                    ammunition:{
                        
                    }
                }
            },
            items:{
                tools:{

                }
            },
            spellComponents:{

            }
        },
        
        stats: {
            str:10,
            dex:10,
            con:10,
            int:10,
            wis:10,
            cha:10
        },
        mods:{
            strMod:0,
            dexMod:0,
            conMod:0,
            intMod:0,
            wisMod:0,
            chaMod:0
        },
        proficiencies:{
            bonus:2,
            racialProficiencies:{
                primary:{
                    racialProficiencies:{},
                    availableOptions:{}
                },
                secondary:{
                    racialProficiencies:{},
                    availableOptions:{}
                }
            },
            classProficiencies:{
                primary:{
                    classProficiencies:[],
                    availableOptions:[]
                },
                secondary:{
                    classProficiencies:[],
                    availableOptions:[]
                }
            }
        },
        combat: {
            size:'',
            hitDie:'',
            hp:'',
            ac:'',
            proBonus:'',
            initBonus:'',
            speed:'',
            atkPerRound:'',
            resistances:[''],
            savingThrows:{
                primaryClass:{},
                secondaryClass:{}
            }
        },
        skills: {
            'acrobatics': {
              value: 0,
              stat: 'dex',
              isProficient: false
            },
            'animal-handling': {
              value: 0,
              stat: 'wis',
              isProficient: false
            },
            'arcana': {
              value: 0,
              stat: 'int',
              isProficient: false
            },
            'athletics': {
              value: 0,
              stat: 'str',
              isProficient: false
            },
            'deception': {
              value: 0,
              stat: 'cha',
              isProficient: false
            },
            'history': {
              value: 0,
              stat: 'int',
              isProficient: false
            },
            'insight': {
              value: 0,
              stat: 'wis',
              isProficient: false
            },
            'intimidation': {
              value: 0,
              stat: 'cha',
              isProficient: false
            },
            'investigation': {
              value: 0,
              stat: 'int',
              isProficient: false
            },
            'medicine': {
              value: 0,
              stat: 'wis',
              isProficient: false
            },
            'nature': {
              value: 0,
              stat: 'int',
              isProficient: false
            },
            'perception': {
              value: 0,
              stat: 'wis',
              isProficient: false
            },
            'performance': {
              value: 0,
              stat: 'cha',
              isProficient: false
            },
            'persuassion': {
              value: 0,
              stat: 'cha',
              isProficient: false
            },
            'religion': {
              value: 0,
              stat: 'int',
              isProficient: false
            },
            'sleight-of-hand': {
              value: 0,
              stat: 'dex',
              isProficient: false
            },
            'stealth': {
              value: 0,
              stat: 'dex',
              isProficient: false
            },
            'survival': {
              value: 0,
              stat: 'wis',
              isProficient: false
            }
          },
            equipment:{
                startingEquipment:{},
                equipmentOptions:{}
            }
    })

    const [fetchData, setFetchData] = useState({
        primary_class:{
          chosen_pro_0:[],
          chosen_pro_1:[]
        },
        stats:{
            str:10,
            dex:10,
            con:10,
            int:10,
            wis:10,
            cha:10
        },
        mods:{
            str:0,
            dex:0,
            con:0,
            int:0,
            wis:0,
            cha:0
        },
        skills: {
            'acrobatics': {
              value: 0,
              stat: 'dex',
              isProficient: false
            },
            'animal-handling': {
              value: 0,
              stat: 'wis',
              isProficient: false
            },
            'arcana': {
              value: 0,
              stat: 'int',
              isProficient: false
            },
            'athletics': {
              value: 0,
              stat: 'str',
              isProficient: false
            },
            'deception': {
              value: 0,
              stat: 'cha',
              isProficient: false
            },
            'history': {
              value: 0,
              stat: 'int',
              isProficient: false
            },
            'insight': {
              value: 0,
              stat: 'wis',
              isProficient: false
            },
            'intimidation': {
              value: 0,
              stat: 'cha',
              isProficient: false
            },
            'investigation': {
              value: 0,
              stat: 'int',
              isProficient: false
            },
            'medicine': {
              value: 0,
              stat: 'wis',
              isProficient: false
            },
            'nature': {
              value: 0,
              stat: 'int',
              isProficient: false
            },
            'perception': {
              value: 0,
              stat: 'wis',
              isProficient: false
            },
            'performance': {
              value: 0,
              stat: 'cha',
              isProficient: false
            },
            'persuassion': {
              value: 0,
              stat: 'cha',
              isProficient: false
            },
            'religion': {
              value: 0,
              stat: 'int',
              isProficient: false
            },
            'sleight-of-hand': {
              value: 0,
              stat: 'dex',
              isProficient: false
            },
            'stealth': {
              value: 0,
              stat: 'dex',
              isProficient: false
            },
            'survival': {
              value: 0,
              stat: 'wis',
              isProficient: false
            }
          },
    })

    // fetches the list of races
    useEffect(() => {
      const fetchCall = async () => {
          try{
              const res = await fetch('https://www.dnd5eapi.co/api/races')
              const data = await res.json()
  
              setFetchData(prevData => ({
                  ...prevData,
                  race_list:data.results
              }))
          // console.log('been fetched')
          }catch(err){
              console.error('Error fetching data: ', err)
          }
      }
      fetchCall()
    })

    //fetches the list of classes
  useEffect(() => {
    const classList = async () => {
        try{
            const res = await fetch(`https://dnd5eapi.co/api/classes`)
            const data = await res.json()

            setFetchData(prevData => ({
                ...prevData,
                class_list:data
            }))
        }catch(err){
            console.error(err, err.message)
        }
    }
    
    classList()
  }, [])

  const handleName = (e) => {
    e.preventDefault()

    setFetchData(prevData => ({
      ...prevData,
      char_name:e.target.value
    }))

    console.log(fetchData?.char_name)
  }
    //class fetch
    const classFetchCall = async (url, targetKey) => { 
        try{
            // initial fetch
            const res = await fetch(`https://dnd5eapi.co${url}`)
            const data = await res.json()
            
            // fetch spell data for the class
            if(targetKey === 'primary_class' || targetKey === 'secondary_class'){

                // FETCH THE SPELL DATA
                let spells = {}
                if(data.spells){
                    const spellRes = await fetch(`https://dnd5eapi.co${data.spells}`)
                    const spellData = await spellRes.json()

                    for(let item of spellData.results){
                        let level = item.level
    
                        if(!spells[`level_${level}_spells`]){
                            spells[`level_${level}_spells`] = []
                        }
                        spells[`level_${level}_spells`].push(item)
                    }
                }
                
                // FETCH THE LEVEL DATA
                const levelsRes = await fetch(`https://www.dnd5eapi.co${data.class_levels}`)
                const levelsData = await levelsRes.json()

                const equipRes = await fetch(`https://www.dnd5eapi.co${url}/starting-equipment`)
                const equipData = await equipRes.json()

                let features = []

                for(let item of levelsData[0]?.features){
                    const featureRes = await fetch(`https://www.dnd5eapi.co${item.url}`)
                    const featureData = await featureRes.json()
                    features.push(featureData)
                }

                setFetchData(prevData => ({
                    ...prevData,
                    [targetKey]:{
                        index:data.index,
                        name:data.name,
                        levels:data.class_levels,
                        hit_die:data.hit_die,
                        multi_classing:data.multi_classing,
                        features:features,
                        equip:{
                            starting_equip:data.starting_equipment,
                            equip_options:data.starting_equipment_options
                        },
                        proficiencies:{
                            starting_proficiencies:data.proficiencies,
                            proficiency_choices:data.proficiency_choices
                        },
                        saving_throws:data.saving_throws,
                        spellcasting:data.spellcasting,
                        spells:spells,
                        level_data:levelsData,
                        url:data.url,
                        spells_url:data.spells
                    }
                }))
            }
        }catch(err){
            console.error(err)
        }
    }

    const raceFetch = async (url) => {
        try{
            console.log('url raceFetch', url)
            const res = await fetch(`https://www.dnd5eapi.co${url}`)
            const data = await res.json()

            setFetchData(prevData => ({
                ...prevData,
                race:data
            }))
            
            console.log(fetchData)
        }catch(err){
            console.error(err)
        }
    }

    const logs = (e) => {
        e.preventDefault()
        console.log('fetchData', fetchData)
    }

    const [div, setDiv] = useState(
      <div>
        <button onClick={(e) => {handleNewChar(e, 'class/race')}}>Create Character</button>
      </div>
    )

    
    const handleNewChar = (e, newDiv) => {
      e.preventDefault()
      // setCount(prevCount => prevCount + 1)

      if(newDiv === 'class/race'){
        setFetchData(prevData => ({
          ...prevData,
          isCreatingNewChar:'class/race'
        }))
      }else if(newDiv === 'spellcasting' && fetchData?.primary_class?.spellcasting){

        setFetchData(prevData => ({
          ...prevData,
          isCreatingNewChar:'spellcasting'
        }))
      }else if((newDiv === 'spellcasting' && !fetchData?.primary_class?.spellcasting) || (newDiv === 'equip')){

        setFetchData(prevData => ({
          ...prevData,
          isCreatingNewChar:'equip'
        }))
      }else if(newDiv === 'stats'){
        setFetchData(prevData => ({
          ...prevData,
          isCreatingNewChar:'stats'
        }))
      }else if(newDiv === 'name'){
        setFetchData(prevData => ({
          ...prevData,
          isCreatingNewChar:'name'
        }))
      }
      
    }

    const handleSubmit = (e) => {
      e.preventDefault()

      // const saveFile = () => {
        fs.readFile('./save.json', 'utf8', (err, data) => {

          if(err){
            console.error(err)
          }else if(data === '' || data.length === 0){
            const charArray = [fetchData]
            const charArrayString = JSON.stringify(charArray)

            fs.appendFile('save.json', charArrayString, (err) => {
              if(err){
                console.error(err)
              }else{
                console.log('success. array empty on initilization')
              }
            })
          }else{
            const jsonData = JSON.parse(data)
            jsonData.push(fetchData)

            const stringData = JSON.stringify(jsonData)

            fs.writeFile('./save.json', stringData, (err) => {
              if(err){
                console.error(err)
              }else{
                console.log('success. array not empty on initilization')
              }
            })
          }
        })
        // window.location.reload()
      // }
      // saveFile()
    }



    return(
        <div id='outerParent'>
          <div>

            {!(fetchData?.isCreatingNewChar) ? 
              <button onClick={(e) => {handleNewChar(e, 'class/race')}}>Create Character</button>    
            :''}
        
      </div>
            <form>
              {/* {div} */}
              {fetchData?.isCreatingNewChar === 'class/race' ? 
              
                  <div>
                    <div id='race_class'>
                        <div id='race'>
                          <Race functions={{setFetchData:setFetchData,
                                          raceFetch: raceFetch,
                                          fetchData:fetchData}} />
                        </div>
                        <div>
                          <div id='class'>
                            <Class functions={{fetchData:fetchData,
                                            setFetchData:setFetchData,
                                            classFetchCall:classFetchCall}} />
                          
                          
                          <div id='classFeatures' style={{display:fetchData?.primary_class?.name ? '' : 'none'}}>
                            <ClassFeatures functions={{fetchData,
                                                        setFetchData}}/>
                          </div>
        
                          <div id='proInfo' style={{display:fetchData?.primary_class?.name ? '' : 'none'}}>
                              <ProInfo functions={{character: character,
                                                  setCharacter: setCharacter,
                                                  fetchData:fetchData,
                                                  setFetchData:setFetchData}} />
                          </div>
                          </div>
                          
                        </div>
                        
                    </div>
                  <button onClick={(e) => {handleNewChar(e, 'spellcasting')}}>Next</button>
                </div>

              : fetchData?.isCreatingNewChar === 'spellcasting' ?


                <div>
                    <div id='spellcasting'>
                      <Spellcasting functions={{character: character,
                                              setCharacter: setCharacter,
                                              fetchData:fetchData,
                                              setFetchData:setFetchData}} />
                    </div>
                  <button onClick={(e) => {handleNewChar(e, 'equip')}}>Next</button>
                </div>
            : fetchData?.isCreatingNewChar === 'equip' ?
            <div id='equip'>
              <Equip functions={{character: character,
                                setCharacter: setCharacter,
                                fetchData:fetchData,
                                setFetchData:setFetchData}} />
              <button onClick={(e) => {handleNewChar(e, 'stats')}}>Next</button>
            </div>
            : fetchData?.isCreatingNewChar === 'stats' ? 


            <div id='statsAndSuch'>
              <div id='stats'>
                  <Stats functions={{setCharacter: setCharacter,
                                  character:character,
                                  fetchData:fetchData,
                                  setFetchData:setFetchData}} />
              </div>

              <div id='savingThrows'>
                  <SavingThrows functions= {{fetchData:fetchData,
                                              character: character
                  }}/>
              </div>

              <div id='combat'>
                  <Combat functions={{setCharacter: setCharacter,
                                      character:character,
                                      fetchData:fetchData,
                                      setFetchData:setFetchData}} />
              </div>

              <div id='skills'>
                  <Skills functions={{character:character,
                                      setCharacter: setCharacter,
                                      fetchData:fetchData,
                                      setFetchData:setFetchData}}/>
                <button onClick={(e) => {handleNewChar(e, 'name')}}>Finish and Name</button>
              </div>
            
            </div>
          : fetchData?.isCreatingNewChar === 'name' ?
            <div id='name'>
              <p>
              </p>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                onChange={handleName}/>
              <p>
                <button onClick={handleSubmit}>Finish Character</button>
              </p>
            </div>
          :''}
                <p>
                    {/* <input type='submit' onClick/> */}
                    <button onClick={logs}>fetchData</button>
                </p>
            </form>
        </div>
    )
}