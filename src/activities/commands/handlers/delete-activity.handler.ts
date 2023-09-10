import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import DeleteActivityCommand from '../impl/delete-activity.command';
import { PrismaService } from 'src/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(DeleteActivityCommand)
export class DeleteActivityHandler
	implements ICommandHandler<DeleteActivityCommand>
{
	constructor(private readonly prisma: PrismaService) {}

	async execute(command: DeleteActivityCommand): Promise<any> {
		try {
			const activity = await this.prisma.activity.delete({
				where: { id: command.activityId },
			});
			return activity;
		} catch (error) {
			console.log('error', error);
			throw new RpcException(error);
		}
	}
}
