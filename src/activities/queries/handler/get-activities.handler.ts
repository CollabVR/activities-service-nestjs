import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetActivitiesQuery } from '../impl/get-activities.query';
import { Activity } from '@prisma/client';
import { ActivityEntity } from 'src/activities/domain/activity.entity';

@QueryHandler(GetActivitiesQuery)
export class GetActivitiesHandler implements IQueryHandler<GetActivitiesQuery> {
	constructor(private readonly prisma: PrismaService) {}

	async execute(): Promise<Activity[]> {
		const activity = this.prisma.activity.findMany();
		return (await activity).map((activity) => new ActivityEntity(activity));
	}
}
