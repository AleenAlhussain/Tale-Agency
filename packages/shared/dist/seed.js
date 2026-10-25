"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEED_CASE_STUDIES = exports.SEED_PROJECTS = void 0;
const projects_json_1 = __importDefault(require("./seed/projects.json"));
const case_studies_json_1 = __importDefault(require("./seed/case-studies.json"));
exports.SEED_PROJECTS = projects_json_1.default;
exports.SEED_CASE_STUDIES = case_studies_json_1.default;
