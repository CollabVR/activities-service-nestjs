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
import { MessagePattern } from '@nestjs/microservices';

@Controller('activities')
export class ActivitiesController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@MessagePattern('create-activity')
	createAccount(data: {
		createActivityDto: CreateActivityDto;
	}): Promise<ActivityEntity> {
		console.log();
		console.log('createActivity', data.createActivityDto);
		return this.commandBus.execute(
			new CreateActivityCommand(data.createActivityDto),
		);
	}
	@MessagePattern('get-activities')
	async getActivities(): Promise<ActivityEntity[]> {
		return this.queryBus.execute(new GetActivitiesQuery());
	}

	@MessagePattern('get-activity-by-id')
	async getActivityById({ id }): Promise<ActivityEntity> {
		return this.queryBus.execute(new GetActivityByIdQuery(id));
	}
	@MessagePattern('delete-activity-by-id')
	async deleteActivityById({ id }): Promise<ActivityEntity> {
		return this.commandBus.execute(new DeleteActivityCommand(id));
	}
	@MessagePattern('update-activity-by-id')
	async updateActivityById({ id, updateActivityDto }): Promise<ActivityEntity> {
		console.log('updateActivityDto', updateActivityDto);
		return this.commandBus.execute(
			new UpdateActivityCommand(id, updateActivityDto),
		);
	}
	@MessagePattern('get-activity-by-name')
	async getActivityByName({ name }): Promise<ActivityEntity> {
		return this.queryBus.execute(new GetActivityByNameQuery(name));
	}
}
