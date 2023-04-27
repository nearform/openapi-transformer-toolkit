export interface Code {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface Type {
	type: string;
}

export interface Message {
	type: string;
}

export interface Property {
	code: Code;
	type: Type;
	message: Message;
}

export interface ApiResponse {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}