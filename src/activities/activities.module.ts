import { Module } from '@nestjs/common';
import { ActivitiesController } from './controllers/activities.controller';
import { GetActivitiesHandler } from './queries/handler/get-activities.handler';
import { CreateActivityHandler } from './commands/handlers/create-activity.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
	imports: [CqrsModule],
	controllers: [ActivitiesController],
	providers: [GetActivitiesHandler, CreateActivityHandler],
})
export class ActivitiesModule {}
