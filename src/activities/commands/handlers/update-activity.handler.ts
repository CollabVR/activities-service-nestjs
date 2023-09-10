import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import UpdateActivityCommand from '../impl/update-activity.command';
import { RpcException } from '@nestjs/microservices';
import { ActivityEntity } from 'src/activities/domain/activity.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@CommandHandler(UpdateActivityCommand)
export default class UpdateActivityHandler
	implements ICommandHandler<UpdateActivityCommand>
{
	constructor(private readonly prisma: PrismaService) {}
	async execute(command: UpdateActivityCommand): Promise<ActivityEntity> {
		try {
			const activity = await this.prisma.activity.update({
				where: { id: command.activityId },
				data: command.updateActivityDto,
			});
			return new ActivityEntity(activity);
		} catch (error) {
			console.log('error', error);
			throw new RpcException(error);
		}
	}
}
