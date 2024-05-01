export function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateAlphanumericSequence(seed: number, length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length); // Genera un indice casuale
        const index = (seed + randomIndex) % characters.length; // Usa l'indice casuale e il seme per ottenere l'indice effettivo
        result += characters.charAt(index);
    }

    return result;
}