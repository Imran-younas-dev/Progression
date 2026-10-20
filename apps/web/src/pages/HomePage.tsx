import { useEffect, useState } from 'react'

import { HelloMessage } from '../features/hello/HelloMessage'
import { getHello } from '../lib/api'

export function HomePage() {
    const [message, setMessage] = useState('Hello World')
    const [error, setError] = useState('')

    useEffect(() => {
        let active = true

        getHello()
            .then((data) => {
                if (active) {
                    setMessage(data.message)
                }
            })
            .catch(() => {
                if (active) {
                    setError('The API is not responding.')
                }
            })

        return () => {
            active = false
        }
    }, [])

    return <HelloMessage message={message} error={error} />
}
