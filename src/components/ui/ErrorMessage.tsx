import { useEffect, useRef } from 'react';

type Props = {
    message: string;
    onRetry?: () => void;
    autoFocusRetry?: boolean; // When ERROR occurs, Focus Retry Button
};

export default function ErrorMessage({ message, onRetry, autoFocusRetry }: Props) {
    const btnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if(autoFocusRetry && btnRef.current) {
            btnRef.current.focus();
        }
    }, [autoFocusRetry]);

    return (
        <div role="alert" aria-live="assertive">
            <p>{message}</p>

            {onRetry ? 
                <button ref={btnRef} onClick={onRetry}>
                    Retry
                </button> : null
            }
        </div>
    );
}