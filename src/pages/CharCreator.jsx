import react from 'react'
import {useState, useEffect} from 'react'
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
                // console.log('classFeatures', classFeatures)
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
        }catch(err){
            console.error(err)
        }
    }

    const logs = (e) => {
        e.preventDefault()
        console.log('fetchData', fetchData)
    }

    return(
        <div id='outerParent'>
            <form>
                <div id='name'>
                  <p>
                    <label htmlFor='charName'>Character Name</label>
                    <input name='charName' id='charName' className='race'placeholder='Character Name' />
                  </p>
                </div>
                <div id='race'>
                    <Race functions={{raceFetch: raceFetch,
                                    fetchData:fetchData}} />
                </div>
                {fetchData?.race?.name?
                  <div id='raceInfo'>
                    <RaceInfo functions={{setCharacter: setCharacter,
                                        character:character,
                                        fetchData:fetchData,
                                        setFetchData:setFetchData}} />
                  </div>
                :''}
                

                <div id='class'>
                    <Class functions={{
                                        
                                        fetchData:fetchData,
                                        setFetchData:setFetchData,
                                        classFetchCall:classFetchCall}} />
                </div>
                {fetchData?.primary_class?.name ? 
                <div>
                  <div id='classFeatures'>
                    <ClassFeatures functions={{fetchData,
                                                setFetchData}}/>
                  </div>

                  <div id='proInfo'>
                      <ProInfo functions={{character: character,
                                          setCharacter: setCharacter,
                                          fetchData:fetchData,
                                          setFetchData:setFetchData}} />
                  </div>
  
                  {fetchData.primary_class || fetchData.secondary_class ? 
                      <div id='spellcasting'>
                          <Spellcasting functions={{character: character,
                                                  setCharacter: setCharacter,
                                                  fetchData:fetchData,
                                                  setFetchData:setFetchData}} />
                      </div>
                  :''} 


                  <div id='equip'>
                      <Equip functions={{character: character,
                                      setCharacter: setCharacter,
                                      fetchData:fetchData,
                                      setFetchData:setFetchData}} />
                  </div>
                </div>
                :''}
                
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
                  </div>
                </div>
                
                
                <p>
                    {/* <input type='submit' onClick/> */}
                    <button onClick={logs}>fetchData</button>
                </p>
            </form>
        </div>
    )
}