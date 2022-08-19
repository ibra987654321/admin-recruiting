export default function dateFilter(value) {
    const options = {};
    options.day = "2-digit";
    options.month = "long";
    options.year = "numeric";
    options.hour = "2-digit";
    options.minute = "2-digit";

    return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));

}
