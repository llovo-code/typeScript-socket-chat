"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createMessage = (name, message) => {
    return {
        name, message,
        date: new Date().getTime()
    };
};
exports.default = createMessage;
//# sourceMappingURL=utils.js.map