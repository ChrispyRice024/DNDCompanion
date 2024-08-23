import React from 'react'
import { useState, useEffect } from 'react'
import { lazy } from 'react'
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
const fs = require("fs");
const path = require('path')

export default function CharCreator() {

  const [fetchData, setFetchData] = useState({
    primary_class: {
      chosen_pro_0: [],
      chosen_pro_1: []
    },
    stats: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10
    },
    mods: {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0
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
  })

  // fetches the list of races
  useEffect(() => {
    const fetchCall = async () => {
      try {
        const res = await fetch('https://www.dnd5eapi.co/api/races')
        const data = await res.json()

        setFetchData(prevData => ({
          ...prevData,
          race_list: data.results
        }))
      } catch (err) {
        console.error('Error fetching data: ', err)
      }
    }
    fetchCall()
  }, [])

  //fetches the list of classes
  useEffect(() => {
    const classList = async () => {
      try {
        const res = await fetch(`https://dnd5eapi.co/api/classes`)
        const data = await res.json()

        setFetchData(prevData => ({
          ...prevData,
          class_list: data
        }))
      } catch (err) {
        console.error(err, err.message)
      }
    }

    classList()
  }, [])

  const handleName = (e) => {
    e.preventDefault()

    setFetchData(prevData => ({
      ...prevData,
      char_name: e.target.value
    }))
  }
  //class fetch
  const classFetchCall = async (url, targetKey) => {
    try {
      // initial fetch
      const res = await fetch(`https://dnd5eapi.co${url}`)
      const data = await res.json()

      // fetch spell data for the class
      if (targetKey === 'primary_class') {
        if(data.features){
          data.features.forEach( async feature => {
            const featureRes = await fetch(`https://www.dnd5eapi.co${feature.url}`)
            const featureData = await featureRes.json()
          })
        }
        console.log('data', data)
        // FETCH THE SPELL DATA
        let spells = {}
        if (data.spells) {
          const spellRes = await fetch(`https://dnd5eapi.co${data.spells}`)
          const spellData = await spellRes.json()

          for (let item of spellData.results) {
            let level = item.level

            if (!spells[`level_${level}_spells`]) {
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

        const updatedLevels = await Promise.all(levelsData.map(async level => {
          const features = await Promise.all(level.features.map( async item => {
            const featureRes = await fetch(`https://www.dnd5eapi.co${item.url}`)
            return await featureRes.json()
          }))
          return {...level, features}
        }))

        setFetchData(prevData => ({
          ...prevData,
          [targetKey]: {
            index: data.index,
            name: data.name,
            levels: data.class_levels,
            hit_die: data.hit_die,
            multi_classing: data.multi_classing,
            features: features,
            equip: {
              starting_equip: data.starting_equipment,
              equip_options: data.starting_equipment_options
            },
            proficiencies: {
              starting_proficiencies: data.proficiencies,
              proficiency_choices: data.proficiency_choices
            },
            saving_throws: data.saving_throws,
            spellcasting: data.spellcasting,
            spells: spells,
            level_data: updatedLevels,
            url: data.url,
            spells_url: data.spells
          }
        }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const raceFetch = async (url) => {
    try {
      console.log('url raceFetch', url)
      const res = await fetch(`https://www.dnd5eapi.co${url}`)
      const data = await res.json()

      setFetchData(prevData => ({
        ...prevData,
        race: data
      }))

    } catch (err) {
      console.error(err)
    }
  }

  const handleNewChar = (e, newDiv) => {
    e.preventDefault()
    // setCount(prevCount => prevCount + 1)

    if (newDiv === 'class/race') {
      setFetchData(prevData => ({
        ...prevData,
        isCreatingNewChar: 'class/race'
      }))
    } else if (newDiv === 'spellcasting' && fetchData?.primary_class?.spellcasting) {

      setFetchData(prevData => ({
        ...prevData,
        isCreatingNewChar: 'spellcasting'
      }))
    } else if ((newDiv === 'spellcasting' && !fetchData?.primary_class?.spellcasting) || (newDiv === 'equip')) {

      setFetchData(prevData => ({
        ...prevData,
        isCreatingNewChar: 'equip'
      }))
    } else if (newDiv === 'stats') {
      setFetchData(prevData => ({
        ...prevData,
        isCreatingNewChar: 'stats'
      }))
    } else if (newDiv === 'name') {
      setFetchData(prevData => ({
        ...prevData,
        isCreatingNewChar: 'name'
      }))
    }

  }

  const handleImage = (e) => {
    e.preventDefault()

    //MOVE THE IMAGE INTO THE ASSETS FOLDER AND 
    //LINK TO THE LOCATION ON THE CHARACTER MODEL
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setFetchData(prevData => {
      const copy = {...prevData}

      copy.id = Date.now()
      copy.primary_class.level = 1
      copy.char_level = 1

      if(copy.chosen_equip){
        delete copy?.chosen_equip
      }
      if(copy.class_list){
        delete copy.class_list
      }
      if(copy.race_list){
        delete copy.race_list
      }
      if(copy.isCreatingNewChar){
        delete copy.isCreatingNewChar
      }
      console.log('copy.id', copy.id)
      console.log(copy)


      fs.readFile('./save.json', 'utf8', (err, data) => {

        if (err) {
          console.error(err)
        } else if (data === '' || data.length === 0) {
          const charArray = [copy]
          const charArrayString = JSON.stringify(charArray)

          fs.writeFile('save.json', charArrayString, (err) => {
            if (err) {
              console.error(err)
            } else {
              console.log('success. array empty on initilization')
            }
          })
        } else {
          const jsonData = JSON.parse(data)
          jsonData.push(copy)

          const stringData = JSON.stringify(jsonData)

          fs.writeFile('./save.json', stringData, (err) => {
            if (err) {
              console.error(err)
            } else {
              console.log('success. array not empty on initilization')
            }
          })
        }
      })
      window.location.reload()
      return copy
    })
  }

  return (
    <div id='outerParent'>
      <div>

        {!(fetchData?.isCreatingNewChar) ?
          <button onClick={(e) => { handleNewChar(e, 'class/race') }}>Create Character</button>
          : ''}

      </div>
      <form>
        {/* {div} */}
        {fetchData?.isCreatingNewChar === 'class/race' ?

          <div>
            <div id='race_class'>
              <div id='race'>
                <Race functions={{
                  setFetchData: setFetchData,
                  raceFetch: raceFetch,
                  fetchData: fetchData
                }} />
              </div>
              <div>
                <div id='class'>
                  <Class functions={{
                    fetchData: fetchData,
                    setFetchData: setFetchData,
                    classFetchCall: classFetchCall
                  }} />


                  <div id='classFeatures' style={{ display: fetchData?.primary_class?.name ? '' : 'none' }}>
                    <ClassFeatures functions={{
                      fetchData,
                      setFetchData
                    }} />
                  </div>

                  <div id='proInfo' style={{ display: fetchData?.primary_class?.name ? '' : 'none' }}>
                    <ProInfo functions={{
                      fetchData: fetchData,
                      setFetchData: setFetchData
                    }} />
                  </div>
                </div>

              </div>

            </div>
            <button onCLick={(e) => { handleNewChar(e, '') }}>Cancel</button>
            <button onClick={(e) => { handleNewChar(e, 'equip') }}>Equipment</button>
          </div>

          : fetchData?.isCreatingNewChar === 'equip' ?

            <div>
              <div id='equip'>
                <Equip functions={{
                  fetchData: fetchData,
                  setFetchData: setFetchData
                }} />
              </div>
              <button onCLick={(e) => { handleNewChar(e, 'class/race') }}>Race/Class</button>
              <button onClick={(e) => { handleNewChar(e, 'stats') }}>Stats</button>
            </div>

            : fetchData?.isCreatingNewChar === 'stats' ?

              <div>
                <div id='statsAndSuch'>
                  <div id='stats'>
                    <Stats functions={{
                      fetchData: fetchData,
                      setFetchData: setFetchData
                    }} />
                  </div>

                  <div id='savingThrows'>
                    <SavingThrows functions={{
                      fetchData: fetchData
                    }} />
                  </div>

                  <div id='combat'>
                    <Combat functions={{
                      fetchData: fetchData,
                      setFetchData: setFetchData
                    }} />
                  </div>

                  <div id='skills'>
                    <Skills functions={{
                      fetchData: fetchData,
                      setFetchData: setFetchData
                    }} />
                  </div>

                </div>
                <button onClick={(e) => { handleNewChar(e, 'equip') }}>Class/Race</button>
                {fetchData?.primary_class?.spellcasting ?
                  <button onClick={(e) => { handleNewChar(e, 'spellcasting') }}>Spellcasting</button> :
                  <button onClick={(e) => { handleNewChar(e, 'name') }}>Finish and Name</button>}

              </div>
              : fetchData?.isCreatingNewChar === 'spellcasting' ?


                <div>
                  <div id='spellcasting'>
                    <Spellcasting functions={{
                      fetchData: fetchData,
                      setFetchData: setFetchData
                    }} />
                  </div>
                  <button onCLick={(e) => { handleNewChar(e, 'stats') }}>Stats</button>
                  <button onClick={(e) => { handleNewChar(e, 'name') }}>Finish and Name</button>
                </div>


                : fetchData?.isCreatingNewChar === 'name' ?


                  <div id='name'>
                    <p>
                    </p>
                    <label htmlFor='name'>Name</label>
                    <input
                      type='text'
                      name='name'
                      onChange={handleName} />
                    <p>
                      <input type='file' accept='.jpeg, .jpg, .png, .psd, .raw, .svg' onChange={(e) => { handleImage(e) }} />
                    </p>
                    <p>
                      <button onClick={(e) => { console.log(fetchData) }}>FetchData</button>
                      <button onCLick={(e) => { handleNewChar(e, 'equip') }}>Equip</button>
                      <button onClick={handleSubmit}>Finish Character</button>
                    </p>
                  </div>
                  : ''}
      </form>
      <button onClick={(e) => { console.log(fetchData) }}>FetchData</button>
    </div>
  )
}