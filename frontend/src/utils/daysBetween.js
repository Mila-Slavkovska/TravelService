export function getDaysBetween(date1, date2) {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    const timeDifference = Math.abs(secondDate - firstDate);

    return  Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}