


function Logo({ disabledLink = false, sx }) {
    return (
        <div
            style={{
                width: 40,
                height: 40,
                display: 'inline-flex',
                ...sx
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
                <defs>
                    <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="100%">
                        <stop offset="0%" stopColor="#1E90FF" />
                        <stop offset="100%" stopColor="#00BFFF" />
                    </linearGradient>

                    <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="150%">
                        <stop offset="0%" stopColor="#87CEFA" />
                        <stop offset="100%" stopColor="#00BFFF" />
                    </linearGradient>
                </defs>

                <g fill="#00BFFF" fillRule="evenodd" stroke="none" strokeWidth="1">

                    <path
                        fill="url(#BG1)"
                        d="M256 128c-16 0-32 8-40 24l-24 40c-8 16 0 32 16 40l40 24c16 8 32 0 40-16l24-40c8-16 0-32-16-40l-40-24z"
                    />

                    <path
                        fill="url(#BG2)"
                        d="M256 384c-16 0-32-8-40-24l-24-40c-8-16 0-32 16-40l40-24c16-8 32 0 40 16l24 40c8 16 0 32-16 40l-40 24z"
                    />
                </g>
            </svg>
        </div>
    )
}

export default Logo;
