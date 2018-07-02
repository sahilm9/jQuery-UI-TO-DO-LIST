$(function() {
  // A function to calculate day as string
  let days = day => {
    // Store the days as strings in array
    let weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    // return the string at index which is called
    return weekdays[day];
  };
  // A function to calculate month as string
  let month = monthIndex => {
    // Store the months as strings in array
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    // return the string at index which is called
    return months[monthIndex];
  };
  // function to calculate day and number of days from the day
  let getDates = (startDate, daysToAdd) => {
    // create an empty array which will contain information of days
    let daysInfo = [];
    // loop till number of days to calculate
    for(var i = 0; i < daysToAdd; i++) {
      // store the date object in a variable
      let currentDate = new Date();
      // get date which will be incremented for every loop
      currentDate.setDate(startDate.getDate() + i);
      // add the day, date, month, year information to the array
      daysInfo.push(`${days(currentDate.getDay())} ${currentDate.getDate()} ${month(currentDate.getMonth())} ${currentDate.getFullYear()}`);
      }
    // return the array with information of days
    return daysInfo;
  };
  // initialize a variable with date object which includes information of today
  let startDate = new Date();
  // call getDates function with today date obj and number of days to be calculated and store the result in variable
  let arrayOfDates = getDates(startDate, 7);
    // create an Array from elements with class of .listTitle and store it in array
    let liArrays = Array.from(document.querySelectorAll('.listTitle'));
    // loop till length of arrayOfDates
    for(let i=0; i<arrayOfDates.length;i++){
        // assign innertext property to value at current index(information about day, date, month, year)
        liArrays[i].innerText = arrayOfDates[i];
    }
    // make ul of todoList sortable
    $('#todoList ul').sortable({
        // items we don't want to sort
        items: "li:not('.listTitle, .addItem')",
        // make all ul's connectable with all other
        connectWith: "ul",
        // make drop on empty ul possible
        dropOnEmpty: true,
        // a class styled in css
        placeholder: "emptySpace"
    });
    // check for keydown on input, event
    $('input').keydown(function(e) {
        // check if return(enter) is hit, 13 is keycode for it
        if(e.keyCode === 13) {
            // assign input.val to a variable
            var item = $(this).val();
            // if it is not empty, do the following
            if(item !== ''){
              // jump from input to li, li to ul and then append
              $(this).parent().parent().append(`<li class='todo-item'>${item}</li>`);
              // clear input after append
              $(this).val('');
            }
        }
    }).focus(function(){ // check for focus
      // after focus, if mouse moves out of input
      $(this).mouseout(function(){
        // clear the input
        $(this).val('');
      });
    });
    // make trash droppable
    $('#trash').droppable({
        drop: function(event, ui) {
            // delete the item
            ui.draggable.remove();
        }
    });
});
