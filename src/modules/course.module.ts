import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseController } from "src/controllers/course.controller";
import { CourseModel } from "src/models/course.model";

@Module({
    imports: [TypeOrmModule.forFeature([CourseModel])],
    controllers: [CourseController]
})

export class CourseModule { }