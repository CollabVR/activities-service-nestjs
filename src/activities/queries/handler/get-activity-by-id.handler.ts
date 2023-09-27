import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Activity } from '@prisma/client';
import { ActivityEntity } from 'src/activities/domain/activity.entity';
import { GetActivityByIdQuery } from '../impl/get-activity-by-id.query';

@QueryHandler(GetActivityByIdQuery)
export class GetActivityByIdHandler
	implements IQueryHandler<GetActivityByIdQuery>
{
	constructor(private readonly prisma: PrismaService) {}

	async execute(query: GetActivityByIdQuery): Promise<Activity> {
		const activity = await this.prisma.activity.findUnique({
			where: { id: query.id },
			include: {
				activityUsers: {
					include: { user: true }, // Include the user to get the userName
				},
			},
		});
		activity.activityUsers = activity.activityUsers.map((au) => ({
			...au,
			userName: au.user.userName,
		}));
		return new ActivityEntity(activity);
	}
}
