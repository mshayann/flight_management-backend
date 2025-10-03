"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_config_1 = __importDefault(require("./typeorm.config"));
typeorm_config_1.default.initialize()
    .then(() => console.log("DataSource OK"))
    .catch(err => console.error("DataSource Error:", err));
//# sourceMappingURL=test-datasource.js.map