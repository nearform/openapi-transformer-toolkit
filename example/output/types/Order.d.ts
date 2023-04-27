export interface Id {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface PetId {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface Quantity {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface ShipDate {
	type: string;
	format: string;
}

export interface Statu {
	type: string;
	description: string;
	enum: string[];
}

export interface Complete {
	type: string;
}

export interface Property {
	id: Id;
	petId: PetId;
	quantity: Quantity;
	shipDate: ShipDate;
	status: Statu;
	complete: Complete;
}

export interface Order {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}