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
            <p className='str'>
                <label className='str' htmlFor='str-input'>STR</label>
                <input
                    name='str'
                    id='str-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                    {/* CHANGE TO A NUMBER NOT AN INPUT */}
                <input
                    name='strBonus'
                    id='str-bonus-input'
                    type='number'
                    className='stat'
                    value={character?.race?.racialAbilityBonus?.str?.bonus || 0}
                    data-race={character?.race?.racialAbilityBonus?.str?.race || ''}
                    readOnly
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    />

                <input
                    name='strTotal'
                    id='str-total-input'
                    type='number'
                    readOnly
                    value={((character?.stats?.str ?? 0) + (character?.race?.racialAbilityBonus?.str?.bonus ?? 0)).toString()}
                    />

                <span>
                    {character?.class.secondary?.multiClassing?.prerequisites
                        ? character.class.secondary.multiClassing.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'str'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} STR for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

            <p className='dex'>
                <label className='dex' htmlFor='dex-input'>DEX</label>
                <input
                    name='dex'
                    id='dex-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                
                <input
                    name='dexBonus'
                    id='dex-bonus-input'
                    type='number'
                    className='stat'
                    value={character?.race?.racialAbilityBonus?.dex?.bonus || 0}
                    data-race={character?.race?.racialAbilityBonus?.dex?.race || ''}
                    readOnly
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    />

                <input
                    name='dexTotal'
                    id='dex-total-input'
                    type='number'
                    readOnly
                    value={((character?.stats?.dex ?? 0) + (character?.race?.racialAbilityBonus?.dex?.bonus ?? 0)).toString()}
                    />

                <span>
                    {character?.class.secondary?.multiClassing?.prerequisites
                        ? character.class.secondary.multiClassing.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'dex'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} dex for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

            <p className='con'>
                <label className='con' htmlFor='con-input'>CON</label>
                <input
                    name='con'
                    id='con-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                
                <input
                    name='conBonus'
                    id='con-bonus-input'
                    type='number'
                    className='stat'
                    value={character?.race?.racialAbilityBonus?.con?.bonus || 0}
                    data-race={character?.race?.racialAbilityBonus?.con?.race || ''}
                    readOnly
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    />

                <input
                    name='conTotal'
                    id='con-total-input'
                    type='number'
                    readOnly
                    value={((character?.stats?.con ?? 0) + (character?.race?.racialAbilityBonus?.con?.bonus ?? 0)).toString()}
                    />

                <span>
                    {character?.class.secondary?.multiClassing?.prerequisites
                        ? character.class.secondary.multiClassing.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'con'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} con for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

            <p className='int'>
                <label className='int' htmlFor='int-input'>INT</label>
                <input
                    name='int'
                    id='int-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                
                <input
                    name='intBonus'
                    id='int-bonus-input'
                    type='number'
                    className='stat'
                    value={character?.race?.racialAbilityBonus?.int?.bonus || 0}
                    data-race={character?.race?.racialAbilityBonus?.int?.race || ''}
                    readOnly
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    />

                <input
                    name='intTotal'
                    id='int-total-input'
                    type='number'
                    readOnly
                    value={((character?.stats?.int ?? 0) + (character?.race?.racialAbilityBonus?.int?.bonus ?? 0)).toString()}
                    />

                <span>
                    {character?.class.secondary?.multiClassing?.prerequisites
                        ? character.class.secondary.multiClassing.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'int'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} int for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

            <p className='wis'>
                <label className='wis' htmlFor='wis-input'>WIS</label>
                <input
                    name='wis'
                    id='wis-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                
                <input
                    name='wisBonus'
                    id='wis-bonus-input'
                    type='number'
                    className='stat'
                    value={character?.race?.racialAbilityBonus?.wis?.bonus || 0}
                    data-race={character?.race?.racialAbilityBonus?.wis?.race || ''}
                    readOnly
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    />

                <input
                    name='wisTotal'
                    id='wis-total-input'
                    type='number'
                    readOnly
                    value={((character?.stats?.wis ?? 0) + (character?.race?.racialAbilityBonus?.wis?.bonus ?? 0)).toString()}
                    />

                <span>
                    {character?.class.secondary?.multiClassing?.prerequisites
                        ? character.class.secondary.multiClassing.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'wis'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} wis for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

            <p className='cha'>
                <label className='cha' htmlFor='cha-input'>CHA</label>
                <input
                    name='cha'
                    id='cha-input'
                    type='number'
                    className='stat'
                    defaultValue='10'
                    onChange={handleChange}
                    />
                
                <input
                    name='chaBonus'
                    id='cha-bonus-input'
                    type='number'
                    className='stat'
                    value={character?.race?.racialAbilityBonus?.cha?.bonus || 0}
                    data-race={character?.race?.racialAbilityBonus?.cha?.race || ''}
                    readOnly
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    />

                <input
                    name='chaTotal'
                    id='cha-total-input'
                    type='number'
                    readOnly
                    value={((character?.stats?.cha ?? 0) + (character?.race?.racialAbilityBonus?.cha?.bonus ?? 0)).toString()}
                    />

                <span>
                    {character?.class.secondary?.multiClassing?.prerequisites
                        ? character.class.secondary.multiClassing.prerequisites.map((prereq, i) => {
                            if(prereq.ability_score.index === 'cha'){
                                return(
                                    <span>
                                        *{character.class.secondary.className} Requires {prereq.minimum_score} cha for Multiclass
                                    </span>
                                )
                            }
                            return null
                        }) : ''}
                </span>
                {infoDiv}
            </p>

        </div>
    )
}