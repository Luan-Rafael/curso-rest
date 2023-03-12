import { IsInt } from 'class-validator'

export class RegisterSchema {
    @IsInt()
    codigo_aluno: number;
    @IsInt()
    codigo_curso: number;
}