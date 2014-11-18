$(document).on("mobileinit", function () {
	//settings and stuff
	alert("mobileinit");
});

$(document).on("ready", function (ev) {
	//page is ready to do stuff like have event listeners on buttons

	for (var i = 1; i <= 10; i++) {
		var $dialog = $('#dialogTemp').clone(true);

		var idD = "dialog" + i;
		var idNext = "#dialog" + (i + 1);
		var idPrev = "#dialog" + (i - 1);
		$dialog.attr("id", idD);
		$dialog.find("#content p").append(document.createTextNode(" Hello : " + i));
		$dialog.find(".prev").attr("href", idPrev);
		$dialog.find(".next").attr("href", idNext);

		if (i === 1) {
			//$dialog.find(".prev").hide();
			$dialog.find(".prev").remove();

		} else if (i == 10) {
			$dialog.find(".next").remove();
		}

		$("body").append($dialog);
	}

	$(".next").click(function (ev) {
		ev.preventDefault();
		localStorage.setItem("lastSeen", $(this).attr("href"));

		$.mobile.pageContainer.pagecontainer("change", $(this).attr("href"), {
			changeHash: false,
			role: "dialog"
		});
		
	});

	$(".prev").click(function (ev) {
		ev.preventDefault();
		localStorage.setItem("lastSeen", $(this).attr("href"));

		$.mobile.pageContainer.pagecontainer("change", $(this).attr("href"), {
			changeHash: false,
			role: "dialog"
		});
	});

	$("#startbtn").on("click", function (ev) {
		
		var lastSeenId = localStorage.getItem("lastSeen");
		
		if (!lastSeenId) {
			lastSeenId = "#dialog1";
		}
		$("#startbtn").attr("href",lastSeenId);
	});
});