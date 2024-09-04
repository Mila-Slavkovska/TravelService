export function compareDates(date){
    const today = new Date();
    const myDate = new Date(date);

    return today>myDate;
}