import React from 'react'
import { useState, useEffect } from 'react'


export default function LevelUp ({functions}) {

    const {char, setIsLevelingUp} = functions

    const [hitDieRoll, setHitDieRoll] = useState(0)

    // WORKING ON HP INCREASE

    // const rollHitDie = () => {
    //     const hitDie = char.primary_class.hit_die

    //     const reRoll = () => {
    //         const rollDie = Math.floor(Math.random() * (hitDie - 1))
    //         return rollDie
    //     }
    //     reRoll()
        
    //     if(reRoll === 0 || reRoll > hitDie){
    //         reRoll()
    //     }else{
    //         setHitDieRoll(reRoll)
    //     }
    //     console.log(hitDie, reRoll)
    //     setHitDieRoll()
    // }

    const multiCastSpellSlotsTable = {
        level_1: {
            lvl_1: 2,
            lvl_2: 0,
            lvl_3: 0,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_2: {
            lvl_1: 3,
            lvl_2: 0,
            lvl_3: 0,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_3: {
            lvl_1: 4,
            lvl_2: 2,
            lvl_3: 0,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_4: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 0,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_5: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 2,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_6: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 0,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_7: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 1,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_8: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 2,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_9: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 1,
            lvl_5: 0,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_10: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 0,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_11: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_12: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 0,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_13: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_14: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 0,
            lvl_9: 0,
        },
        level_15: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 1,
            lvl_9: 0,
        },
        level_16: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 1,
            lvl_9: 0,
        },
        level_17: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 2,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 1,
            lvl_9: 1,
        },
        level_18: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 3,
            lvl_6: 1,
            lvl_7: 1,
            lvl_8: 1,
            lvl_9: 1,
        },
        level_19: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 3,
            lvl_6: 2,
            lvl_7: 1,
            lvl_8: 1,
            lvl_9: 1,
        },
        level_20: {
            lvl_1: 4,
            lvl_2: 3,
            lvl_3: 3,
            lvl_4: 3,
            lvl_5: 3,
            lvl_6: 2,
            lvl_7: 2,
            lvl_8: 1,
            lvl_9: 1,
        }

    }

    const addClass = () => {

    }
    console.log(char)

    return(
        <div>
            <div>
                <strong>Roll Your Hit-Die or Use the Built-in Roller</strong>
                {/* <button onClick={rollHitDie}>Roll Die</button> */}
            </div>
        </div>
    )
}