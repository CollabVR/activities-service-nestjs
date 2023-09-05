import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Activity } from '@prisma/client';
import { ActivityEntity } from 'src/activities/domain/activity.entity';
import { GetActivityByNameQuery } from '../impl/get-activity-by-name.query copy';

@QueryHandler(GetActivityByNameQuery)
export class GetActivityByNameHandler
	implements IQueryHandler<GetActivityByNameQuery>
{
	constructor(private readonly prisma: PrismaService) {}

	async execute(query: GetActivityByNameQuery): Promise<Activity> {
		const activity = await this.prisma.activity.findUnique({
			where: { name: query.name },
		});
		return new ActivityEntity(activity);
	}
}
