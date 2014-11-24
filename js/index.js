var LOCAL_STORAGE_KEY = "LASTSEEN_PATE0359"
var totalPages=12;
var arrTitle = ["Gather all your ideas",
					  "Begin with an engaging sentence that captures the reader's attention",
					  "Write in a style that you are most comfortable with",
					  "Transition from the introduction into the real content",
					  "Tell your story",
					  "Write in the first person",
					  "Don't restrict yourself to chronological order",
					  "Add some flourish",
					  "Get creative, if that's within the parameters of your assignment",
					  "End with one or more inspiring passages",
					  "Tips"
					 ];

var arrDescription = ["It is the most important thing in autobiography. Reading a few essays that are similar to your subject can give you an idea of the variety of styles and genres in which biographies and autobiographies are written. Get your ideas down in note form or record a brainstorm first. This will help you as you dive into writing.",
					  "Don't start with \"Once upon a time\" or \"I was born in..\" or \"In this essay, I am going to write about my life.\"",
					  "Some good ways of writing your introduction are by narrating a specific event from a first person point of view that reflects the theme of your essay or by describing a certain scenario from a third person point of view.",
					  "End your introduction with a sentence that leaves the reader excited to continue reading and learn more about the subject.",
					  "Get the main chunk of the essay out there. As you write, avoid redundancies, and avoid rambling. Don't write same things over and over again, and stay away from a clinical or dry account. It will bore the readers and will not make concepts any more clear.",
					  "An autobiography is, by definition, an account about the author himself, so for the most straight-forward autobiographical essay, be personal and stick to the first person.",
					  "This isn't always the best way to successfully tell your story. Go through a few different perspectives and organizational patterns before you pick one, keeping in mind that your first idea may not be the best strategy.",
					  "You might include some dramatic action in the story you're telling to help keep the reader hooked, or you can include some quotes related to your experience or the topic at hand.",
					  "In some creative writing classes, you might be assigned to write an autobiography while pretending to be another person, object, or animal. If so, put yourself in the position of an animal or an inanimate object and imagine the things it would see, say, or think if it were alive.",
					  "Autobiographies are about handing over your life to someone and saying, \"This is what I went through, this is who I am, and maybe you can learn something from it.\" Many autobiographies end with the author summing up her insights into her own life in a few paragraphs. The tone is often uplifting and helps readers feel hopeful about life and the world in general."
					 ];

var arrTips=["When writing a personal statement about your life, it’s best to be simple and stay straightforward. Avoid using five words where three will do.",
			"If you have to use a thesaurus, chances are the reader’s not going to know exactly what the words mean so stick with simple vocabulary.",
			 "Just be yourself, not who you think the judges want you to be. Your personal statement is an autobiography that speaks about your life, your experiences, and your reflections, so remember to tell the truth.",
			 "Don’t have to make up situations or add fluff to tell a poignant story.",
			];

$(document).on("mobileinit", function () {
	//settings and stuff
	alert("mobileinit");
});

$(document).on("ready", function (ev) {
	//page is ready to do stuff like have event listeners on buttons
	for (var i = 1; i <= totalPages; i++) {
		var $dialog = $('#dialogTemp').clone(true);

		var idD = "dialog" + i;
		var idNext = "#dialog" + (i + 1);
		var idPrev = "#dialog" + (i - 1);
		$dialog.attr("id", idD);
			
		// add images to dialog
		if(i<=10) $dialog.find("img").attr("src","img/"+i+".jpg");
			 
		$dialog.find(".prev").attr("href", idPrev);
		$dialog.find(".next").attr("href", idNext);
		
		$dialog.ready(function() { // Add content to dialog
  			// Handler for .ready() called.
			$dialog.find("#header h1").append(i+" of "+totalPages);
			$dialog.find("#content h4").append(arrTitle[i-1]);
			$dialog.find("#content p").append(arrDescription[i-1]);
		});

		if (i === 1) { //First dialog
			$dialog.find(".prev").addClass('ui-disabled');

		} else if (i == totalPages-1) { // Tips dialog
			
			$dialog.find("img").remove();
			$dialog.find("#content p").remove();
			$dialog.find("#content").append("<ul><li>When writing a personal statement about your life, it’s best to be simple and stay straightforward. Avoid using five words where three will do.</li><li>If you have to use a thesaurus, chances are the reader’s not going to know exactly what the words mean so stick with simple vocabulary.</li><li>Just be yourself, not who you think the judges want you to be. Your personal statement is an autobiography that speaks about your life, your experiences, and your reflections, so remember to tell the truth.</li><li>Don’t have to make up situations or add fluff to tell a poignant story.</li></ul>");
		
		}else if (i == totalPages) { // Last dialog
		
			$dialog.find(".next").addClass('ui-disabled');
			$dialog.find("#content h4").remove();
			$dialog.find("img").remove();
			$dialog.find("#content p").remove();
			$dialog.find("#content").append("<h2 style=\"height:40px; width: 100%; text-align:center; vertical-align: text-bottom;\">Thank You!</h2>");
		}

		$("body").append($dialog);
	}

	/* Next clicked	*/
	$(".next").click(function (ev) {
		ev.preventDefault();
		//localStorage.setItem("lastSeen", $(this).attr("href"));

		$.mobile.pageContainer.pagecontainer("change", $(this).attr("href"), {
			changeHash: false,
			role: "dialog"
		});		
	});	

	/* Previous clicked	*/
	$(".prev").click(function (ev) {
		ev.preventDefault();
		//localStorage.setItem("lastSeen", $(this).attr("href")) ;

		$(this).find("#header h1").append($(this).attr("id")+" of "+totalPages);
		$.mobile.pageContainer.pagecontainer("change", $(this).attr("href"), {
			changeHash: false,
			role: "dialog"
		});
	});

	/* Start Tutorial	*/
	$("#startbtn").on("click", function (ev) {
		
		var lastSeenId = localStorage.getItem(LOCAL_STORAGE_KEY);
		
		if (!lastSeenId || lastSeenId==="#dialog12") {
			lastSeenId = "#dialog1";
		}
		$("#startbtn").attr("href",lastSeenId);
	});

	/* Dialog close button clicked	*/
	$(".dialog").bind("pagehide",function(){
		localStorage.setItem(LOCAL_STORAGE_KEY, "#"+$(this).attr("id")) ;
	});
});