(function (root) {
    root.UI = {};
    root.UI.observable = root.Observable();

    const $ = document.querySelector.bind(document);

    function updateHeader() {
        const month = root.AppModel.currentWeekSunday.getMonth();
        const year = root.AppModel.currentWeekSunday.getFullYear();

        $('.currentMonth').innerText = root.Utils.getMonthName(month);
        $('.currentYear').innerText = year;
    }

    function initWeekDays() {
        document.querySelectorAll('.day-names > div > span').forEach(($date, index) => {
            const currentWeekSunday = root.AppModel.currentWeekSunday;
            const newDate = new Date(currentWeekSunday.getFullYear(), currentWeekSunday.getMonth(), currentWeekSunday.getDate() + index);
            const today = new Date();

            if (newDate.getDate() === today.getDate() && newDate.getMonth() === today.getMonth() && newDate.getFullYear() === today.getFullYear())
                $date.parentElement.classList.add('today');
            else
                $date.parentElement.classList.remove('today');

            $date.innerText = newDate.getDate();
        })
    }

    function registerEvents() {
        $('.navigation .previous').addEventListener('click', () => {
            const currentSunday = root.AppModel.currentWeekSunday;
            const newSunday = root.Utils.getSunday(new Date(currentSunday.getFullYear(), currentSunday.getMonth(), currentSunday.getDate() - 7));
            root.UI.observable.emit('weekChanged', newSunday);
        });

        $('.navigation .next').addEventListener('click', () => {
            const currentSunday = root.AppModel.currentWeekSunday;
            const newSunday = root.Utils.getSunday(new Date(currentSunday.getFullYear(), currentSunday.getMonth(), currentSunday.getDate() + 7));
            root.UI.observable.emit('weekChanged', newSunday);
        });
    }

    function clearAppointments() {
        document.querySelectorAll('.appointment').forEach(appmt => appmt.remove());
    }

    function renderAppointmentsForWeek($container, date) {
        const appointments = root.AppModel.getAppointmentsForWeek(date);

        appointments.forEach(appointment => {
            const day = appointment.date.getDay();
            const hour = appointment.date.getHours();

            const $appointment = document.createElement('div');
            $appointment.className = 'appointment ' + (appointment.status || '');
            $appointment.innerText = appointment.title;
            $appointment.setAttribute('title', appointment.description);

            $('[day="' + day + '"][hour="' + hour + '"]').appendChild($appointment);
        });
    }

    function initializeAppointmentGridCells($container) {
        for (var h = 0; h < 24; h++) {
            for (var d = 0; d < 7; d++) {
                const $div = document.createElement('div');
                $div.setAttribute('day', d);
                $div.setAttribute('hour', h);

                $container.appendChild($div);
            }
        }
    }

    function initHours($container) {
        for (var h = 0; h < 24; h++) {
            const $div = document.createElement('div');
            if (h < 10)
                $div.innerText = '0' + h + ':00';
            else
                $div.innerText = h + ':00';

            $container.appendChild($div);
        }
    }

    root.UI.initialize = function () {
        updateHeader();
        initWeekDays();
        initHours($('.hours'));
        initializeAppointmentGridCells($('.grid'));

        registerEvents();
        renderAppointmentsForWeek($('.grid'), root.AppModel.currentWeekSunday);
    }

    root.UI.updateWeek = function (date) {
        updateHeader();
        initWeekDays();
        clearAppointments();
        renderAppointmentsForWeek($('.grid'), date);
    }
}(window.App));