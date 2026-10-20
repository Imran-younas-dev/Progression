const SESSION_KEY = 'progression.session'

export type SessionUser = {
    id: number
    name: string
    email: string
}

export type Session = {
    token: string
    user: SessionUser
}

type ErrorBody = {
    message?: string
}

export function getSession(): Session | null {
    const raw = localStorage.getItem(SESSION_KEY)

    if (!raw) {
        return null
    }

    try {
        return JSON.parse(raw) as Session
    } catch {
        return null
    }
}

export function setSession(session: Session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
    localStorage.removeItem(SESSION_KEY)
}

export async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const session = getSession()
    const headers = new Headers(options.headers)

    headers.set('Accept', 'application/json')

    if (options.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json')
    }

    if (session?.token) {
        headers.set('Authorization', `Bearer ${session.token}`)
    }

    const response = await fetch(path, {
        ...options,
        headers,
    })

    const body = (await response.json().catch(() => ({}))) as T & ErrorBody

    if (!response.ok) {
        throw new Error(body.message || 'Request failed')
    }

    return body
}

export async function getHello() {
    const body = await request<{ data: { message: string } }>('/api/hello')
    return body.data
}
