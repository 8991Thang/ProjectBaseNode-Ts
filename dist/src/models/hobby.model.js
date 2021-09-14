"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hobby_type_1 = require("@src/types/hobby.type");
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const HobbySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    typeOfHobby: { type: String, required: true, enum: hobby_type_1.listHobbyType }
}, { timestamps: true });
HobbySchema.plugin(mongoose_paginate_v2_1.default);
const Hobby = mongoose_1.model("Hobby", HobbySchema);
exports.default = Hobby;
