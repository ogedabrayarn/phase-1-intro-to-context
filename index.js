// Your code here
function createEmployeeRecord(array) {
	let records = {
		firstName: array[0],
		familyName: array[1],
		title: array[2],
		payPerHour: array[3],
		timeInEvents: [],
		timeOutEvents: []
	};
	return records;
}
function createEmployeeRecords(array) {
	const records = array.map(data => createEmployeeRecord(data));
	return records;
}
function createTimeInEvent(employeeRecord, dateStamp) {
	const [date, hour] = dateStamp.split(" ");
	employeeRecord.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(hour, 10),
		date
	});
	return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateStamp) {
	const [date, hour] = dateStamp.split(" ");
	employeeRecord.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(hour, 10),
		date
	});
	return employeeRecord;

}
function hoursWorkedOnDate(employeeRecord, specificDate) {
	let timeInEvent = employeeRecord.timeInEvents.find(
		(event) => event.date === specificDate
	);
	let timeOutEvent = employeeRecord.timeOutEvents.find(
		(event) => event.date === specificDate
	);
	let totalTimeWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
	return totalTimeWorked;
}
function wagesEarnedOnDate(employeeRecord, specificDate) {
	return parseFloat(
		hoursWorkedOnDate(employeeRecord, specificDate) *
			employeeRecord.payPerHour.toString()
	);
}
function allWagesFor(employeeRecord) {
	let payDates = employeeRecord.timeInEvents.map((e) => e.date);
	let payOwedAllDates = payDates.reduce((allInfo, dates) => {
		return allInfo + wagesEarnedOnDate(employeeRecord, dates);
	}, 0);
	return payOwedAllDates;
}
function calculatePayroll(employeeRecord) {
	let empRecords = employeeRecord.reduce((allInfo, datesRecords) => {
		return allInfo + allWagesFor(datesRecords);
	}, 0);
	return empRecords;
}