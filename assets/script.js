$(document).ready(function(){
 
  var currentDate = moment().format('MMMM Do YYYY');


  // current date displayed
  var $date = $("#navbar-subtitle");
      var $date = $date.text(currentDate);
   
   
   
    //get storage
   var storedPlans = JSON.parse(localStorage.getItem("storedPlans", storedPlans));
   if (storedPlans !== null) {
     planTextArr = storedPlans;
   } else {
     planTextArr = new Array;
   }
    
   var $plannerDiv = $("#planner");
    // for loop
    for (hour = 9; hour <= 17; hour++) {
        index = hour - 9;
    
    // create row div 
    var $rowDiv = $("<div>");
        $rowDiv.addClass('row');
        $rowDiv.addClass('plannerRow');
        $rowDiv.attr('hour-index',hour);
        $rowDiv.appendTo($plannerDiv)

    // time box
    var $timeBoxDiv = $('<div>');
        $timeBoxDiv.addClass('col-md-2');
    var $timeBoxSpan = $('<span>');
        $timeBoxSpan.attr('class','timeBox')

    // format hours for display
       var $displayTime = 0
       var $timeDay = "";
       if (hour > 12){
           $displayTime = hour - 12
           $timeDay = "pm";
       } else {
           $displayTime = hour;
           $timeDay = "am";
        }
    // time box displayed
    $timeBoxSpan.text(`${$displayTime} ${$timeDay}`);
    $rowDiv.append($timeBoxDiv);
    $timeBoxDiv.append($timeBoxSpan);

    // create input 
    var $inputDiv = $("<input>");
    $inputDiv.attr('id',`input-${index}`);
    $inputDiv.attr('hour-index',index);
    $inputDiv.attr('type','text');
    $inputDiv.attr('class', 'col-md-6')

    // access index from data array
    $inputDiv.val( planTextArr[index]);
     $rowDiv.append($inputDiv);

    // Save div
    var $saveDiv = $('<div>');
    $saveDiv.addClass('col-md-1');
    //save btn
    var $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save");
    //append
    $rowDiv.append($saveDiv);
    $saveDiv.append($saveBtn);
  
    // planner container
    $plannerDiv.append($rowDiv);
  };

  // saves to local storage
  $(document).on('click','i', function(event) {
    event.preventDefault();  


    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });   

});