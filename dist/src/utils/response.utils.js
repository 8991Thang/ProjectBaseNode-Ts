"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = void 0;
class ErrorHandler extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}
exports.default = ErrorHandler;
const handleResponse = (status, message, data = null) => {
    return { status, message, data };
};
exports.handleResponse = handleResponse;
