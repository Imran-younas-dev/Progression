import type { ReactNode } from 'react'

import { Logo } from './Logo'

type ShellProps = {
    children: ReactNode
}

export function Shell({ children }: ShellProps) {
    return (
        <div className="shell">
            <header className="topbar">
                <Logo className="logo" />
                <p className="wordmark">Progression</p>
            </header>
            <main className="page">{children}</main>
        </div>
    )
}
