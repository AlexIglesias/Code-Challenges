(function(){
	var maxBoxesID = 0;
	var maxRowID = 0;
	var statisticsTotalBoxes = 0;
	var statisticsAddedBoxes = 0;
	var statisticsDeletedBoxes = 0;
	eventReloader();

	var totalBoxes = document.getElementsByClassName("js-box");
	for(var i = 0; i < totalBoxes.length; i++) {
		totalBoxes[i].dataset.id = i + 1;
		totalBoxes[i].getElementsByClassName("header-id")[0].innerHTML = totalBoxes[i].dataset.id = i + 1;
	}
	maxBoxesID = totalBoxes.length + 1;

	var rows = document.getElementsByClassName("js-row");
	for(var i = 0; i < rows.length; i++) {
		rows[i].dataset.id = i + 1;
	}
	maxRowID = rows.length + 1;

 	function eventReloader() {
 		var deleteBoxes = document.getElementsByClassName("delete-box");
		for(var i = 0; i < deleteBoxes.length; i++) {
			deleteBoxes[i].addEventListener("click", deleteBox);
		}
		var totalBoxes = document.getElementsByClassName("js-box");
		for(var i = 0; i < totalBoxes.length; i++) {
			totalBoxes[i].addEventListener("mouseover", mouseOver);
			totalBoxes[i].addEventListener("mouseout", mouseOut);
			totalBoxes[i].addEventListener("click", createBox);
		}
 	}

 	function createBox() {
 		var newBox = document.createElement("div");
		newBox.dataset.id = maxBoxesID;
		newBox.classList.add("js-box");
 		newBox.innerHTML = "<div class='header'>" +
								"<span class='header-id'>" + maxBoxesID + "</span>" +
								"<span class='delete-box'>X</span>" +
							"</div>" +
							"<div class='content'>" +
								"<span class='neighbor-left'></span>" +
								"<span class='neighbor-right'></span>" +
							"</div>";
		maxBoxesID++;
		var nextChild;
		for (var i = 0; i < this.parentElement.children.length; i++) {
			if(this == this.parentElement.children[i]){
				nextChild = this.parentElement.children[i + 1];
			}
		}
		if(nextChild) {
			this.parentNode.insertBefore(newBox, nextChild);
		} else {
			this.parentNode.appendChild(newBox);
		}
		reorderBoxes();
	    showNeighbors();
	    eventReloader();
	    statisticsAddedBoxes++;
		showStats("statisticsAddedBoxes", statisticsAddedBoxes);
		statisticsTotalBoxes = document.getElementsByClassName("js-box").length;
		showStats("statisticsTotalBoxes", statisticsTotalBoxes);
	}

	function deleteBox() {
		var r = confirm("You will go to delete the box with ID: " + this.parentNode.parentNode.dataset.id + " Are you sure?");
	    if (r == true) {
	    	var rowId = this.parentNode.parentNode.parentNode.dataset.id;
			this.parentNode.parentNode.remove();
			reorderBoxes(rowId);
		    showNeighbors();
		    eventReloader();
		    statisticsDeletedBoxes++;
		    showStats("statisticsDeletedBoxes", statisticsDeletedBoxes);
		    statisticsTotalBoxes = document.getElementsByClassName("js-box").length;
			showStats("statisticsTotalBoxes", statisticsTotalBoxes);
	    } 
	}

	function mouseOver() {
	    document.getElementById("container1").style.outline = "10px solid black";
	    document.getElementById("container2").style.outline = "15px solid black";
	}
	function mouseOut() {
	    document.getElementById("container1").style.outline = "none";
	    document.getElementById("container2").style.outline = "none";
	}

	function reorderBoxes() {
		var colors = ["transparent", "#FF0000", "#228B22", "#4682B4"];
		var totalBoxes = document.getElementsByClassName("js-box");
		var totalRows = document.getElementsByClassName("js-row");
		var count = 2;
		var count2 = 0;
		var divContent = "";
		var areMoreBoxes = true;
		for(var i = 0; i < totalRows.length; i++) {
			if(count2 > totalBoxes.length) {
				areMoreBoxes = false;
			}
			if(areMoreBoxes) {
				divContent += "<div class='row js-row'>";
			}
			for(var j = 0; j <= count; j++) {
				if (totalBoxes[count2]) {
					if(totalBoxes[count2] == totalBoxes[totalBoxes.length - 1]){
						divContent += "<div class='box" + (count + 1) + " js-box highlight' data-id='" + totalBoxes[count2].dataset.id + "'>" + totalBoxes[count2].innerHTML + "</div>";
					} else {
						divContent += "<div class='box" + (count + 1) + " js-box' data-id='" + totalBoxes[count2].dataset.id + "' style='background-color: " +  colors[count2%4] + "'>" + totalBoxes[count2].innerHTML + "</div>";
					}
				}
				count2++;
			}
			if(i == totalRows.length - 1){
				if(totalBoxes[count2]){
					var newRow = document.createElement("div");
					newRow.dataset.id = maxRowID;
					newRow.classList.add("row", "js-row");
					totalRows[0].parentNode.insertBefore(newRow, totalRows[totalRows.length]);
				}
			}
			if (count == 0){
				count = 3;
			}
			count--;
			if(areMoreBoxes) {
				divContent += "</div>";
			}
		}
		document.getElementById("container2").innerHTML = divContent;
	}

	showNeighbors();
	function showNeighbors() {
		var rows = document.getElementsByClassName("row");
		for(var i = 0; i < rows.length; i++) {
			var elements = rows[i].getElementsByClassName("js-box");
			for(var j = 0; j < elements.length; j++) {
				if (elements[j-1]) {
					elements[j].getElementsByClassName("neighbor-left")[0].innerHTML = elements[j-1].dataset.id;
				} else {
					elements[j].getElementsByClassName("neighbor-left")[0].innerHTML = "";
				}
				if (elements[j+1]) {
					elements[j].getElementsByClassName("neighbor-right")[0].innerHTML = elements[j+1].dataset.id;
				} else {
					elements[j].getElementsByClassName("neighbor-right")[0].innerHTML = "";
				}
			}
		}
	}

	function showStats(id, statistics) {
		document.getElementById(id).innerHTML = statistics;	
	}
})();

