import {Col, Row, Table, TableColumnType, Input, Typography, Pagination} from "antd";
import {ChangeEvent, useEffect, useState} from "react";
import {Employee} from "../types/employee.ts";
import {NavLink} from "react-router";

function Employees() {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [totalEmployees, setTotalEmployees] = useState(0);
	const [selectedPage, setSelectedPage] = useState(1);
	const [fullName, setFullName] = useState("");

	const changePage = (page: number) => {
		setSelectedPage(page);
	}

	const changeFullName = (event: ChangeEvent<HTMLInputElement>) => {
		setFullName(event.target.value);
	}

	useEffect(() => {
		const getEmployees = async () => {
			const employees = await fetch(`${import.meta.env.VITE_API_URL}/employees?` + new URLSearchParams({
				page: selectedPage.toString(),
			}));

			const employeesJson = await employees.json();

			setTotalEmployees(Math.ceil(employeesJson.pages * employeesJson.pageSize));

			setEmployees(employeesJson.filteredEmployees.map((el: Employee, index: number) => ({
				fullName: `${el.lastName} ${el.firstName} ${el.middleName}`,
				department: el.department,
				post: el.post,
				key: index,
				id: el.id,
			})));
		}
		getEmployees().catch(e => console.error(e));
	}, [selectedPage]);

	useEffect(() => {
		const getFilteredEmployees = async () => {
			setSelectedPage(1);
			const employees = await fetch(`${import.meta.env.VITE_API_URL}/employees?` + new URLSearchParams({
				page: selectedPage.toString(),
				name: fullName.trim().toLowerCase(),
			}));

			const employeesJson = await employees.json();

			setTotalEmployees(Math.ceil(employeesJson.pages * employeesJson.pageSize));

			setEmployees(employeesJson.filteredEmployees.map((el: Employee, index: number) => ({
				id: el.id,
				fullName: `${el.lastName} ${el.firstName} ${el.middleName}`,
				department: el.department,
				post: el.post,
				key: index,
			})));
		}
		getFilteredEmployees().catch(e => console.error(e));
	}, [fullName]);

	const columns: TableColumnType[] = [
		{
			title: 'Ф.И.О',
			dataIndex: 'fullName',
			key: 'fullName',
			width: '33%',
			render: (text, record) => <NavLink to={`/employee/${record.id}`}>{text}</NavLink>,
		},
		{
			title: 'Департамент',
			dataIndex: 'department',
			key: 'department',
			width: '33%',
		},
		{
			title: 'Должность',
			dataIndex: 'post',
			key: 'post',
			width: '33%',
		},
	];

	return (
    <>
			<Row>
				<Col xl={{offset: 6, span: 12}} md={{offset: 3, span: 18}} xs={{offset: 1, span: 22}}>
					<Typography.Title level={2}>Работники</Typography.Title>
					<Row>
						<Typography.Title level={5}>Найти: </Typography.Title>
						<Input value={fullName} onInput={changeFullName} placeholder="Введите часть ФИО работника" />
					</Row>
					<Table pagination={false} size={'small'} dataSource={employees} columns={columns} />
					<Pagination align={'end'} onChange={changePage} defaultCurrent={selectedPage} total={totalEmployees} />
				</Col>
			</Row>
		</>
  )
}

export default Employees
