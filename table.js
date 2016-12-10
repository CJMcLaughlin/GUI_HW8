/*
Name: Connor McLaughlin
CS Username: cmclaugh
Email: Connor_McLaughlin@student.uml.edu
Student ID: 01372970

*/


/*Global for the number of tabs */
var num_tabs = 0;

/*Wait until the page is ready to load. */
$(document).ready(function(){
	
	/*When you load the page make a default table of 10x10 */
	
	/*Call tab initializer */
	$("#tabs").tabs();
	

	/*Set up data validator*/
	$("#data").validate({
		rules: {
			/*Rules for all */
			x_start: {
				required:true,
				digits:true,
				range: [0, 15]
			},
			x_end:   {
				required: true,
				digits: true,
				range: [0, 15]
			},
			y_start: {
				required: true,
				digits: true,
				range: [0, 15]
			},
			y_end:   {
				required: true,
				digits: true,
				range: [0, 15]
			}
		},
		/*Custom messages for all inputs */
		messages: {
			x_start:  {
				required: "This field is required",
				digits: "This field requires positive digits",
				range: "this field has a min value of 0 and a max of 150"
			},
			x_end:    {
				required: "This field is required",
				digits: "This field requires positive digits",
				range: "this field has a min value of 0 and a max of 150"
			},
			y_start:  {
				required: "This field is required",
				digits: "This field requires positive digits",
				range: "this field has a min value of 0 and a max of 150"
			},
			y_end:    {
				required: "This field is required",
				digits: "This field requires positive digits",
				range: "this field has a min value of 0 and a max of 150"
			}
		},
	});
	/* Initializes Sliders */
	init_sliders();

	

	/* Stops page from refreshing */	
	$("#data").on("submit", function() {
		return false;
	});
	/*If the data is valid its okay to call tabTable function  */
	$("#data .btn").click(function(){
		if(!$("#data").valid()){
			return;
		}
		tabTable();
	/* Delete the tab on double click */	
		$("#tabs li").on("dblclick", function(){
			/*Dont delete the instruction tab */
		    if($(this).is("#instruct"))
		    	return;
		    /* Get its associated data and delete that too*/
		    var id = $(this).attr('id'); 
		    $(this).remove();
		    $("#tabs-" + id.slice(-1)).remove();
		    
		});
	});
	
});
/* Adds new tab and puts in table */
function tabTable(){
	/*There is one more tab */
	num_tabs++;
	/*Sets up code to make a new tab list object */
	var new_tab = "<li id=\"t" + num_tabs +"\"><a href=\"#tabs-" + num_tabs + "\">Table "+ num_tabs + "</a></li>";
	/*Put that at the end of the list */
	$("#tabs ul").append(new_tab);
	

	/* Add the data to the tab including the code to create the table */
	var tab_info = "<div id=\"tabs-" + num_tabs + "\">" + createTable() + "</div>";
	/* Refresh the tabs */
	$("#tabs").tabs("refresh");

}
function createTable() {
	/*Variable which will contain table element */
	/* Before the table was part of the html but now it has to be in here for the tabs */
	var table= "<table id=\"mult_table\" border=\"1\"><tr>";
	/*Counters */
	var i,j,k;
	/* Flag indicating first runthrough */
	var go = true;
	var temp;


	/* Sets the x and y variables equal to the values in the forms */
	xStart = Number(document.getElementById("x_start").value);
	xEnd = Number(document.getElementById("x_end").value);

	if(xStart > xEnd){
		temp = xEnd;
		xEnd = xStart;
		xStart = temp; 
	}

	yStart = Number(document.getElementById("y_start").value);
	yEnd = Number(document.getElementById("y_end").value);

	if(yStart > yEnd){
		temp = yEnd;
		yEnd = yStart;
		yStart = temp; 
	}


	/* If the input fails exception handling exit the program */

	/*Start at the row start stop when you get to the row stopping point */
	for(i = yStart; i <= yEnd; i++){
		/* If this is the first run through we need to format the first row co
		   correctly  */
		if(i==yStart){
				table+="<td>XX</td>";
				for(k = xStart; k <= xEnd;k++){
					table += "<td>"+k+"</td>";
				}
				table += "</tr>"
			}
		/*Otherwise just add a need row object and the first object in the
		  collumn */    
		else{   
			table += "<tr><td>" + i + "</td>";
		}
		/* While you still need to add collumns add collumns */
		for(j = xStart; j <= xEnd; j++){
			/* IF this is the very first run through we need to print the value */
			if(go){
				table += "<td>" + yStart + "</td>";
				go=false;
			}
			/* print the product of the coordinates */
			table += "<td>" + (i*j) + "</td>";
		}
		/* finish the row */
		table += "</tr>"


	}

	return table + "</table>";
	


}

function init_sliders(){
	/* Set all sliders to have a min of 0 and max of 15.*/
	/* Make sure the text box changes on slide */
	$("#slider_x_start").slider({
		min: 0,
		max: 15,
		value: parseInt($("#x_start").val()),
		slide: function(e, ui) {
			$("#x_start").val(ui.value);
		}
	});
	$("#slider_x_end").slider({
		min: 0,
		max: 15,
		value: parseInt($("#x_end").val()),
		slide: function(e, ui) {
			$("#x_end").val(ui.value);
		}
	});
	$("#slider_y_start").slider({
		min: 0,
		max: 15,
		value: parseInt($("#y_start").val()),
		slide: function(e, ui) {
			$("#y_start").val(ui.value);
		}
	});
	$("#slider_y_end").slider({
		min: 0,
		max: 15,
		value: parseInt($("#y_end").val()),
		slide: function(e, ui) {
			$("#y_end").val(ui.value);
		}
	});
	/* Make sure the slider changes on text input */
	$("#x_start").on("keyup", function(){
		$("#slider_x_start").slider("value", parseInt($("#x_start").val()));
	});
	$("#x_end").on("keyup", function(){
		$("#slider_x_end").slider("value", parseInt($("#x_end").val()));
	});
	$("#y_start").on("keyup", function(){
		$("#slider_y_start").slider("value", parseInt($("#y_start").val()));
	});
	$("#y_end").on("keyup", function(){
		$("#slider_y_end").slider("value", parseInt($("#y_end").val()));
	});

}