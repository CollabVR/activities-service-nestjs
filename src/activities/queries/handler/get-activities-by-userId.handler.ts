import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Activity } from '@prisma/client';
import { ActivityEntity } from 'src/activities/domain/activity.entity';
import { GetActivitiesByUserIdQuery } from '../impl/get-activities.by-userId.query';

@QueryHandler(GetActivitiesByUserIdQuery)
export class GetActivitiesByUserIdHandler
	implements IQueryHandler<GetActivitiesByUserIdQuery>
{
	constructor(private readonly prisma: PrismaService) {}

	async execute(query: GetActivitiesByUserIdQuery): Promise<Activity[]> {
		const activities = await this.prisma.activity.findMany({
			where: {
				activityUsers: {
					some: {
						userId: query.userId,
					},
				},
			},
			include: {
				activityUsers: {
					include: { user: true }, // Include the user to get the userName
				},
			},
		});

		return activities.map((activity) => {
			activity.activityUsers = activity.activityUsers.map((au) => ({
				...au,
				userName: au.user.userName,
			}));
			return new ActivityEntity(activity);
		});
	}
}
