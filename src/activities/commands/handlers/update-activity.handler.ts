import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import UpdateActivityCommand from '../impl/update-activity.command';
import { RpcException } from '@nestjs/microservices';
import { ActivityEntity } from 'src/activities/domain/activity.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRole } from '@prisma/client';

@CommandHandler(UpdateActivityCommand)
export default class UpdateActivityHandler
	implements ICommandHandler<UpdateActivityCommand>
{
	constructor(private readonly prisma: PrismaService) {}
	async execute(command: UpdateActivityCommand): Promise<ActivityEntity> {
		console.log('command', command.updateActivityDto);
		try {
			// Extract participants and moderators from the DTO
			const { students, moderators, ...otherFields } =
				command.updateActivityDto;

			// Combine the activityStudents and activityModerators to form activityUsers
			const activityUsers = [
				...students?.map((moderator) => ({
					userId: moderator.id,
					userName: moderator.name,
					role: UserRole.MODERATOR,
				})),
				...moderators?.map((participant) => ({
					userId: participant.id,
					userName: participant.name,
					role: UserRole.STUDENT,
				})),
			];

			// Fetch the current activityUsers associated with the activity
			const currentActivityUsers = await this.prisma.activityUser.findMany({
				where: { activityId: command.activityId },
			});

			// Find users to delete
			const usersToDelete = currentActivityUsers.filter(
				(user) =>
					!activityUsers.some(
						(updatedUser) => updatedUser.userId === user.userId,
					),
			);

			// Delete the users
			for (const user of usersToDelete) {
				await this.prisma.activityUser.delete({
					where: { userId: user.userId },
				});
			}

			// Merge transformed data with other update fields
			const updateData = {
				...otherFields,
				activityUsers: {},
			};

			// Update the activity using Prisma
			const activity = await this.prisma.activity.update({
				where: { id: command.activityId },
				data: {
					...updateData,
					activityUsers: {
						upsert: activityUsers.map((activityUser) => ({
							where: { userId: activityUser.userId },
							update: activityUser,
							create: activityUser,
						})),
					},
				},
				include: {
					activityUsers: true,
				},
			});
			console.log('HERE');
			console.log('activity', activity);
			return new ActivityEntity(activity);
		} catch (error) {
			console.log('error', error);
			throw new RpcException(error);
		}
	}
}
