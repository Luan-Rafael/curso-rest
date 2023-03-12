import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserModel } from "src/models/user.model";
import { UserSchema } from "src/schemas/user.schema";


@Controller('/user')

export class UserController {
    constructor(@InjectRepository(UserModel) private model: Repository<UserModel>) { }

    @Post()
    public async create(@Body() body: UserSchema): Promise<{ data: UserModel }> {
        const userCreated = await this.model.save(body);
        return { data: userCreated }
    }

    @Get(':codigo')
    public async getOne(@Param('codigo', ParseIntPipe) codigo: number,): Promise<{ data: UserModel }> {
        const user = await this.model.findOne({ where: { codigo } });

        if (!user) {
            throw new NotFoundException(`Não possui nenhum curso com este código ${codigo}`);
        }
        return { data: user }
    }

    @Get()
    public async getAll(): Promise<{ data: UserModel[] }> {
        const listUser = await this.model.find()
        return { data: listUser }
    }

    @Put(':codigo')
    public async update(
        @Param('codigo', ParseIntPipe) codigo: number,
        @Body() body: UserSchema): Promise<{ data: UserModel }> {
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