(function (root) {
    root.UI.initialize();

    root.UI.observable.on('weekChanged', date => {
        console.log('Received UI Event', date);
        root.AppModel.setCurrentWeek(date);
    });

    root.AppModel.observable.on('weekChanged', date => {
        console.log('Model Changed', date);
        root.UI.updateWeek(date);
    });
}(window.App));