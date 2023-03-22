
export class Channel	 {
	id: number | undefined;
	name: string = '';
	title: string = '';
	pwd: string = '';
	isPrivate: boolean = false;
	isProtected: boolean = false;

	constructor(initializer?: any) {
		if (!initializer) return;
		if (initializer.id) this.id = initializer.id;
		if (initializer.name) this.name = initializer.name;
		if (initializer.title) this.title = initializer.title;
	    if (initializer.isPrivate) this.isPrivate = initializer.isActive;
	    if (initializer.isProtected) this.isProtected = initializer.isActive;
	}
}