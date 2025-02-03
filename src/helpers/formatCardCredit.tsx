export function formatCardCredit(value: string) {
    const cleaned = value.replace(/\D/g, '');

    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}