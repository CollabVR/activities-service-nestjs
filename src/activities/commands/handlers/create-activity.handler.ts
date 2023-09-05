import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateActivityCommand } from '../impl/create-activity.command';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityEntity } from 'src/activities/domain/activity.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(CreateActivityCommand)
export class CreateActivityHandler
	implements ICommandHandler<CreateActivityCommand>
{
	constructor(private readonly prisma: PrismaService) {}

	async execute(command: CreateActivityCommand): Promise<ActivityEntity> {
		try {
			const startingTime = new Date(command.createActivityDto.startingTime);
			const endingTime = new Date(command.createActivityDto.endingTime);
			const durationMilliseconds =
				endingTime.getTime() - startingTime.getTime();
			const durationTime = Math.floor(durationMilliseconds / (60 * 1000));

			const activity = this.prisma.activity.create({
				data: {
					name: command.createActivityDto.name,
					description: command.createActivityDto.description,
					startingTime: command.createActivityDto.startingTime,
					endingTime: command.createActivityDto.endingTime,
					durationTime: durationTime,
					maxParticipants: command.createActivityDto.maxParticipants,
					participants: [],
					moderators: [],
					date: command.createActivityDto.date,
					environmentId: command.createActivityDto.environmentId,
					status: 'created',
				},
			});

			return new ActivityEntity(await activity);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new RpcException('Credentials Taken');
				}
			} else {
				throw new RpcException(error.message);
			}
		}
	}
}
