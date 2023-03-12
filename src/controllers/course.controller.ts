import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CourseModel } from "src/models/course.model";
import { CourseSchema } from "src/schemas/course.schema";


@Controller('/course')

export class CourseController {
    constructor(@InjectRepository(CourseModel) private model: Repository<CourseModel>) { }

    @Post()
    public async create(@Body() body: CourseSchema): Promise<{ data: CourseModel }> {
        const courseCreated = await this.model.save(body);
        return { data: courseCreated }
    }

    @Get(':codigo')
    public async getOne(@Param('codigo', ParseIntPipe) codigo: number,): Promise<{ data: CourseModel }> {
        const course = await this.model.findOne({ where: { codigo } });

        if (!course) {
            throw new NotFoundException(`Não possui nenhum curso com este código ${codigo}`);
        }
        return { data: course }
    }

    @Get()
    public async getAll(): Promise<{ data: CourseModel[] }> {
        const list = await this.model.find()
        return { data: list }
    }

    @Put(':codigo')
    public async update(
        @Param('codigo', ParseIntPipe) codigo: number,
        @Body() body: CourseSchema): Promise<{ data: CourseModel }> {
        const course = await this.model.findOne({ where: { codigo } })
        if (!course) {
            throw new NotFoundException(`Não possui nenhum curso com este código ${codigo}`);
        }
        await this.model.update({ codigo }, body)
        return { data: await this.model.findOne({ where: { codigo } }) }
    }

    @Delete(':codigo')
    public async delete(@Param("codigo", ParseIntPipe) codigo: number): Promise<{ data: string }> {

        const course = await this.model.findOne({ where: { codigo } })

        if (!course) {
            throw new NotFoundException(`Não possui nenhum curso com este código ${codigo}`);
        }

        await this.model.delete(codigo);

        return { data: `Registro ${codigo} deletado com sucesso` }
    }
}