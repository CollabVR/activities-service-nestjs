import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ActivityUserDto {
	@ApiProperty()
	@IsNumber()
	userId: number;

	@ApiProperty()
	@IsString()
	userName: string;
}
