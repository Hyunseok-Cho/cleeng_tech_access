import { useEffect, useRef } from 'react';

/**
 * Props for Error Message.
 * message: string - The message to display.
 * onRetry?: () => void - Optional retry callback function.
 * autoFocusRetry?: boolean - When ERROR occurs, Focus Retry Button
 */
type Props = {
    message: string;
    onRetry?: () => void;
    autoFocusRetry?: boolean; // When ERROR occurs, Focus Retry Button
};

/**
 * Accessible error banner with optional Retry button.
 * @remarks
 * - Uses `role="alert"` + `aria-live="assertive"` to announce errors immediately.
 * - If `autoFocusRetry` is true, focuses the button for quicker recovery.
 */
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
                <button ref={btnRef} onClick={onRetry} className="RetryButton">
                    Retry
                </button> : null
            }
        </div>
    );
}