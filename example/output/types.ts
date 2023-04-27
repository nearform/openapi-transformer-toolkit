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

export interface RootObject {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}export interface Code {
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

export interface RootObject {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}export interface Id {
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

export interface RootObject {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}export interface Id {
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

export interface RootObject {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}export interface Id {
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

export interface RootObject {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}export interface Id {
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

export interface RootObject {
	required: string[];
	type: string;
	properties: Property;
	title: string;
	$id: string;
}export interface Id {
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

export interface RootObject {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}export interface Id {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface Username {
	type: string;
}

export interface FirstName {
	type: string;
}

export interface LastName {
	type: string;
}

export interface Email {
	type: string;
}

export interface Password {
	type: string;
}

export interface Phone {
	type: string;
}

export interface UserStatu {
	type: string;
	description: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface Property {
	id: Id;
	username: Username;
	firstName: FirstName;
	lastName: LastName;
	email: Email;
	password: Password;
	phone: Phone;
	userStatus: UserStatu;
}

export interface RootObject {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}