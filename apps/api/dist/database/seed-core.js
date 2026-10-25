"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeed = runSeed;
const bcrypt = __importStar(require("bcryptjs"));
const shared_1 = require("@talal-at/shared");
const entities_1 = require("./entities");
async function runSeed(db, cfg) {
    const out = { projects: 0, caseStudies: 0, admin: '' };
    const projects = db.getRepository(entities_1.ArchiveProject);
    const cases = db.getRepository(entities_1.CaseStudy);
    const users = db.getRepository(entities_1.AdminUser);
    if ((await projects.count()) === 0) {
        await projects.insert(shared_1.SEED_PROJECTS.map((p) => projects.create(p)));
        out.projects = shared_1.SEED_PROJECTS.length;
    }
    if ((await cases.count()) === 0) {
        await cases.insert(shared_1.SEED_CASE_STUDIES.map((c) => cases.create(c)));
        out.caseStudies = shared_1.SEED_CASE_STUDIES.length;
    }
    if (cfg.adminEmail && cfg.adminPassword) {
        const existing = await users.findOne({ where: { email: cfg.adminEmail } });
        if (!existing) {
            await users.save(users.create({ email: cfg.adminEmail, name: 'Talal Atallah', role: 'owner', passwordHash: await bcrypt.hash(cfg.adminPassword, 12) }));
            out.admin = 'created';
        }
        else if (cfg.adminPasswordReset) {
            existing.passwordHash = await bcrypt.hash(cfg.adminPassword, 12);
            await users.save(existing);
            out.admin = 'password reset';
        }
    }
    return out;
}
//# sourceMappingURL=seed-core.js.map