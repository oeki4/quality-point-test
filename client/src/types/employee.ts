export interface Employee {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	birthDate: Date;
	department: string;
	post: string;
	salary: number;
	photo: string | undefined;
}