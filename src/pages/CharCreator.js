import react from 'react'
import {useState, useEffect} from 'react'
import Stats from '../components/Stats'
import Combat from '../components/Combat'
import Skills from '../components/Skills'
import SavingThrows from '../components/SavingThrows'
import Race from '../components/Race'
import RaceInfo from '../components/RaceInfo'

export default function CharCreator () {

    const [proBonus, setProBonus] = useState('')

    // const decideBonus = () => {
    //     const primaryBonus = character?.misc?.primaryRace?.
    // }


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
            primaryClass:{},
            secondaryClass:{},
            primaryRace:{},
            secondaryRace:{},
            characterName:{},
            racialAbilityBonus:{}
        }
        })
    const getCharacter = (data) => {
        setCharacter(data)
    }
    // const abilityBonus = () => {
        // const primaryRace = character?.misc?.primaryRace?.ability_bonuses
        //for the bonus appllied to the ability. replace primaryRace with secondaryRace to get the secondaryRace 
        // const secondaryRace = character?.misc?.primaryRace?.ability_bonuses[i].bonus

        // for(let i= 0; 1 < primaryRace.length; i++){
        //     for(let i=0; i< secondaryRace.length; i++){
        //         if(primaryRace[i].index === secondaryRace[i].index){
        //             math.max
        //         }
        //     }
        // }
        // console.log(Math.max(...primaryRace, ...secondaryRace))
// console.log(primaryRace)

// }


const highestAbilityBonus = (character) => {
    const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha']
    const highestBonuses = {}
    
    const primaryBonus = character?.misc?.primaryRace?.ability_bonuses
    const secondaryBonus = character?.misc?.secondaryRace?.ability_bonuses

    abilities.forEach(ability => {
        let highestBonus = 0

        if(primaryBonus){
            primaryBonus.forEach(bonus => {
                if(bonus.ability_score.index === ability && bonus.bonus > highestBonus){
                    highestBonus = bonus.bonus
                }
                console.log('bonus', highestBonus)
            })
        }

        if(secondaryBonus) {
            secondaryBonus.forEach(bonus => {
                if(bonus.ability_score.index === ability && bonus.bonus > highestBonus){
                    highestBonus = bonus.bonus
                }
            })
        }
    highestBonuses[ability] = highestBonus
    console.log('highestBonuses', highestBonuses)
    console.log(primaryBonus?.[0]?.bonus)
    })
    setCharacter(prevCharacter => ({
        ...prevCharacter,
        misc:{
            ...prevCharacter.misc,
            racialAbilityBonus: highestBonuses
        }
    }))

}

useEffect(() => {
   highestAbilityBonus(character)
}, [character?.misc?.primaryRace, character?.misc?.secondaryRace])

console.log(character)
    return(
        <div>
            <form>
                <div>
                    <Race functions={{setCharacter: setCharacter, character:character, proBonus}} />
                </div>
                
                <div>
                    <RaceInfo functions={{setCharacter: setCharacter, character:character}} />
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