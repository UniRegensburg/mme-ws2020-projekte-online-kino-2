/* eslint-env browser */
//hier werden events, die auf 
//der Seite des Clients wahrgenommen werden
//und ausgeloest werden, behandelt


var myPlayer = videojs('my-player');

function init() {
	changeVideoUrl();
}

function changeVideoUrl() {
	document.getElementById("submitButton").addEventListener("click", () => {
		let newUrl = document.getElementById("urlInput").value;
		console.log(newUrl);
		myPlayer.src({ type: "video/youtube", src:newUrl});
		myPlayer.play();
	});
}	
init();