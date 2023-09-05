import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateActivityCommand } from '../commands/impl/create-activity.command';
import { ActivityEntity } from '../domain/activity.entity';
import { CreateActivityDto, UpdateActivityDto } from '../dtos';
import { GetActivitiesQuery } from '../queries/impl/get-activities.query';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetActivityByIdQuery } from '../queries/impl/get-activity-by-id.query';
import { GetActivityByNameQuery } from '../queries/impl/get-activity-by-name.query copy';
import DeleteActivityCommand from '../commands/impl/delete-activity.command';
import UpdateActivityCommand from '../commands/impl/update-activity.command';

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

	@Get(':id')
	@ApiOkResponse({ type: ActivityEntity, isArray: true })
	async getActivityById(
		@Param('id', ParseIntPipe) id: number,
	): Promise<ActivityEntity> {
		return this.queryBus.execute(new GetActivityByIdQuery(id));
	}

	@Delete(':id')
	@ApiOkResponse({ type: ActivityEntity, isArray: true })
	async deleteActivityById(
		@Param('id', ParseIntPipe) id: number,
	): Promise<ActivityEntity> {
		return this.commandBus.execute(new DeleteActivityCommand(id));
	}

	@Put(':id')
	@ApiOkResponse({ type: ActivityEntity, isArray: true })
	async updateActivityById(
		@Param('id', ParseIntPipe) id: number,
		@Body() UpdateActivityDto: UpdateActivityDto,
	): Promise<ActivityEntity> {
		return this.commandBus.execute(
			new UpdateActivityCommand(id, UpdateActivityDto),
		);
	}

	@Get('/name/:name')
	@ApiOkResponse({ type: ActivityEntity, isArray: true })
	async getActivityByName(
		@Param('name') name: string,
	): Promise<ActivityEntity> {
		return this.queryBus.execute(new GetActivityByNameQuery(name));
	}
}
