import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'curso_aluno' })
export class RegisterModel {
    @PrimaryGeneratedColumn()
    codigo: number
    @Column()
    codigo_aluno: number
    @Column()
    codigo_curso: number
}