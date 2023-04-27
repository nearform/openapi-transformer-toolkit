export interface Street {
	type: string;
}

export interface City {
	type: string;
}

export interface State {
	type: string;
}

export interface Zip {
	type: string;
}

export interface Property {
	street: Street;
	city: City;
	state: State;
	zip: Zip;
}

export interface Address {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}