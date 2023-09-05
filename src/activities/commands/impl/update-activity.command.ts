import { UpdateActivityDto } from 'src/activities/dtos';

export default class UpdateActivityCommand {
	constructor(
		public readonly activityId: number,
		public readonly updateActivityDto: UpdateActivityDto,
	) {}
}
