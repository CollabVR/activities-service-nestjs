import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsDateString,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';
import { ActivityUserDto } from './activity-user.dto';

export class UpdateActivityDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	name?: string;
	@ApiProperty()
	@IsString()
	@IsOptional()
	description?: string;
	@ApiProperty()
	@IsDateString()
	@IsOptional()
	startTime?: string;
	@ApiProperty()
	@IsDateString()
	@IsOptional()
	endTime?: string;
	@ApiProperty()
	@IsNumber()
	@IsOptional()
	maxParticipants?: number;
	@ApiProperty({ type: [ActivityUserDto] })
	@IsArray()
	@IsOptional()
	students?: ActivityUserDto[];
	@ApiProperty({ type: [ActivityUserDto] })
	@IsArray()
	@IsOptional()
	moderators?: ActivityUserDto[];
	@ApiProperty()
	@IsString()
	@IsOptional()
	environmentId?: string;
	@ApiProperty()
	@IsString()
	@IsOptional()
	status?: string;
}

