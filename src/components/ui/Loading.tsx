/**
 * Minimal loading indicator with polite live region.
 * @remarks
 * Screen readers are notified without interrupting the current speech.
 */
export default function Loading() {
    return(
        <div
            role="status"
            aria-live="polite"
            className="Loading">
            Loading...
        </div>
    );
}