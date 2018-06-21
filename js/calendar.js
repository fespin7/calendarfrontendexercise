


function renderCalendar(selectedDate, daysToAdd){
	debugger
	var monthNames = ["January", "February", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"];

	var firstDay = new Date(selectedDate);

	if(!isValidDate(firstDay)){
	  alert("Please specify a valid date.");
	  return;
	}

	var lastDay = new Date(firstDay);
	lastDay.setDate(lastDay.getDate() + daysToAdd);

	var monthsToDisplay = getMonths(firstDay, lastDay);

	$('#calendar').html("");

	//Iterate through months to display
	$.each(monthsToDisplay, function( i, month ) {

		var monthDescription = monthNames[month.getMonth()] + " " + month.getFullYear();
		var dvMonth = $('<div>', {class: 'month'});
		var dvMonthTitle = $('<div>', {class: 'month-title', text: monthDescription});
		dvMonth.append(dvMonthTitle);

		var dayheaders = '<div class="day header">' + 
						 'S M T W T F S'.split(' ').join('</div><div class="day header">') + 
						 '</div>';

		var dvWeekHeader = $('<div>', {class: 'week', html: dayheaders});

		dvMonth.append(dvWeekHeader);

		var monthWeeks = generateMonth(month.getFullYear(), month.getMonth(), firstDay, lastDay);


		$.each(monthWeeks, function( j, week ) {
	  		
			var dvWeek = $('<div>', {class: 'week'});

			$.each(week, function( k, day ) {

				var dayClass = "day out";
				var dayOfMonth = "&nbsp;";

				if(day.isInMonth)
				{
					if(day.isInRange){

						dayOfMonth = day.date.getDate();

						if(day.isWeekend)
							dayClass = "day weekend";
						else
							dayClass = "day midweek";
					}
				}
	  		
				var dvDay = $('<div>', {class: dayClass, html: dayOfMonth});
				dvWeek.append(dvDay);

			});

			dvMonth.append(dvWeek);

		});

		$('#calendar').append(dvMonth);
			

	});
	
}


//Function to generate a month structure given year,mont and 
//selected date range
function generateMonth(year, month, firstSelDay, lastSelDay){
	
	var result = [];

	//Get first and last day of month
	var firstDayOfMonth = new Date(year, month, 1);
	var lastDayOfMonth = new Date(year, month + 1, 0);

	//Get nearest last sunday before month and nearest next saturday
	//after month to complete remaining day positions in calendar visulization 
	var lastSunday = getLastSunday(firstDayOfMonth);
  	var nextSaturday = getNextSaturday(lastDayOfMonth);
  	
	var currentDay = new Date(lastSunday); // To iterate through days of month
  	var week = []; //array for days of week
  
    // iterate from last sunday before month
    // to next saturday after month
  	while (currentDay <= nextSaturday) {

  		// add day
		week.push({
    		date: new Date(currentDay),
      		isInMonth: (currentDay >= firstDayOfMonth && currentDay <= lastDayOfMonth), // flag if day is within the month
      		isInRange: (currentDay >= firstSelDay && currentDay <= lastSelDay), // flag if day is within the selected range
      		isWeekend: (currentDay.getDay() == 0 || currentDay.getDay() == 6), // flag if day is weekend
    	});

		if (currentDay.getDay() === 6) {
    		// add week and start new one when it is saturday
    		result.push(week);
    		week = [];
		}

		// iterate to next day
		currentDay.setDate(currentDay.getDate() + 1);
	}
  	return result;

}


//Get distinct months between two given dates
function getMonths(startDate, endDate){
	var firstDayIterate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
	var lastDayIterate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
	var iterateDate = new Date(firstDayIterate);
	var months = [];

	while (iterateDate <= lastDayIterate) {

  		// add month to array
		months.push(new Date(iterateDate));

		// iterate to next month
		iterateDate.setMonth(iterateDate.getMonth() + 1);
	}

	return months;

}


//Get last sunday from a given date
function getLastSunday(d) {
	var result = new Date(d);
	result.setDate(result.getDate() - result.getDay());
	return result;
}

//Get next saturday from a given date
function getNextSaturday(d) {
	var daysRemaining = 6 - d.getDay(d);
	var result = new Date(d);
	result.setDate(result.getDate() + daysRemaining);
	return result;
}

//Verify if given date is valid
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
