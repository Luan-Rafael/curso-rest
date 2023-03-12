import { IsString, MaxLength } from 'class-validator'

export class UserSchema {
    @IsString()
    @MaxLength(100)
    nome: string;
}