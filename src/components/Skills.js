import React from 'react'
import {useState, useEffect} from 'react'

export default function Skills ({functions}) {

    const {pro, proBonus, skills} = functions

    // const strSkills = Object.keys(skills).filter(
    //   (skill) => skills[skill].stat === "str"
    // ).map((skill) => {
    //     if(pro.strPro === true){
    //         return skills[skill].value + proBonus
    //     }
    // })
    // const dexSkills = Object.keys(skills).filter(
    //   (skill) => skills[skill].stat === "dex"
    // ).map((skill) => {
    //     if(pro.dexPro === true){
    //         return skills[skill].value + proBonus
    //     }
    // })
    // const intSkills = Object.keys(skills).filter(
    //   (skill) => skills[skill].stat === "int"
    // );
    // const wisSkills = Object.keys(skills).filter(
    //   (skill) => skills[skill].stat === "wis"
    // );
    // const chaSkills = Object.keys(skills).filter(
    //   (skill) => skills[skill].stat === "cha"
    // );


    return(
        <div>
            <h2>Skills</h2>
             <p>
                <label htmlFor='acrobatics'>Acrobatics</label>
                <input name='acrobatics' value={skills.acrobatics.value} readOnly data-stat='dex'/>
            </p>

            <p>
                <label htmlFor='animalHandling'>Animal Handling</label>
                <input name='animalHandling' value={skills.animalHandling.value} type='number' readOnly data-stat='wis'/>
            </p>

            <p>
                <label htmlFor='arcana'>Arcana</label>
                <input name='arcana' value={skills.arcana.value} type='number' readOnly data-stat='int'/>
            </p>

            <p>
                <label htmlFor='athletics'>Athletics</label>
                <input name='athletics' value={skills.athletics.value} type='number' readOnly data-stat='str'/>
            </p>

            <p>
                <label htmlFor='deception'>Deception</label>
                <input name='deception' value={skills.deception.value} type='number' readOnly data-stat='cha'/>
            </p>

            <p>
                <label htmlFor='history'>History</label>
                <input name='history' value={skills.history.value} type='number' readOnly data-stat='int'/>
            </p>

            <p>
                <label htmlFor='insight'>Insight</label>
                <input name='insight' value={skills.insight.value} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label htmlFor='intimidation'>Intimidation</label>
                <input name='intimidation' value={skills.intimidation.value} type='number' readOnly data-stat='cha' />
            </p>

            <p>
                <label htmlFor='investigation'>Investigation</label>
                <input name='investigation' value={skills.investigation.value} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label htmlFor='medicine'>Medicine</label>
                <input name='medicine' value={skills.medicine.value} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label htmlFor='nature'>Nature</label>
                <input name='nature' value={skills.nature.value} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label htmlFor='perception'>Perception</label>
                <input name='perception' value={skills.perception.value} type='number' readOnly data-stat='wis' />
            </p>

            <p>
                <label htmlFor='performance'>Performance</label>
                <input name='performance' value={skills.performance.value} type='number' readOnly data-stat='cha' />
            </p>

            <p>
                <label htmlFor='persuasion'>Persuasion</label>
                <input name='persuasion' value={skills.persuassion.value} type='number' readOnly data-stat='cha' />
            </p>

            <p>
                <label htmlFor='religion'>Religion</label>
                <input name='religion' value={skills.religion.value} type='number' readOnly data-stat='int' />
            </p>

            <p>
                <label htmlFor='sleightOfHand'>Sleight of Hand</label>
                <input name='sleightOfHand' value={skills.sleightOfHand.value} type='number' readOnly data-stat='dex' />
            </p>

            <p>
                <label htmlFor='stealth'>Stealth</label>
                <input name='stealth' value={skills.stealth.value} type='number' readOnly data-stat='dex' />
            </p>

            <p>
                <label htmlFor='survival'>Survival</label>
                <input name='survival' value={skills.survival.value} type='number' readOnly data-stat='wis' />
            </p>
        </div>
    )
}