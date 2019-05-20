(function (root) {
    root.Observable = function () {
        var callbacks = {};

        function on(eventName, callback) {
            callbacks[eventName] = callbacks[eventName] || [];
            callbacks[eventName].push(callback);
        }

        function emit(eventName, data) {
            callbacks[eventName] = callbacks[eventName] || [];
            callbacks[eventName].forEach(callback => callback.call(null, data));
        }

        return { on, emit };
    }
}(window.App));