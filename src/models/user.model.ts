import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'aluno' })
export class UserModel {
    @PrimaryGeneratedColumn()
    codigo: number
    @Column({ length: 50 })
    nome: string
}