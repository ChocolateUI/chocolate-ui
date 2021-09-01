import { useState, useEffect } from 'react'

const useLatestProps =<T>(value: T)=>{
    const [state, setValue] = useState(value)
    useEffect(() => {
      setValue(value)
    }, [value])

    return []
}

export default useLatestProps;