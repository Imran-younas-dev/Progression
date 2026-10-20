type LogoProps = {
    className?: string
}

export function Logo({ className }: LogoProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 32 32"
            aria-hidden="true"
        >
            <rect width="32" height="32" rx="8" fill="#1f4d3a" />
            <path
                d="M9 22 V10 h6.2 c3.3 0 5.3 1.8 5.3 4.4 0 1.8-1 3.2-2.6 3.9 L22 22 h-3.2 l-3.4-3.4 H12 V22 H9 zm3-6 h3 c1.6 0 2.5-.8 2.5-2s-.9-2-2.5-2 H12 v4 z"
                fill="#f4f1ea"
            />
        </svg>
    )
}
