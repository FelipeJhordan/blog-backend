module.exports = {
    dateToFormatLog: (date) => {
        return (date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()+" "+ date.getHours()+":"+date.getMinutes())
    }
}