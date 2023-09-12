import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateActivityDto {
	@ApiProperty()
	@IsString()
	public name: string;
	@ApiProperty()
	@IsString()
	public description: string;
	@ApiProperty()
	@IsDateString()
	public startTime: string;
	@ApiProperty()
	@IsDateString()
	public endTime: string;
	@ApiProperty()
	@IsNumber()
	public maxParticipants: number;
	@ApiProperty()
	@IsString()
	public environmentId: string;
}
