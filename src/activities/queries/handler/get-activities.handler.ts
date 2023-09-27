import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetActivitiesQuery } from '../impl/get-activities.query';
import { Activity } from '@prisma/client';
import { ActivityEntity } from 'src/activities/domain/activity.entity';

@QueryHandler(GetActivitiesQuery)
export class GetActivitiesHandler implements IQueryHandler<GetActivitiesQuery> {
	constructor(private readonly prisma: PrismaService) {}

	async execute(): Promise<Activity[]> {
		const activities = await this.prisma.activity.findMany({
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
