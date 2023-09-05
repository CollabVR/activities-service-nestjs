import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
	@ApiProperty()
	public name: string;
	@ApiProperty()
	public description: string;
	@ApiProperty()
	public startingTime: string;
	@ApiProperty()
	public endingTime: string;
	@ApiProperty()
	public date: string;
	@ApiProperty()
	public maxParticipants: number;
	@ApiProperty()
	public environmentId: number;
}
