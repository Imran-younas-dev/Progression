import { useState } from 'react'

import { Shell } from './components/Shell'
import { HomePage } from './pages/HomePage'

type PageName = 'home'

export default function App() {
    const [page] = useState<PageName>('home')

    return <Shell>{page === 'home' ? <HomePage /> : null}</Shell>
}
