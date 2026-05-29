import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Space } from '../entities/space.entity';
import { SpaceMember, SpaceMemberRole } from '../entities/space-member.entity';
import { User } from '../entities/user.entity';
import { CreateSpaceDto, InviteMemberDto } from './dto/create-space.dto';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Space)
    private spacesRepository: Repository<Space>,
    @InjectRepository(SpaceMember)
    private spaceMembersRepository: Repository<SpaceMember>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createSpaceDto: CreateSpaceDto, ownerId: number): Promise<Space> {
    const space = this.spacesRepository.create({
      ...createSpaceDto,
      ownerId,
    });
    
    const savedSpace = await this.spacesRepository.save(space);
    
    // Add owner as admin member
    await this.spaceMembersRepository.save({
      spaceId: savedSpace.id,
      userId: ownerId,
      role: SpaceMemberRole.ADMIN,
    });
    
    return savedSpace;
  }

  async findAll(userId: number): Promise<Space[]> {
    const memberships = await this.spaceMembersRepository.find({
      where: { userId },
      relations: ['space'],
    });
    
    return memberships.map(m => m.space);
  }

  async findOne(id: number, userId: number): Promise<Space> {
    const membership = await this.spaceMembersRepository.findOne({
      where: { spaceId: id, userId },
      relations: ['space'],
    });
    
    if (!membership) {
      throw new ForbiddenException('You do not have access to this space');
    }
    
    return membership.space;
  }

  async inviteMember(spaceId: number, dto: InviteMemberDto, inviterId: number): Promise<SpaceMember> {
    // Check if inviter is admin
    const inviterMembership = await this.spaceMembersRepository.findOne({
      where: { spaceId, userId: inviterId },
    });
    
    if (!inviterMembership || inviterMembership.role !== SpaceMemberRole.ADMIN) {
      throw new ForbiddenException('Only admins can invite members');
    }
    
    // Check if user exists
    const user = await this.usersRepository.findOne({ where: { id: dto.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    // Check if already member
    const existingMembership = await this.spaceMembersRepository.findOne({
      where: { spaceId, userId: dto.userId },
    });
    
    if (existingMembership) {
      throw new ForbiddenException('User is already a member of this space');
    }
    
    const membership = this.spaceMembersRepository.create({
      spaceId,
      userId: dto.userId,
      role: dto.role || SpaceMemberRole.MEMBER,
    });
    
    return await this.spaceMembersRepository.save(membership);
  }

  async getMembers(spaceId: number): Promise<User[]> {
    const memberships = await this.spaceMembersRepository.find({
      where: { spaceId },
      relations: ['user'],
    });
    
    return memberships.map(m => m.user);
  }

  async removeMember(spaceId: number, userId: number, removerId: number): Promise<void> {
    // Check if remover is admin
    const removerMembership = await this.spaceMembersRepository.findOne({
      where: { spaceId, userId: removerId },
    });
    
    if (!removerMembership || removerMembership.role !== SpaceMemberRole.ADMIN) {
      throw new ForbiddenException('Only admins can remove members');
    }
    
    const result = await this.spaceMembersRepository.delete({ spaceId, userId });
    if (result.affected === 0) {
      throw new NotFoundException('Member not found');
    }
  }
}
