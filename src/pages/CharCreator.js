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
import Api from '../components/Api'

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
            race_list:[],
            class_list:[],
            race:{
                primary:{
                    index:'',
                    name:'',
                    age:'',
                    alignment:'',
                    language:{
                        language_desc:'',
                        languages:[]
                    },
                    size:{
                        size:'',
                        size_description:''
                    },
                    speed:'',
                    starting_proficiencies:[],
                    subraces:[],
                    traits:[],
                    url:''
                },
                secondary:{
                    index:'',
                    name:'',
                    age:'',
                    alignment:'',
                    language:{
                        language_desc:'',
                        languages:[]
                    },
                    size:{
                        size:'',
                        size_description:''
                    },
                    speed:'',
                    starting_proficiencies:[],
                    subraces:[],
                    traits:[],
                    url:''
                }
            },
            class:{
                primary:{
                    name:'',
                    index:'',
                    url:'',
                    spellcasting:{
                        description:[],
                        ability:{},
                        spell_list:{}
                    },
                    equipment:{
                        starting_equipment:{
                            primary:[],
                            secondary:[]
                        },
                        starting_equipment_options:{
                            primary:[],
                            secondary:[]
                        }
                    },
                    proficiencies:{
                        skills:{
                            given:[],
                            options:[],
                            chosen:[]
                        },
                        weapons_armor:{
                            given:[],
                            options:[],
                            chosen:[]
                        }
                    }
                },
                secondary:{
                    name:'',
                    index:'',
                    url:'',
                    spellcasting:{
                        description:[],
                        ability:{},
                        spell_list:{}
                    },
                    equipment:{
                        starting_equipment:{
                            primary:[],
                            secondary:[]
                        },
                        starting_equipment_options:{
                            primary:[],
                            secondary:[]
                        }
                    },
                    proficiencies:{
                        skills:{
                            given:[],
                            options:[],
                            chosen:[]
                        },
                        weapons_armor:{
                            given:[],
                            options:[],
                            chosen:[]
                        }
                    }
                }
            }
        })
    const getCharacter = (data) => {
        setCharacter(data)
    }
    const [classUrl, setClassUrl] = useState({
        primary:'',
        secondary:''
    })

    const [primaryClassUrl, setPrimaryClassUrl] = useState('')

    const [primaryClassProficiencies, setPrimaryClassProficiencies] = useState([])
    const [secondaryClassProficiencies, setSecondaryClassProficiencies] = useState([]) 
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
            <p>
            <Api functions={{fetchData:fetchData,
                            setFetchData:setFetchData,
                            primaryClassUrl:primaryClassUrl}}/>
            </p>
            <form>
                <div>
                    <Race functions={{setCharacter: setCharacter,
                                    character:character,
                                    fetchData:fetchData}} />
                </div>
                
                <div>
                    <RaceInfo functions={{setCharacter: setCharacter,
                                        character:character,
                                        fetchData:fetchData,
                                        setFetchData:setFetchData}} />
                </div>

                <div>
                    <Class functions={{character:character,
                                        setCharacter: setCharacter,
                                        fetchData:fetchData,
                                        setFetchData:setFetchData,
                                        primaryClassProficiencies: primaryClassProficiencies,
                                        setPrimaryClassProficiencies: setPrimaryClassProficiencies,
                                        secondaryClassProficiencies:secondaryClassProficiencies,
                                        setSecondaryClassProficiencies:setSecondaryClassProficiencies,
                                        setPrimaryClassUrl:setPrimaryClassUrl}} />
                </div>

                <div>
                    <ProInfo functions={{character: character,
                                        setCharacter: setCharacter,
                                        fetchData:fetchData,
                                        setFetchData:setFetchData}} />
                </div>

                <div>
                    <Spellcasting functions={{character: character,
                                            setCharacter: setCharacter,
                                            fetchData:fetchData,
                                            setFetchData:setFetchData}} />
                </div>

                <div>
                    <Equip functions={{character: character,
                                    setCharacter: setCharacter,
                                    fetchData:fetchData,
                                    setFetchData:setFetchData}} />
                </div>

                <div>
                    <Stats functions={{setCharacter: setCharacter,
                                    sendCharacter: getCharacter,
                                    character:character,
                                    fetchData:fetchData,
                                    setFetchData:setFetchData}} />
                </div>

                <div>
                    <Combat functions={{setCharacter: setCharacter,
                                        character:character,
                                        sendCharacter: getCharacter,
                                        fetchData:fetchData,
                                        setFetchData:setFetchData}} />
                </div>

                <div>
                    <Skills functions={{character:character,
                                        setCharacter: setCharacter,
                                        fetchData:fetchData,
                                        setFetchData:setFetchData}}/>
                </div>
                <div>
                    {/* <SavingThrows functions= {{sendSavingThrow: getSavingThrow, mods: mods}}/> */}
                </div>
                <p>
                    <input type='submit' onClick/>
                </p>
            </form>
        </div>
    )
}