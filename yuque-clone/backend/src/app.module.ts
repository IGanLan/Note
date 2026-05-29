import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SpacesModule } from './spaces/spaces.module';
import { DocsModule } from './docs/docs.module';
import { AttachmentsModule } from './attachments/attachments.module';

// Entities
import { User } from './entities/user.entity';
import { Space } from './entities/space.entity';
import { SpaceMember } from './entities/space-member.entity';
import { DocFolder } from './entities/doc-folder.entity';
import { Doc } from './entities/doc.entity';
import { DocVersion } from './entities/doc-version.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
import { Attachment } from './entities/attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'yuque_user',
      password: process.env.DATABASE_PASSWORD || 'yuque_password',
      database: process.env.DATABASE_NAME || 'yuque_db',
      entities: [
        User,
        Space,
        SpaceMember,
        DocFolder,
        Doc,
        DocVersion,
        Comment,
        Like,
        Attachment,
      ],
      synchronize: true, // 生产环境建议设为 false，使用 migrations
      logging: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UsersModule,
    SpacesModule,
    DocsModule,
    AttachmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
