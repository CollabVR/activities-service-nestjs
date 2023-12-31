import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { ActivityUserEntity } from './activity-user.entity';
import { Activity, UserRole } from '@prisma/client';

export class ActivityEntity extends AggregateRoot {
	@ApiProperty()
	id: number;
	@ApiProperty()
	name: string;
	@ApiProperty()
	description: string;
	@ApiProperty()
	startTime: string;
	@ApiProperty()
	endTime: string;
	@ApiProperty()
	maxParticipants: number;
	@ApiProperty({ type: [ActivityUserEntity] })
	students: ActivityUserEntity[];
	@ApiProperty({ type: [ActivityUserEntity] })
	moderators: ActivityUserEntity[];
	@ApiProperty()
	environmentId: string;
	@ApiProperty()
	status: string;

	constructor(partial: any) {
		super();
		// Explicitly set properties from the DTO to the entity
		this.id = partial.id;
		this.name = partial.name;
		this.description = partial.description;
		this.startTime = partial.startTime;
		this.endTime = partial.endTime;
		this.maxParticipants = partial.maxParticipants;
		this.environmentId = partial.environmentId;
		this.status = partial.status;
		console.log("partial", partial)
		
		// Filter and map participants to activityStudents based on their role
		this.students = partial.activityUsers
			?.filter((p) => {
				console.log("students find:", p)
				return p.user.role === UserRole.STUDENT;
			})
			.map((p) => {
				return new ActivityUserEntity({
					id: p.id,
					activityId: p.activityId,
					userId: p.userId,
					role: p.user.role,
					userName: p.user.userName,
				});
			});

		// Filter and map moderators to activityModerators based on their role
		this.moderators = partial.activityUsers
			?.filter((m) => {
				console.log("moderators find:", m)
				return m.user.role === UserRole.MODERATOR
			})
			.map((p) => {
				return new ActivityUserEntity({
					id: p.id,
					activityId: p.activityId,
					userId: p.userId,
					role: p.user.role,
					userName: p.user.userName,
				});
			});
	}
}
