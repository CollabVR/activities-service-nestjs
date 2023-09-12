import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateActivityCommand } from '../impl/create-activity.command';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityEntity } from 'src/activities/domain/activity.entity';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(CreateActivityCommand)
export class CreateActivityHandler
	implements ICommandHandler<CreateActivityCommand>
{
	constructor(private readonly prisma: PrismaService) {}

	async execute(command: CreateActivityCommand): Promise<ActivityEntity> {
		try {
			const activity = this.prisma.activity.create({
				data: {
					name: command.createActivityDto.name,
					description: command.createActivityDto.description,
					startTime: command.createActivityDto.startTime,
					endTime: command.createActivityDto.endTime,
					maxParticipants: command.createActivityDto.maxParticipants,
					environmentId: command.createActivityDto.environmentId,
					status: 'created',
				},
			});

			return new ActivityEntity(await activity);
		} catch (error) {
			throw new RpcException(error);
		}
	}
}
