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
				...students?.map((student) => ({
					userId: student.userId,
					userName: student.userName,
					role: UserRole.STUDENT,
				})),
				...moderators?.map((moderator) => ({
					userId: moderator.userId,
					userName: moderator.userName,
					role: UserRole.MODERATOR,
				})),
			];

			// Fetch the current activityUsers associated with the activity
			const currentActivityUsers = await this.prisma.activityUser.findMany({
				where: { activityId: command.activityId },
				include: { user: true }, // Include the user to get the userName
			});

			// Find users to delete
			const usersToDelete = currentActivityUsers.filter(
				(user) =>
					!activityUsers.some(
						(updatedUser) => updatedUser.userId === user.userId,
					),
			);

			const usersToDeleteIds = usersToDelete.map((user) => user.id);

			// Batch delete the users
			await this.prisma.activityUser.deleteMany({
				where: { id: { in: usersToDeleteIds } },
			});

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
							where: {
								activityId_userId: {
									activityId: command.activityId,
									userId: activityUser.userId,
								},
							},
							update: {
								user: {
									connect: { id: activityUser.userId },
									update: {
										userName: activityUser.userName,
										role: activityUser.role,
									},
								},
							},
							create: {
								activityId: command.activityId,
								user: {
									connectOrCreate: {
										where: { userId: activityUser.userId },
										create: {
											userId: activityUser.userId,
											userName: activityUser.userName,
											role: activityUser.role,
										},
									},
								},
							},
						})),
					},
				},
				include: {
					activityUsers: {
						include: { user: true }, // Include the user to get the userName
					},
				},
			});

			// Adjust the returned activity to include the userName in the ActivityUser
			activity.activityUsers = activity.activityUsers.map((au) => ({
				...au,
				userName: au.user.userName,
			}));

			console.log('HERE');
			console.log('activity', activity);
			return new ActivityEntity(activity);
		} catch (error) {
			console.log('error', error);
			throw new RpcException(error);
		}
	}
}
