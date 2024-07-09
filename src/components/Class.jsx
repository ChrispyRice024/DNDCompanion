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
        const url = e?.target?.list?.querySelector(`option[value='${e.target.value}']`)?.getAttribute('data-url')

        if(inputName === 'primaryClass' && compare){
            classFetchCall(url, 'primary_class')
        }
    }

    useEffect(() => {
        setOptionDiv(
            <div>
                <div>
                    <label htmlFor='primaryClass'>Primary Class</label>
                    {/* <input name='primaryClass' list='primaryClassList' onChange={verifyInput} autoComplete='on' id='primaryClass' className='class' placeholder='Class' /> */}
                    <select id='primaryClassList' defaultValue=''>
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