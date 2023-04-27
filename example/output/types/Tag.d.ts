export interface Id {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface Name {
	type: string;
}

export interface Property {
	id: Id;
	name: Name;
}

export interface Tag {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}