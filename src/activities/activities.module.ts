import { Module } from '@nestjs/common';
import { ActivitiesController } from './controllers/activities.controller';
import { GetActivitiesHandler } from './queries/handler/get-activities.handler';
import { CreateActivityHandler } from './commands/handlers/create-activity.handler';
import { CqrsModule } from '@nestjs/cqrs';
import UpdateActivityHandler from './commands/handlers/update-activity.handler';
import { GetActivityByIdHandler } from './queries/handler/get-activity-by-id.handler';
import { GetActivityByNameHandler } from './queries/handler/get-activity-by-name.handler';

@Module({
	imports: [CqrsModule],
	controllers: [ActivitiesController],
	providers: [
		GetActivitiesHandler,
		CreateActivityHandler,
		UpdateActivityHandler,
		GetActivityByIdHandler,
		GetActivityByNameHandler,
	],
})
export class ActivitiesModule {}
