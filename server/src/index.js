const express = require('express')
const app = express();
const port = 3000;
const employees = require('./mocks/employees.json');
const cors = require('cors')

const pageSize = 10;

app.use(cors());

app.get('/employee', (req, res) => {
	if(!req.query.id) return res.status(200).json({});

	const employee = employees.find(el => el.id === parseInt(req.query.id));

	return res.status(200).json({
		...employee
	});
})


app.get('/employees', (req, res) => {
	if(!req.query.page && !req.query.name) {
		const filteredEmployees = employees;
		return res.json({
			pages: Math.ceil(filteredEmployees.length/pageSize),
			page: 1,
			pageSize,
			filteredEmployees
		});
	}

	const fullNameFilter = req.query.name ? req.query.name : '';

	const filteredEmployees = employees.filter(el => `${el.lastName}${el.firstName}${el.middleName}`.toLowerCase().trim().includes(fullNameFilter));

	let page = 1;
	if(req.query.page) page = +req.query.page;

	return res.status(200).json({
		pages: Math.ceil(filteredEmployees.length/pageSize) || 1,
		page,
		pageSize,
		filteredEmployees: filteredEmployees.slice((page * pageSize) - pageSize, (page * pageSize))
	});
})
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
