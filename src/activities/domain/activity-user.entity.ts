import { ApiProperty } from '@nestjs/swagger';
import { $Enums, ActivityUser } from '@prisma/client';

export class ActivityUserEntity implements ActivityUser {
	@ApiProperty()
	id: number;
	@ApiProperty()
	activityId: number;
	@ApiProperty()
	userId: number;
	@ApiProperty()
	userName: string;
	@ApiProperty({ type: $Enums.UserRole })
	role: $Enums.UserRole;

	constructor(partial?: Partial<ActivityUserEntity>) {
		if (partial) {
			Object.assign(this, partial);
		}
	}
}
