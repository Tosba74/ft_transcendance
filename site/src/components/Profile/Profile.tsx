export class Profile {
	id: number | undefined;
	login: string = '';
	name: string = '';
	firstname: string = '';
	title: string = '';
	description: string = '';
	gameplay: number | undefined;
	imageUrl: string = '';
	contractTypeId: number | undefined;
	contractSignedOn: Date = new Date();
	isActive: boolean = false;
}
