"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formThrottle = void 0;
exports.formThrottle = { default: { limit: Number(process.env.FORM_THROTTLE_LIMIT || 6), ttl: 60_000 } };
//# sourceMappingURL=throttle.js.map