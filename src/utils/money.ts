export const cents = (dollars: number): number =>{
    return Math.round(dollars * 100);
}

export const formatCents = (centsValue: number): string => {
    const sugn = centsValue < 0 ? '-' : '';
    const absValue = Math.abs(centsValue);
    const dollars = Math.floor(absValue / 100);
    const cents = absValue % 100;
    return `${sugn}${dollars}.${cents.toString().padStart(2, '0')}`;
}