import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto, InviteMemberDto } from './dto/create-space.dto';

@Controller('spaces')
@UseGuards(AuthGuard('jwt'))
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  async create(@Request() req, @Body() createSpaceDto: CreateSpaceDto) {
    return this.spacesService.create(createSpaceDto, req.user.userId);
  }

  @Get()
  async findAll(@Request() req) {
    return this.spacesService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: number) {
    return this.spacesService.findOne(+id, req.user.userId);
  }

  @Post(':id/members')
  async inviteMember(@Request() req, @Param('id') id: number, @Body() dto: InviteMemberDto) {
    return this.spacesService.inviteMember(+id, dto, req.user.userId);
  }

  @Get(':id/members')
  async getMembers(@Request() req, @Param('id') id: number) {
    // First check access
    await this.spacesService.findOne(+id, req.user.userId);
    return this.spacesService.getMembers(+id);
  }

  @Delete(':id/members/:userId')
  async removeMember(@Request() req, @Param('id') id: number, @Param('userId') userId: number) {
    return this.spacesService.removeMember(+id, +userId, req.user.userId);
  }
}
