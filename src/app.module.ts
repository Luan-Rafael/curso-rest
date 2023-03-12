import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './modules/course.module';
import { RegisterModule } from './modules/register.module';
import { UserModule } from './modules/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        "type": "postgres",
        "host": "34.30.234.246",
        "port": 5432,
        "username": "luanRafael",
        "password": "${B=Rb1YuXYb6LME",
        "database": "postgres",
        "autoLoadEntities": true,
        "synchronize": true
      }
    ),
    CourseModule,
    UserModule,
    RegisterModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
