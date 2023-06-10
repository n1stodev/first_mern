import { useEffect, useState } from 'react'
import axios from '../api'

export const useFetch = (api, reload) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        axios.get(api)
            .then(res => {
                setData(res.data.innerData)
            })
            .catch(err => {
                if (err?.response?.data?.msg) {
                    setError(err.response.data.msg)
                }
            })
            .finally(() => setLoading(false))
    }, [reload])
    return { data, loading, error }
}
