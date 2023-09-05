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
	public startTime: Date;
	@ApiProperty()
	@IsDateString()
	public endTime: Date;
	@ApiProperty()
	@IsNumber()
	public maxParticipants: number;
	@ApiProperty()
	@IsNumber()
	public environmentId: number;
}
