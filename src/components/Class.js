import {useState, useEffect} from 'react'

export default function Class ({functions}) {

    const {fetchData, setFetchData, classFetchCall} = functions

    const [multiClassData, setMultiClassData] = useState([])

    const [optionDiv, setOptionDiv] = useState()



    useEffect(() => {
        console.log(fetchData?.classList)
    }, [fetchData?.class_list])
    //sets the multiclass logic for the secondary class
    const [multiClassDiv, setMultiClassDiv] = useState()

        const [equipChoiceData, setEquipChoiceData] = useState()

    //Fetching the equip choices 
    useEffect(() => {
        let choiceUrls = []
        console.log(fetchData?.primary_class?.equip?.equip_options)
        const options = fetchData?.primary_class?.equip?.equip_options
        // const choice = options.find(obj => obj.)
        for(let i=0; i < options?.length; i++){
            
            if(options[i].from.option_set_type === 'options_array'){
            
                for(let j=0; j < options[i]?.from?.options?.length; i++){
            
                    const item = options[i]?.from?.options[j]
                    if(item.option_type === 'multiple'){
                        for(let k=0; k < item.items.length; i++){
                            if(item.items[k].option_type === 'choice'){
                                
                            }
                        }
                        console.log('hello')
                        choiceUrls.push(item?.choice?.from?.equipment_category?.url)
                        console.log('choiceUrls', choiceUrls)
                    }
                }
            }
        }
        const choiceFetch = async () => {
            try{
                const res = await fetch()
            }catch(err){
                console.error(err)
            }
        }
    }, [fetchData?.primary_class?.className])
    
    // const multiClassFetch = async () => {
        
    //         try{
    //             const res = await Promise.all(fetchData.class_list.results.map(url=> fetch(`https://www.dnd5eapi.co${url.url}`)))
    //             const data = await Promise.all(res.map(res => res.json()))

    //             const updates = data.map((entry) => ({
    //                 name:entry.name,
    //                 multi_classing:entry.multi_classing,
    //                 url:entry.url
    //             }))

    //             setMultiClassData(updates)
                
    //             setMultiClassDiv(
    //                 <div>
    //                     <label htmlFor='secondaryClass'>Secondary Class</label>
    //                         <input name='secondaryClass' list='secondaryClassList' autoComplete='on' onChange={verifyInput} id='secondaryClass' className='class' placeholder='Class' />
    //                         <datalist id='secondaryClassList'>
    //                             {
    //                                 updates?.map((classData, i) => {
    //                                     let text = classData.name

    //                                         text += ' -Requires'
    //                                         text += classData?.multi_classing?.prerequisites?.map(req => {
    //                                             return`${req.minimum_score} ${req.ability_score.name}`
    //                                         }).join(', ')

    //                                     return(
    //                                         <option key={`s_${i}`}
    //                                             data-url={classData.url}
    //                                             value={classData.name}>
    //                                                 {text}
    //                                             </option>
    //                                     )
    //                                 })
    //                             }
    //                         </datalist>
    //                     </div>
    //             )

    //             classFetchCall()
    //         }catch(err){
    //             console.error(err)
    //         }
    // }

    const verifyInput = (e) => {
        const input = e.target.value
        const inputName = e.target.name

        const compare = fetchData.class_list.results.some(element => element.name === input) || fetchData.class_list.results.some(element => element.name.toLowerCase() === input)
        // const url = e?.target?.list?.querySelector(`option[value='${e.target.value}']`)?.getAttribute('data-url')
        const selected = e.target.options[e.target.selectedIndex]
        const url = selected.getAttribute('data-url')

        if(inputName === 'primaryClass' && compare){
            console.log('is true')
            classFetchCall(url, 'primary_class')
        }else{
            console.log('is false')
        }
    }

    useEffect(() => {
        setOptionDiv(
            <div>
                <div>
                    <p>
                        <h2>Primary Class</h2>
                    </p>
                    {/* <input name='primaryClass' list='primaryClassList' onChange={verifyInput} autoComplete='on' id='primaryClass' className='class' placeholder='Class' /> */}
                    <p>
                        <select name='primaryClass' onChange={verifyInput} id='primaryClassList' defaultValue=''>
                            <option value='' disabled>Select A Class</option>
                            {fetchData?.class_list?.results?.map((item, i) => (
                                <option
                                key={i}
                                data-url={item.url}
                                value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </p>
                    
                </div>
            </div>
        )

    }, [fetchData.class_list])

    return(
        <div>
           {optionDiv}
           {multiClassDiv}
        </div>
    )
}