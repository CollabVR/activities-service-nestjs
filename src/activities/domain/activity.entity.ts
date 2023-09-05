import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '@prisma/client';

export class ActivityEntity extends AggregateRoot implements Activity {
	@ApiProperty()
	id: number;
	@ApiProperty()
	name: string;
	@ApiProperty()
	description: string;
	@ApiProperty()
	startingTime: string;
	@ApiProperty()
	endingTime: string;
	@ApiProperty()
	durationTime: number;
	@ApiProperty()
	maxParticipants: number;
	@ApiProperty({ type: [Number] })
	participants: number[];
	@ApiProperty({ type: [Number] })
	moderators: number[];
	@ApiProperty()
	date: string;
	@ApiProperty()
	environmentId: number;
	@ApiProperty()
	status: string;

	constructor(partial: Partial<ActivityEntity>) {
		super();
		Object.assign(this, partial);
	}
}