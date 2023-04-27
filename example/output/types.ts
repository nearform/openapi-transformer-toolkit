export interface AddressStreet {
	type: string;
}

export interface AddressCity {
	type: string;
}

export interface AddressState {
	type: string;
}

export interface AddressZip {
	type: string;
}

export interface AddressProperty {
	street: AddressStreet;
	city: AddressCity;
	state: AddressState;
	zip: AddressZip;
}

export interface AddressRootObject {
	type: string;
	properties: AddressProperty;
	title: string;
	$id: string;
}export interface ApiResponseCode {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface ApiResponseType {
	type: string;
}

export interface ApiResponseMessage {
	type: string;
}

export interface ApiResponseProperty {
	code: ApiResponseCode;
	type: ApiResponseType;
	message: ApiResponseMessage;
}

export interface ApiResponseRootObject {
	type: string;
	properties: ApiResponseProperty;
	title: string;
	$id: string;
}export interface CategoryId {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface CategoryName {
	type: string;
}

export interface CategoryProperty {
	id: CategoryId;
	name: CategoryName;
}

export interface CategoryRootObject {
	type: string;
	properties: CategoryProperty;
	title: string;
	$id: string;
}export interface CustomerId {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface CustomerUsername {
	type: string;
}

export interface CustomerItem {
	$ref: string;
}

export interface CustomerAddres {
	type: string;
	items: CustomerItem;
}

export interface CustomerProperty {
	id: CustomerId;
	username: CustomerUsername;
	address: CustomerAddres;
}

export interface CustomerRootObject {
	type: string;
	properties: CustomerProperty;
	title: string;
	$id: string;
}export interface OrderId {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface OrderPetId {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface OrderQuantity {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface OrderShipDate {
	type: string;
	format: string;
}

export interface OrderStatu {
	type: string;
	description: string;
	enum: string[];
}

export interface OrderComplete {
	type: string;
}

export interface OrderProperty {
	id: OrderId;
	petId: OrderPetId;
	quantity: OrderQuantity;
	shipDate: OrderShipDate;
	status: OrderStatu;
	complete: OrderComplete;
}

export interface OrderRootObject {
	type: string;
	properties: OrderProperty;
	title: string;
	$id: string;
}export interface PetId {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface PetName {
	type: string;
}

export interface PetCategory {
	$ref: string;
}

export interface PetItem {
	type: string;
}

export interface PetPhotoUrl {
	type: string;
	items: PetItem;
}

export interface PetItem {
	$ref: string;
}

export interface PetTag {
	type: string;
	items: PetItem;
}

export interface PetStatu {
	type: string;
	description: string;
	enum: string[];
}

export interface PetProperty {
	id: PetId;
	name: PetName;
	category: PetCategory;
	photoUrls: PetPhotoUrl;
	tags: PetTag;
	status: PetStatu;
}

export interface PetRootObject {
	required: string[];
	type: string;
	properties: PetProperty;
	title: string;
	$id: string;
}export interface TagId {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface TagName {
	type: string;
}

export interface TagProperty {
	id: TagId;
	name: TagName;
}

export interface TagRootObject {
	type: string;
	properties: TagProperty;
	title: string;
	$id: string;
}export interface UserId {
	type: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface UserUsername {
	type: string;
}

export interface UserFirstName {
	type: string;
}

export interface UserLastName {
	type: string;
}

export interface UserEmail {
	type: string;
}

export interface UserPassword {
	type: string;
}

export interface UserPhone {
	type: string;
}

export interface UserUserStatu {
	type: string;
	description: string;
	format: string;
	minimum: number;
	maximum: number;
}

export interface UserProperty {
	id: UserId;
	username: UserUsername;
	firstName: UserFirstName;
	lastName: UserLastName;
	email: UserEmail;
	password: UserPassword;
	phone: UserPhone;
	userStatus: UserUserStatu;
}

export interface UserRootObject {
	type: string;
	properties: UserProperty;
	title: string;
	$id: string;
}