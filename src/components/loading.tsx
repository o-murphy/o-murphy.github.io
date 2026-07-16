export const MIN_LOADING_MS = 200;

export const Loading = ({
    message = 'Loading...',
    className = 'w-full max-w-4xl p-8 text-center',
}: {
    message?: string;
    className?: string;
}) => {
    return (
        <div className={className}>
            <p>{message}</p>
        </div>
    );
};
