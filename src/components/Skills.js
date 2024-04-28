import React from 'react'
import {useState, useEffect} from 'react'

export default function Skills ({functions}) {

    const {character} = functions
    const skills = character.skills
    
    const racialBonus = character?.misc?.racialAbilityBonus
    const strBonus = racialBonus?.str
    const dexBonus = racialBonus?.dex
    const intBonus = racialBonus?.int
    const chaBonus = racialBonus?.cha
    const wisBonus = racialBonus?.wis

    return(
        <div>
            <h2>Skills</h2>
             <p>
                <label htmlFor='acrobatics'>Acrobatics</label>
                <input name='acrobatics' value={skills.acrobatics.value + dexBonus} readOnly data-stat='dex'/>
            </p>

            <p>
                <label htmlFor='animalHandling'>Animal Handling</label>
                <input name='animalHandling' value={skills.animalHandling.value + wisBonus} type='number' readOnly data-stat='wis'/>
            </p>

            <p>
                <label htmlFor='arcana'>Arcana</label>
                <input name='arcana' value={skills.arcana.value + intBonus} type='number' readOnly data-stat='int'/>
            </p>

            <p>
                <label htmlFor='athletics'>Athletics</label>
                <input name='athletics' value={skills.athletics.value + strBonus} type='number' readOnly data-stat='str'/>
            </p>

            <p>
                <label htmlFor='deception'>Deception</label>
                <input name='deception' value={skills.deception.value + chaBonus} type='number' readOnly data-stat='cha'/>
            </p>

            <p>
                <label htmlFor='history'>History</label>
                <input name='history' value={skills.history.value + intBonus} type='number' readOnly data-stat='int'/>
            </p>

            <p>
                <label htmlFor='insight'>Insight</label>
                <input name='insight' value={skills.insight.value  + wisBonus} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label htmlFor='intimidation'>Intimidation</label>
                <input name='intimidation' value={skills.intimidation.value + chaBonus} type='number' readOnly data-stat='cha' />
            </p>

            <p>
                <label htmlFor='investigation'>Investigation</label>
                <input name='investigation' value={skills.investigation.value + intBonus} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label htmlFor='medicine'>Medicine</label>
                <input name='medicine' value={skills.medicine.value + wisBonus} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label htmlFor='nature'>Nature</label>
                <input name='nature' value={skills.nature.value + intBonus} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label htmlFor='perception'>Perception</label>
                <input name='perception' value={skills.perception.value + wisBonus} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label htmlFor='performance'>Performance</label>
                <input name='performance' value={skills.performance.value + chaBonus} type='number' readOnly data-stat='cha' />
            </p>

            <p>
                <label htmlFor='persuasion'>Persuasion</label>
                <input name='persuasion' value={skills.persuasion.value + chaBonus} type='number' readOnly data-stat='cha' />

            </p>

            <p>
                <label htmlFor='religion'>Religion</label>
                <input name='religion' value={skills.religion.value + intBonus} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label htmlFor='sleightOfHand'>Sleight of Hand</label>
                <input name='sleightOfHand' value={skills.sleightOfHand.value + dexBonus} type='number' readOnly data-stat='dex' />
            </p>

            <p>
                <label htmlFor='stealth'>Stealth</label>
                <input name='stealth' value={skills.stealth.value + dexBonus + intBonus} type='number' readOnly data-stat='dex' />
            </p>

            <p>
                <label htmlFor='survival'>Survival</label>
                <input name='survival' value={skills.survival.value + wisBonus} type='number' readOnly data-stat='wis' />
            </p>
        </div>
    )
}