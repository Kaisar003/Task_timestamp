class Logger {
    constructor() {
        this.messages = {}; // Хранит сообщения и их временные метки
    }

    shouldPrintMessage(timestamp, message) {
        // Проверяем, если записей больше 100, очищаем
        if (Object.keys(this.messages).length >= 100) {
            this.clean(timestamp);
        }

        // Проверяем, есть ли сообщение в хранилище
        if (!(message in this.messages)) {
            // Если сообщения еще не было, добавляем его и возвращаем true
            this.messages[message] = timestamp + 10;
            return true;
        }

        const nextAllowedTime = this.messages[message];
        if (timestamp >= nextAllowedTime) {
            // Если текущее время больше или равно следующему разрешенному времени, обновляем время и возвращаем true
            this.messages[message] = timestamp + 10;
            return true;
        }

        // Иначе возвращаем false
        return false;
    }

    clean(timestamp) {
        for (let message in this.messages) {
            if (this.messages[message] <= timestamp) {
                delete this.messages[message]; // Удаляем сообщение, если его временная метка меньше или равна timestamp
                return true;
            }
        }
        return false;
    }

    loggerSize() {
        return Object.keys(this.messages).length;
    }
}


const logger = new Logger();

console.log(logger.shouldPrintMessage(1, "foo")); // true
console.log(logger.shouldPrintMessage(2, "bar")); // true
console.log(logger.shouldPrintMessage(3, "foo")); // false
console.log(logger.shouldPrintMessage(8, "bar")); // false
console.log(logger.shouldPrintMessage(10, "foo")); // false
console.log(logger.shouldPrintMessage(11, "foo")); // true

console.log(logger.loggerSize()); // 2
console.log(logger.clean(20)); // true
console.log(logger.loggerSize()); // 1
console.log(logger.clean(12)); // false
console.log(logger.loggerSize()); // 1
