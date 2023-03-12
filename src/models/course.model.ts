import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'curso' })
export class CourseModel {
    @PrimaryGeneratedColumn()
    codigo: number
    @Column({ length: 100 })
    descricao: string
    @Column({ length: 200 })
    ementa: string
}