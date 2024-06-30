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

    const [fetchData, setFetchData] = useState({})

    

    const [classFeatures, setClassFeatures] = useState()

    // useEffect(() => {
    //     console.log('spells', spells)
    //     console.log(fetchData)
    //     console.log(classFeatures)
    // }, [spells, fetchData, classFeatures])

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
                // const classFeatures =  levelsData[0]?.features.map(async url => {
                //     const featureRes = await fetch(`https://www.dnd5eapi.co${url.url}`)
                //     const featureData = await featureRes.json()
                    
                //     features.push(featureData)
                // })

                for(let item of levelsData[0]?.features){
                    const featureRes = await fetch(`https://www.dnd5eapi.co${item.url}`)
                    const featureData = await featureRes.json()
                    features.push(featureData)
                }
                console.log('classFeatures', classFeatures)
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

    const raceFetch = async (url, targetKey) => {
        try{
            console.log('url raceFetch', url)
            const res = await fetch(`https://www.dnd5eapi.co${url}`)
            const data = await res.json()
            console.log('raceData', data)

            setFetchData(prevData => ({
                ...prevData,
                [targetKey]:data
            }))
            console.log(fetchData)
        }catch(err){
            console.error(err)
        }
    }

    const highestAbilityBonus = (character) => {
        const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha']
        const highestBonuses = {}
        
        const primaryBonus = character?.race?.primary?.ability_bonuses
        const secondaryBonus = character?.race?.secondary?.ability_bonuses

        abilities.forEach(ability => {
            let highestBonus = 0
            let raceName

            if(primaryBonus){
                primaryBonus.forEach(bonus => {
                    if(bonus.ability_score.index === ability && bonus.bonus > highestBonus){
                        highestBonus = bonus.bonus
                        raceName = character?.race?.primary?.name
                    }
                })
            }

            if(secondaryBonus) {
                secondaryBonus.forEach(bonus => {
                    if(bonus.ability_score.index === ability && bonus.bonus > highestBonus){
                        highestBonus = bonus.bonus
                        raceName = character?.race?.secondary?.name
                    }
                })
            }
        highestBonuses[ability] = {
            bonus: highestBonus,
            race: raceName
        }

        })
        setCharacter(prevCharacter => ({
            ...prevCharacter,
            race:{
                ...prevCharacter.race,
                racialAbilityBonus: highestBonuses
            }
        }))

    }

useEffect(() => {
   highestAbilityBonus(character)
}, [character?.race?.primary, character?.race?.secondary])

    return(
        <div>
            <form>
                <div>
                    <Race functions={{raceFetch: raceFetch,
                                    fetchData:fetchData}} />
                </div>
                
                <div>
                    <RaceInfo functions={{setCharacter: setCharacter,
                                        character:character,
                                        fetchData:fetchData,
                                        setFetchData:setFetchData}} />
                </div>

                <div>
                    <Class functions={{
                                        
                                        fetchData:fetchData,
                                        setFetchData:setFetchData,
                                        classFetchCall:classFetchCall}} />
                </div>

                <div>
                    <ClassFeatures functions={{fetchData,
                                                setFetchData}}/>
                </div>

                <div>
                    <ProInfo functions={{character: character,
                                        setCharacter: setCharacter,
                                        fetchData:fetchData,
                                        setFetchData:setFetchData}} />
                </div>
 
                {fetchData.primary_class || fetchData.secondary_class ? 
                    <div>
                        <Spellcasting functions={{character: character,
                                                setCharacter: setCharacter,
                                                fetchData:fetchData,
                                                setFetchData:setFetchData}} />
                    </div>
                 :''} 


                <div>
                    <Equip functions={{character: character,
                                    setCharacter: setCharacter,
                                    fetchData:fetchData,
                                    setFetchData:setFetchData}} />
                </div>

                <div>
                    <Stats functions={{setCharacter: setCharacter,
                                    character:character,
                                    fetchData:fetchData,
                                    setFetchData:setFetchData}} />
                </div>

                <div>
                    {/* <SavingThrows functions= {{sendSavingThrow: getSavingThrow, mods: mods}}/> */}
                </div>

                <div>
                    <Combat functions={{setCharacter: setCharacter,
                                        character:character,
                                        fetchData:fetchData,
                                        setFetchData:setFetchData}} />
                </div>

                <div>
                    <Skills functions={{character:character,
                                        setCharacter: setCharacter,
                                        fetchData:fetchData,
                                        setFetchData:setFetchData}}/>
                </div>
                
                <p>
                    {/* <input type='submit' onClick/> */}
                </p>
            </form>
        </div>
    )
}