import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { RegisterController } from "src/controllers/register.controller";
import { RegisterModel } from "src/models/register.model";

@Module({
    imports: [TypeOrmModule.forFeature([RegisterModel])],
    controllers: [RegisterController]
})

export class RegisterModule { }