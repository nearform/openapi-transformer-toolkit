export interface Id {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface Username {
	type: string;
}

export interface Item {
	$ref: string;
}

export interface Addres {
	type: string;
	items: Item;
}

export interface Property {
	id: Id;
	username: Username;
	address: Addres;
}

export interface Customer {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}