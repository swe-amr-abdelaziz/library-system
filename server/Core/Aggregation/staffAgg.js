const { calculateAge } = require('../Utilities/utilities');

exports.filter = request => {
	const startDate = request.query.minHireDate
		? new Date(`${request.query.minHireDate}T00:00:00Z`)
		: new Date('1900-01-01');
	const endDate = request.query.maxHireDate
		? new Date(`${request.query.maxHireDate}T23:59:59Z`)
		: new Date('2099-12-31');

	let filter = {
		firstName: { $regex: request.query.firstName || '', $options: 'i' },
		lastName: { $regex: request.query.lastName || '', $options: 'i' },
		email: { $regex: request.query.email || '', $options: 'i' },
		gender: request.query.gender,
		salary: {
			$gte: Number(request.query.minSalary) || 0,
			$lte: Number(request.query.maxSalary) || 999999
		},
		age: {
			$gte: Number(request.query.minAge) || 0,
			$lte: Number(request.query.maxAge) || 999
		},
		hireDate: {
			$gte: startDate,
			$lte: endDate
		}
	};

	if (!request.query.gender) {
		delete filter.gender;
	}
	return filter;
};

exports.sort = request => {
	let order = 1;
	if (request.query.order === 'desc') {
		order = -1;
	}

	switch (request.query.sort) {
		case 'firstName':
			return { firstName: order };
		case 'lastName':
			return { lastName: order };
		case 'fullName':
			return { firstName: order, lastName: order };
		case 'email':
			return { email: order };
		case 'age':
			return { age: order };
		case 'hireDate':
			return { hireDate: order };
		case 'salary':
			return { salary: order };
		default:
			return { id: order };
	}
};

exports.allStaffProjection = {
	_id: 0,
	id: '$_id',
	firstName: 1,
	lastName: 1,
	email: 1,
	gender: 1,
	image: 1,
	hireDate: 1,
	salary: 1,
	age: calculateAge
};

exports.oneStaffProjection = {
	_id: 0,
	id: '$_id',
	firstName: 1,
	lastName: 1,
	email: 1,
	gender: 1,
	image: 1,
	age: calculateAge
};