import react from 'react'
import {useState, useEffect} from 'react'
import Stats from '../components/Stats'
import Combat from '../components/Combat'
import Skills from '../components/Skills'
import SavingThrows from '../components/SavingThrows'
import Race from '../components/Race'

export default function CharCreator () {

    // const seedData = {
    //     'hit_die': 8,
    //     proficencyChoices: [
    //         {
    //             "desc": "Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival",
    //             "choose": 2,
    //             "type": "proficiencies",
    //             "from": {
    //                 "option_set_type": "options_array",
    //                 "options": [
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-arcana",
    //                             "name": "Skill: Arcana",
    //                             "url": "/api/proficiencies/skill-arcana"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-animal-handling",
    //                             "name": "Skill: Animal Handling",
    //                             "url": "/api/proficiencies/skill-animal-handling"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-insight",
    //                             "name": "Skill: Insight",
    //                             "url": "/api/proficiencies/skill-insight"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-medicine",
    //                             "name": "Skill: Medicine",
    //                             "url": "/api/proficiencies/skill-medicine"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-nature",
    //                             "name": "Skill: Nature",
    //                             "url": "/api/proficiencies/skill-nature"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-perception",
    //                             "name": "Skill: Perception",
    //                             "url": "/api/proficiencies/skill-perception"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-religion",
    //                             "name": "Skill: Religion",
    //                             "url": "/api/proficiencies/skill-religion"
    //                         }
    //                     },
    //                     {
    //                         "option_type": "reference",
    //                         "item": {
    //                             "index": "skill-survival",
    //                             "name": "Skill: Survival",
    //                             "url": "/api/proficiencies/skill-survival"
    //                         }
    //                     }
    //                 ]
    //             }
    //         }
    //     ]
    // }

    const proBonus = 3

    const [character, setCharacter] = useState({
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
            strPro:false,
            dexPro:false,
            conPro:false,
            intPro:false,
            wisPro:false,
            chaPro:false
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
            resistances:['']
        },
        skills:{
            acrobatics:{value:0, stat:'dex'},
            animalHandling:{value:0, stat:'wis'},
            arcana:{value:0, stat:'int'},
            athletics:{value:0, stat:'str'},
            deception:{value:0, stat:'cha'},
            history:{value:0, stat:'int'},
            insight:{value:0, stat:'wis'},
            intimidation:{value:0, stat:'cha'},
            investigation:{value:0, stat:'int'},
            medicine:{value:0, stat:'wis'},
            nature:{value:0, stat:'int'},
            perception:{value:0, stat:'wis'},
            performance:{value:0, stat:'cha'},
            persuassion:{value:0, stat:'cha'},
            religion:{value:0, stat:'int'},
            sleightOfHand:{value:0, stat:'dex'},
            stealth:{value:0, stat:'dex'},
            survival:{value:0, stat:'wis'}
            },
        misc:{
            primaryClass:'',
            secondaryClass:'',
            primaryRace:'',
            secondaryRace:'',
            characterName:''
        }
        })
    const getCharacter = (data) => {
        setCharacter(data)
    }

    return(
        <div>
            <form>
                <div>
                    <Race functions={{setCharacter: setCharacter, character:character, proBonus}} />
                </div>

                <div>
                    <Stats functions={{setCharacter: setCharacter, sendCharacter: getCharacter, proBonus: proBonus, character:character}} />
                </div>

                <div>
                    <Combat functions={{setCharacter: setCharacter, character:character, proBonus: proBonus, sendCharacter: getCharacter}} />
                </div>

                <div>
                    <Skills functions={{character:character}}/>
                </div>
                <div>
                    {/* <SavingThrows functions= {{sendSavingThrow: getSavingThrow, mods: mods}}/> */}
                </div>
            </form>
        </div>
    )
}