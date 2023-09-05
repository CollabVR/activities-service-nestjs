import { CreateActivityDto } from 'src/activities/dtos';

export class CreateActivityCommand {
	constructor(public readonly createActivityDto: CreateActivityDto) {}
}
