import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateSpaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class InviteMemberDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsOptional()
  role?: 'admin' | 'member' | 'guest';
}
