(function (root) {
    root.Utils = {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        getMonthName: function (index) {
            return root.Utils.months[index];
        },
        getSunday: function (date) {
            const dayOfWeek = date.getDay();

            return new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayOfWeek);
        }
    }
}(window.App));