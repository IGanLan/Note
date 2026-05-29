import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { Space } from '../entities/space.entity';
import { SpaceMember } from '../entities/space-member.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Space, SpaceMember, User])],
  providers: [SpacesService],
  controllers: [SpacesController],
})
export class SpacesModule {}
