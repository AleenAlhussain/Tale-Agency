"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBot = isBot;
function isBot(body) {
    return !!(body && typeof body.website === 'string' && body.website.trim().length > 0);
}
//# sourceMappingURL=honeypot.js.map