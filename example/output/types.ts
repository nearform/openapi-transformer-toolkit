export interface Id {
	type: string;
}

export interface Name {
	type: string;
}

export interface Surname {
	type: string;
}

export interface Property {
	id: Id;
	name: Name;
	surname: Surname;
}

export interface RootObject {
	type: string;
	properties: Property;
	required: string[];
	title: string;
	$id: string;
}export interface Id {
	type: string;
}

export interface Name {
	type: string;
}

export interface Surname {
	type: string;
}

export interface Property {
	id: Id;
	name: Name;
	surname: Surname;
}

export interface RootObject {
	type: string;
	properties: Property;
	required: string[];
	title: string;
	$id: string;
}