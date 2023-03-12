import { IsString, MaxLength } from 'class-validator'

export class CourseSchema {
    @IsString()
    @MaxLength(100)
    descricao: string;

    @IsString()
    @MaxLength(200)
    ementa: string;
}