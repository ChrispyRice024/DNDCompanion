import react from 'react'
import {useState, useEffect} from 'react'
import {debounce} from 'lodash' 

export default function Stats({functions}) {
    const {setCharacter, character, fetchData, setFetchData} = functions

    const [infoDiv, setInfoDiv] = useState()

    const decideBonus = (stat) => {
        const bonuses = fetchData?.race?.ability_bonuses
        let statBonus
        bonuses?.forEach(bonus => {
            console.log(stat, bonus?.ability_score?.index)
            if(bonus?.ability_score?.index === stat){
                console.log('right', bonus?.bonus)
                statBonus = bonus?.bonus
            }
        })
        console.log(statBonus)
        return(statBonus)
    }

    const handleChange = (e) => {
        const statValue = parseInt(e.target.value, 10);
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

        const modValue = Math.ceil(((statValue) - 10) / 2);

        setFetchData(prevData => ({
            ...prevData,
            stats: {
                ...prevData.stats,
                [e.target.name]: statValue
            },
            mods: {
                ...prevData.mods,
                [`${e.target.name}`]: modValue
            },
        }))

    };

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
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'str') ? <span><strong>STR Bonus From {fetchData?.race?.name}: </strong> {decideBonus('str')} | </span> :''}
                <strong>STR Mod: </strong> {fetchData?.mods?.str || 0} 

                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'str') ? <span> | <strong>Total STR: </strong>{parseInt(fetchData?.stats?.str) + parseInt(decideBonus('str'))}</span> : <span><strong> | Total STR: </strong> {fetchData?.stats?.str}</span>}
  
                <span>
                    {character?.secondary_class?.multi_classing?.prerequisites
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
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'dex') ? <span><strong>DEX Bonus From {fetchData?.race?.name}: </strong> {decideBonus('dex')} | </span> :''}
                <strong>DEX Mod: </strong> {fetchData?.mods?.dex || 0}
                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'dex') ? <span> | <strong>Total STR: </strong>{parseInt(fetchData?.stats?.dex) + parseInt(decideBonus('dex'))}</span> : <span><strong> | Total DEX: </strong> {fetchData?.stats?.dex}</span>}
                <span>
                    {fetchData?.secondary_class?.multi_classing?.prerequisites
                        ? fetchData?.secondary_class?.multi_classing?.prerequisites.map((prereq, i) => {
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
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'con') ? <span><strong>CON Bonus From {fetchData?.race?.name}: </strong> {decideBonus('con')} | </span> :''}
                <strong>CON Mod: </strong> {fetchData?.mods?.con || 0}
                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'con') ? <span> | <strong>Total CON: </strong>{parseInt(fetchData?.stats?.con) + parseInt(decideBonus('con'))}</span> : <span><strong> | Total CON: </strong> {fetchData?.stats?.con}</span>}
                <span>
                    {character?.class.secondary?.multiClassing?.prerequisites
                        ? fetchData?.secondary_class?.multi_classing?.prerequisites.map((prereq, i) => {
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
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'int') ? <span><strong>INT Bonus From {fetchData?.race?.name}: </strong> {decideBonus('int')} | </span> :''}
                <strong>INT Mod: </strong> {fetchData?.mods?.int || 0}
                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'int') ? <span> | <strong>Total INT: </strong>{parseInt(fetchData?.stats?.int) + parseInt(decideBonus('int'))}</span> : <span><strong> | Total INT: </strong> {fetchData?.stats?.int}</span>}
                <span>
                    {fetchData?.secondary_class?.multi_classing?.prerequisites
                        ? fetchData?.secondary_class?.multi_classing?.prerequisites.map((prereq, i) => {
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
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'wis') ? <span><strong>WIS Bonus From {fetchData?.race?.name}: </strong> {decideBonus('wis')} | </span> :''}
                <strong>WIS Mod: </strong> {fetchData?.mods?.wis || 0}
                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'wis') ? <span> | <strong>Total WIS: </strong>{parseInt(fetchData?.stats?.wis) + parseInt(decideBonus('wis'))}</span> : <span><strong> | Total WIS: </strong> {fetchData?.stats?.wis}</span>}
                <span>
                    {fetchData?.secondary_class?.multi_classing?.prerequisites
                        ? fetchData?.secondary_class?.multi_classing?.prerequisites.map((prereq, i) => {
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
                {fetchData?.race?.name && fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'cha') ? <span><strong>CHA Bonus From {fetchData?.race?.name}: </strong> {decideBonus('cha')} | </span> :''}
                <strong>CHA Mod: </strong> {fetchData?.mods?.cha || 0}
                {fetchData?.race?.ability_bonuses.some(obj => obj.ability_score?.index === 'cha') ? <span> | <strong>Total CHA: </strong>{parseInt(fetchData?.stats?.cha) + parseInt(decideBonus('cha'))}</span> : <span><strong> | Total CHA: </strong> {fetchData?.stats?.cha}</span>}
                <span>
                    {fetchData?.secondary_class?.multi_classing?.prerequisites
                        ? fetchData?.secondary_class?.multi_classing?.prerequisites.map((prereq, i) => {
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