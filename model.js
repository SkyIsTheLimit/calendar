(function (root) {
    root.AppModel = {};
    root.AppModel.observable = new root.Observable();

    root.AppModel.currentWeekSunday = root.Utils.getSunday(new Date());

    root.AppModel.setCurrentWeek = function (date) {
        root.AppModel.currentWeekSunday = root.Utils.getSunday(date);
        root.AppModel.observable.emit('weekChanged', date);
    };

    root.AppModel.getWeekData = function (date) {
        return root.AppModel.getAppointmentsForWeek(date);
    };

    root.AppModel.getAppointmentsForWeek = function (date) {
        const startDate = root.Utils.getSunday(date);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);

        return Appointments.filter(appointment => {
            const year = appointment.date.getFullYear();
            const month = appointment.date.getMonth();
            const date = appointment.date.getDate();

            if (
                (startDate.getFullYear() <= year && year <= endDate.getFullYear()) &&
                (startDate.getMonth() <= month && month <= endDate.getMonth()) &&
                (startDate.getDate() <= date && date <= endDate.getDate())
            )
                return true;
            return false;
        });
    };

    const Appointments = root.AppModel.Appointments = [{
        date: new Date(2019, 04, 20, 17, 00, 00),
        title: 'Test Appointment',
        description: 'Vehicula vulputate magna blandit habitasse id venenatis montes. Turpis eget metus lectus sapien natoque facilisis malesuada dictum. Eu ullamcorper at sem tellus torquent phasellus litora sed. Natoque est diam posuere aliquet nam tristique. Ut non aliquet habitant et dictum taciti.',
        status: 'urgent'
    }, {
        date: new Date(2019, 04, 20, 12, 00, 00),
        title: 'Test Appointment',
        description: 'lorem ipsum',
        status: 'info'
    }, {
        date: new Date(2019, 04, 20, 09, 00, 00),
        title: 'Test Appointment',
        description: 'lorem ipsum',
    }];

    root.AppModel.addAppointment = function (appointment) {
        Appointments.push(appointment);
    };

    root.AppModel.modifyAppointment = function (appointment, updatedAppointment) {
        var existingAppointment = Appointments.find(appmt => appmt.id === appointment.id);

        if (existingAppointment) {
            Object.assign(existingAppointment, updatedAppointment);
        }
    };

    root.AppModel.removeAppointment = function (appointment) {
        var existingAppointmentIndex = Appointments.findIndex(appmt => appmt.id === appointment.id);

        if (existingAppointment !== -1) {
            Appointments.splice(existingAppointmentIndex, 1);
        }
    };
}(window.App));