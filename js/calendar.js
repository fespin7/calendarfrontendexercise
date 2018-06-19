


function renderCalendar(selectedDate, daysToAdd){

	var firstDay = new Date(selectedDate);

	if(!isValidDate(firstDay)){
	  alert("Please specify a valid date.");
	  return;
	}

	var lastDay = new Date();
	lastDay.setDate(firstDay.getDate() + daysToAdd);
	

	/*console.log(getLastSunday(firstDay));
	console.log(getNextSaturday(firstDay));
	*/

	generateMonth(2018, 5, firstDay, lastDay)
}


//Function to generate a month structure given year,mont and 
//selected date range
function generateMonth(year, month, firstSelDay, lastSelDay){
	
	var result = [];

	//Get first and last day of month
	var firstDayOfMonth = new Date(year, month, 1);
	var lastDayOfMonth = new Date(year, month + 1, 0);

	//Get nearest last sunday before month and nearest next saturday
	//after month to complete number of day positions in calendar visulization 
	//for a month
	var lastSunday = getLastSunday(firstDayOfMonth);
  	var nextSaturday = getNextSaturday(lastDayOfMonth);

  	// To iterate through days of month
	var currentDay = new Date(lastSunday);

  	var isInMonth = false; //Flag to know if day is within the month
  	var isInRange = false; //Flag to know if day is within the selected days range
  	var isWeekend = false; //Flag to know if day is in weekend

  	var week = []; //array for days of week
  
    // iterate from last sunday before month
    // to next saturday after month
  	while (currentDay <= nextSaturday) {

		if (currentDay.getDay() === 0) {
    		// add week and start new one when it is sunday
    		if(week.length > 0)
    			result.push(week);

    		week = [];
		}

    
    	// add day
		week.push({
    		date: new Date(currentDay),
      		isInMonth: (currentDay >= firstDayOfMonth && currentDay <= lastDayOfMonth), // flag if day is within the month
      		isInRange: (currentDay >= firstSelDay && currentDay <= lastSelDay), // flag if day is within within the selected range
      		isWeekend: (currentDay.getDay() == 0 || currentDay.getDay() == 6), // flag if day is weekend
    	});

		// iterate to next day
		currentDay.setDate(currentDay.getDate() + 1);
	}
  	return result;

}


function getLastSunday(d) {
	var result = new Date(d);
	result.setDate(result.getDate() - result.getDay());
	return result;
}

function getNextSaturday(d) {
	var daysRemaining = 6 - d.getDay(d);
	var result = new Date(d);
	result.setDate(result.getDate() + daysRemaining);
	return result;
}


function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
