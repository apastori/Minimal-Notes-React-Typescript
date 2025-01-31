import { useState, useEffect } from 'react'

function useLocalStorage<T>(key: string,
    initialValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
        const [value, setValue] = useState<T>(() => {
            const jsonValue: string | null = localStorage.getItem(key)
            if (jsonValue == null) {
                if (typeof initialValue === 'function') {
                    return (initialValue as () => T)()
                } else {
                    return initialValue
                } 
            } else {
                return JSON.parse(jsonValue)
            }
        })
        useEffect(() => {
            localStorage.setItem(key, JSON.stringify(value))
        }, [value, key])
        return [value, setValue] as [T, typeof setValue]
}

export { useLocalStorage }