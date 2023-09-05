import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateActivityCommand } from '../commands/impl/create-activity.command';
import { ActivityEntity } from '../domain/activity.entity';
import { CreateActivityDto } from '../dtos';
import { GetActivitiesQuery } from '../queries/impl/get-activities.query';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('activities')
export class ActivitiesController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Post()
	@ApiCreatedResponse({ type: ActivityEntity })
	createAccount(
		@Body() createActivityDto: CreateActivityDto,
	): Promise<ActivityEntity> {
		console.log('createActivity', createActivityDto);
		return this.commandBus.execute(
			new CreateActivityCommand(createActivityDto),
		);
	}

	@Get()
	@ApiOkResponse({ type: ActivityEntity, isArray: true })
	async getActivities(): Promise<ActivityEntity[]> {
		return this.queryBus.execute(new GetActivitiesQuery());
	}
}
