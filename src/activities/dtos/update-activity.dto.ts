import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsDateString,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

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
	startTime?: Date;
	@ApiProperty()
	@IsDateString()
	@IsOptional()
	endTime?: Date;
	@ApiProperty()
	@IsNumber()
	@IsOptional()
	maxParticipants?: number;
	@ApiProperty({ type: [Number] })
	@IsArray()
	@IsOptional()
	participants?: number[];
	@ApiProperty({ type: [Number] })
	@IsArray()
	@IsOptional()
	moderators?: number[];
	@ApiProperty()
	@IsNumber()
	@IsOptional()
	environmentId?: number;
	@ApiProperty()
	@IsString()
	@IsOptional()
	status?: string;
}
