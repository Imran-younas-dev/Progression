type HelloMessageProps = {
    message: string
    error: string
}

export function HelloMessage({ message, error }: HelloMessageProps) {
    return (
        <section className="hello">
            <h1>{message}</h1>
            <p>The API answered on /api/hello.</p>
            {error ? <p className="error">{error}</p> : null}
        </section>
    )
}
