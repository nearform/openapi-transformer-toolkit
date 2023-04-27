export interface Id {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface Name {
	type: string;
}

export interface Category {
	$ref: string;
}

export interface Item {
	type: string;
}

export interface PhotoUrl {
	type: string;
	items: Item;
}

export interface Item {
	$ref: string;
}

export interface Tag {
	type: string;
	items: Item;
}

export interface Statu {
	type: string;
	description: string;
	enum: string[];
}

export interface Property {
	id: Id;
	name: Name;
	category: Category;
	photoUrls: PhotoUrl;
	tags: Tag;
	status: Statu;
}

export interface Pet {
	required: string[];
	type: string;
	properties: Property;
	title: string;
	$id: string;
}