import {Col, Flex, Row, Typography} from "antd";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {Employee} from "../types/employee.ts";

const EmployeeCard = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [employee, setEmployee] = useState<Employee | null>(null);

	useEffect(() => {
		if(!id) navigate("/");
		const getEmployee = async () => {
			const employee = await fetch(`${import.meta.env.VITE_API_URL}/employee?`  + new URLSearchParams({
				id: id ? id.toString() : '',
			}));

			const employeeJson = await employee.json();

			setEmployee(employeeJson);
		}
		getEmployee().catch(e => console.error(e));
	}, []);
	return (
		<>
			<Row>
				<Col xl={{offset: 6}} md={{offset: 3}} xs={{offset: 1}}>
					<Flex wrap={true} justify={'center'} gap={50}>
							{
								employee?.photo ?
									<img width={180} height={180} src={`data:image/jpg;base64,${employee.photo}`} alt=""/> :
									<img width={180} height={180} src="/unknown.png" alt=""/>
							}
							<Flex vertical>
								<Typography.Title level={3}>{employee?.firstName ? `${employee?.lastName} ${employee?.firstName} ${employee?.middleName}` : ''}</Typography.Title>
								<Typography.Text>Дата рождения: {
									employee?.birthDate ?
										`${new Date(employee?.birthDate).getDate()}.${new Date(employee?.birthDate).getMonth()+1}.${new Date(employee?.birthDate).getFullYear()}` :
										'-'}</Typography.Text>
								<Typography.Text>Департамент: {employee?.department ? employee.department : '-'}</Typography.Text>
								<Typography.Text>Должность: {employee?.post ? employee.post : '-'}</Typography.Text>
							</Flex>
					</Flex>
				</Col>

			</Row>
		</>
	);
};

export default EmployeeCard;