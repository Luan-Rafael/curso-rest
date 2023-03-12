import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterModel } from "src/models/register.model";
import { RegisterSchema } from "src/schemas/register.schema";


@Controller('/register')


export class RegisterController {
    constructor(@InjectRepository(RegisterModel) private model: Repository<RegisterModel>) { }

    @Post()
    public async create(@Body() body: RegisterSchema): Promise<{ data: RegisterModel }> {
        const userCreated = await this.model.save(body);
        return { data: userCreated }
    }

    @Get(':codigo')
    public async getOne(@Param('codigo', ParseIntPipe) codigo: number,): Promise<{ data: RegisterModel }> {
        const user = await this.model.findOne({ where: { codigo } });

        if (!user) {
            throw new NotFoundException(`Não possui nenhum curso com este código ${codigo}`);
        }
        return { data: user }
    }

    @Get()
    public async getAll(): Promise<{ data: any }> {
        const listUser = await this.model.query(`
                                                SELECT  a.codigo AS codigo,
                                                        b.nome AS nome_aluno,
                                                        b.codigo AS codigo_aluno,
                                                        c.codigo AS codigo_curso,
                                                        c.descricao AS descricao_curso
                                                FROM    curso_aluno AS a
                                                INNER JOIN aluno AS b on b.codigo = a.codigo_aluno
                                                INNER JOIN curso AS c on c.codigo = a.codigo_curso
                                                ORDER BY descricao_curso
                                                `);

        return { data: listUser }
    }

    @Put(':codigo')
    public async update(
        @Param('codigo', ParseIntPipe) codigo: number,
        @Body() body: RegisterSchema): Promise<{ data: RegisterModel }> {
        const user = await this.model.findOne({ where: { codigo } })
        if (!user) {
            throw new NotFoundException(`Não possui nenhum curso com este código ${codigo}`);
        }
        await this.model.update({ codigo }, body)
        return { data: await this.model.findOne({ where: { codigo } }) }
    }

    @Delete(':codigo')
    public async delete(@Param("codigo", ParseIntPipe) codigo: number): Promise<{ data: string }> {

        const user = await this.model.findOne({ where: { codigo } })

        if (!user) {
            throw new NotFoundException(`Não possui nenhum curso com este código ${codigo}`);
        }

        await this.model.delete(user);

        return { data: `Registro ${user} deletado com sucesso` }
    }
}