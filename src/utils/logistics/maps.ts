/**
 * Calculates the duration of a travel in hours and minutes
 * @param durationSeconds - The duration in seconds
 * @returns The duration in hours and minutes shape 'hh:mm'
 */
export function getTravelDuration(durationSeconds: number): string {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
