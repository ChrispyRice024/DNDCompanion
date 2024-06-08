import react from 'react'
import {useState, useEffect} from 'react'
import {debounce} from 'lodash' 

export default function Stats({functions}) {
    const {setCharacter, character} = functions

    const [infoDiv, setInfoDiv] = useState()

    const findMod = (stat) => {
        return Math.ceil((stat - 10) / 2);
    }

    const handleChange = (e) => {
        const statValue = parseInt(e.target.value, 10);

        const proficiency = () => {
            if(character?.race?.racialAbilityBonus[e.target.name].isProficient){
                console.log('hello')
                console.log(character?.race?.racialAbilityBonus[e.target.name].isProficient)
            }else{
                console.log('goodbye')
            }
        }
        const modValue = Math.ceil(((statValue) - 10) / 2);
    
        setCharacter(prevCharacter => ({
            ...prevCharacter,
            stats: {
                ...prevCharacter.stats,
                [e.target.name]: statValue
            },
            mods: {
                ...prevCharacter.mods,
                [`${e.target.name}Mod`]: modValue
            },
        }))

    };
    
    
    const decideBonus = (e) => {
        const proChoicePrimary = character?.race?.primary?.ability_bonuses
        
        for(let i=0; i < proChoicePrimary.length; i++){
            
            const primaryChoice = proChoicePrimary[i].ability_score.index

            if(e.target.name === primaryChoice){
                return 'hidden'
            }
            
        }
    }

    // const handleProChange = (e) => {
    //     setCharacter(prevCharacter => ({
    //         ...prevCharacter,
    //         proficiencies:{
    //             ...prevCharacter.proficiencies,
    //             [e.target.name]: e.target.checked
    //         }
    //     })) 
    // }


    useEffect(() => {
            const updatedSkills = {...character.skills}

            for(const skillName in updatedSkills){
                const skill = updatedSkills[skillName]
                const statMod = character.mods[`${skill.stat}Mod`]
                // const isPro = character.proficiencies[`${skill.stat}Pro`]
                const proficiencyBonus =  0

                updatedSkills[skillName] = {
                    ...skill,
                    value:statMod + proficiencyBonus
                }
            }
            setCharacter(prevCharacter => ({
                ...prevCharacter,
                skills: updatedSkills
            }))
    }, [character?.stats, character?.mods, character?.proficiencies])

      const handleMouseOver = (e) => {
        const race = e.target.getAttribute('data-race')
        if(e.target.value !== '0'){
            setInfoDiv(
                <div id='infoDiv'>
                    <p>
                        {e.target.name.toUpperCase()}
                    </p>
                    <p>
                        {race}
                    </p>
                </div>
            )    
        }else{
            setInfoDiv()
        }
            
      }

      const handleMouseOut = (e) => {
        setInfoDiv()
      }

    return(
        <div>
            
                <h2>Stats</h2>

            <p className="str">
                <label className="str" htmlFor="str">STR</label>
                <input name="str" id="str" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input name='str' id='str' type='number' className='stat' value={character?.race?.racialAbilityBonus?.str?.bonus} data-race={character?.race?.racialAbilityBonus?.str?.race} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
                <input name='strTotal' id='strTotal' type='number' readonly value={character?.stats?.str + character?.race?.racialAbilityBonus?.str?.bonus} />
                <input name='strMod' className='charBonus' type='number' value={character?.mods?.strMod} readOnly />
                <span>
                    {/* if this is in the req add tag */}
                    {/* {console.log('prereq', character?.class?.secondary?.multiClassing?.prerequisites)} */}
                    {/* {console.log('index', character?.class?.secondary?.multiClassing?.prerequisites[0]?.ability_score)} */}
                    {character?.class?.secondary?.multiClassing?.prerequisites ? character?.class?.secondary?.multiClassing?.prerequisites.map((prereq, i) => {
                        // console.log(prereq)
                        if(prereq.ability_score.index === 'str'){
                            return(
                                <span>
                                    *{character.class.secondary.className} Requires {prereq.minimum_score} STR for Multiclass
                                </span>
                            )
                        }
                    }) : ''}
                </span>
                {infoDiv}
            </p>

            <p className="dex">
                <label className="dex" htmlFor="dex">DEX</label>
                <input name="dex" id="dex" type="number" defaultValue="10" className="stat"  onInput={handleChange} />
                <input name='dex' readonly id='dex' type='number' className='stat' value={character?.race?.racialAbilityBonus?.dex?.bonus} data-race={character?.race?.racialAbilityBonus?.dex?.race} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
                <input  readOnly id='dexMod' value={character?.mods?.dexMod} className="mod dex" />
                <span>
                    {/* if this is in the req add tag */}
                    {/* {console.log('prereq', character?.class?.secondary?.multiClassing?.prerequisites)} */}
                    {/* {console.log('index', character?.class?.secondary?.multiClassing?.prerequisites[0]?.ability_score)} */}
                    {character?.class?.secondary?.multiClassing?.prerequisites ? character?.class?.secondary?.multiClassing?.prerequisites.map((prereq, i) => {
                        // console.log(prereq)
                        if(prereq.ability_score.index === 'dex'){
                            return(
                                <span>
                                    *{character.class.secondary.className} Requires {prereq.minimum_score} DEX for Multiclass
                                </span>
                            )
                        }
                    }) : ''}
                </span>
            </p>

            <p className="con">
                <label className="con" htmlFor="con">CON</label>
                <input name="con" id="con" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input name='con' readonly id='con' type='number' className='stat' value={character?.race?.racialAbilityBonus?.con?.bonus} data-race={character?.race?.racialAbilityBonus?.con?.race} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
                <input id="conMod"  readOnly value={character?.mods?.conMod} className="mod con"/>
                <span>
                    {/* if this is in the req add tag */}
                    {/* {console.log('prereq', character?.class?.secondary?.multiClassing?.prerequisites)} */}
                    {/* {console.log('index', character?.class?.secondary?.multiClassing?.prerequisites[0]?.ability_score)} */}
                    {character?.class?.secondary?.multiClassing?.prerequisites ? character?.class?.secondary?.multiClassing?.prerequisites.map((prereq, i) => {
                        // console.log(prereq)
                        if(prereq.ability_score.index === 'con'){
                            return(
                                <span>
                                    *{character.class.secondary.className} Requires {prereq.minimum_score} Con for Multiclass
                                </span>
                            )
                        }
                    }) : ''}
                </span>
            </p>

            <p className="int">
                <label className="int" htmlFor="int">INT</label>
                <input name="int" id="int" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input name='int' readonly id='int' type='number' className='stat' value={character?.race?.racialAbilityBonus?.int?.bonus} data-race={character?.race?.racialAbilityBonus?.int?.race} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
                <input id="intMod" readOnly className="mod int" value={character?.mods?.intMod} />
                <span>
                    {/* if this is in the req add tag */}
                    {/* {console.log('prereq', character?.class?.secondary?.multiClassing?.prerequisites)} */}
                    {/* {console.log('index', character?.class?.secondary?.multiClassing?.prerequisites[0]?.ability_score)} */}
                    {character?.class?.secondary?.multiClassing?.prerequisites ? character?.class?.secondary?.multiClassing?.prerequisites.map((prereq, i) => {
                        console.log(prereq)
                        if(prereq.ability_score.index === 'int'){
                            return(
                                <span>
                                    *{character.class.secondary.className} Requires {prereq.minimum_score} INT for Multiclass
                                </span>
                            )
                        }
                    }) : ''}
                </span>
            </p>

            <p className="wis">
                <label className="wis" htmlFor="wis">WIS</label>
                <input type="number" id="wis" className="stat" name="wis" defaultValue="10" onChange={handleChange} />
                <input name='wis' readonly id='wis' type='number' className='stat' value={character?.race?.racialAbilityBonus?.wis?.bonus} data-race={character?.race?.racialAbilityBonus?.wis?.race} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
                <input  readOnly id="wisMod" value={character?.mods?.wisMod} className="mod wis"/>
                <span>
                    {/* if this is in the req add tag */}
                    {/* {console.log('prereq', character?.class?.secondary?.multiClassing?.prerequisites)} */}
                    {/* {console.log('index', character?.class?.secondary?.multiClassing?.prerequisites[0]?.ability_score)} */}
                    {character?.class?.secondary?.multiClassing?.prerequisites ? character?.class?.secondary?.multiClassing?.prerequisites.map((prereq, i) => {
                        console.log(prereq)
                        if(prereq.ability_score.index === 'wis'){
                            return(
                                <span>
                                    *{character.class.secondary.className} Requires {prereq.minimum_score} WIS for Multiclass
                                </span>
                            )
                        }
                    }) : ''}
                </span>
            </p>

            <p className="cha">
                <label className="cha" htmlFor="cha">CHA</label>
                <input name="cha" id="cha" type="number" className="stat" defaultValue="10" onChange={handleChange}/>
                <input name='cha' readonly id='cha' type='number' className='stat' value={character?.race?.racialAbilityBonus?.cha?.bonus} data-race={character?.race?.racialAbilityBonus?.cha?.race} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
                <input  id="chaMod" readOnly value={character?.mods?.chaMod} className="mod cha"/>
                <span>
                    {/* if this is in the req add tag */}
                    {/* {console.log('prereq', character?.class?.secondary?.multiClassing?.prerequisites)} */}
                    {/* {console.log('index', character?.class?.secondary?.multiClassing?.prerequisites[0]?.ability_score)} */}
                    {character?.class?.secondary?.multiClassing?.prerequisites ? character?.class?.secondary?.multiClassing?.prerequisites.map((prereq, i) => {
                        // console.log(prereq)
                        if(prereq.ability_score.index === 'cha'){
                            return(
                                <span>
                                    *{character.class.secondary.className} Requires {prereq.minimum_score} CHA for Multiclass
                                </span>
                            )
                        }
                    }) : ''}
                </span>
            </p>
        </div>
    )
}