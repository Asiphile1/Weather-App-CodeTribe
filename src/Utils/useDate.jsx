import { useEffect, useState } from "react";

export const useDate = () => {
    const locale = 'en';
    const [today, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 60*1000)

        return () => {
            clearInterval(timer)
        }
    },[])

    const day = today.toLocaleDateString(locale, {weekday: 'long'})
    const date = `${day}, ${today.getDate()}, ${today.toLocaleDateString(locale, {month: 'long'})}\n\n`
    const time = today.toLocaleDateString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' })

    return {
        date, time
    }
}


// custom hook for date and time
// 2 arrow function inside arrow function that define a constant (4)
// 5 define use state hook- which will pass current date automatically
// 7 define use effect then inside add arrow function and depenceny error
// 8 timer
// 10 a minute
// export 
