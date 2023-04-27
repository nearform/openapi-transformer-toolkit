/* tslint:disable */
/**
 * This file was automatically generated by oas-codegen CLI.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run oas-codegen CLI to regenerate this file.
 */
 
 export interface Id {
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

export interface User {
	type: string;
	properties: Property;
	title: string;
	$id: string;
}