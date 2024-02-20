export default fetchClassData = async () => {
    try{
        const res = await fetch(`https://www.dnd5eapi.co/api/classes`)

        if(!res.ok){
            throw new Error('Network Response Not Okay')
        }
        const data = await res.json()
        return data
    }catch(err) {
        console.error('Error Fetching Data: ', err)
        throw err
    }
}

