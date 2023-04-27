/* tslint:disable */
/**
 * This file was automatically generated by oas-codegen CLI.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run oas-codegen CLI to regenerate this file.
 */
 
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