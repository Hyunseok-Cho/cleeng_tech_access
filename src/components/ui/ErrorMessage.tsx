type Props = {
    message: string;
    onRetry?: () => void;
};

export default function ErrorMessage({ message, onRetry }: Props) {
    return (
        <div>
            <p>{message}</p>

            {onRetry ? 
                <button onClick={onRetry}>
                    Retry
                </button> : null
            }
        </div>
    );
}