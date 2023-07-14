import ytdl from "ytdl-core";

function searchVideo() {
  const getVideoID = () => {
    const userInput = document.getElementById("userInput").value;
    const regex =
      /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|shorts\/)?([0-9A-Za-z_-]{11})(?:\S+)?$/;
    const match = userInput.match(regex);
    if (match && match[1]) return match;
    else return null;
  };

  let videoID = getVideoID();
  console.log(videoID);
  let ytThumbnail = document.getElementById("ytThumbnail");
  let ytLink = document.getElementById("ytLink");
  let downloadBox = document.getElementsByClassName("downloadBox")[0];
  let downOption = downloadBox.innerHTML;

  if (videoID) {
    ytThumbnail.src =
      "https://img.youtube.com/vi/" + videoID[1] + "/sddefault.jpg";
    ytLink.href = videoID[0];
    console.log(downOption);
    downOption +=
      '<button class="button downButton" id="videoDown" onclick="videoOnly()">Video</button>';
    downOption +=
      '<button class="button downButton" id="audioDown" onclick="audioOnly()">Audio</button>';
    downOption +=
      '<button class="button downButton" id="videoAudioDown" onclick="videoAndAudio()">Both</button>';
    console.log(downOption);
    downloadBox.id = "optionBox";
    downloadBox.innerHTML = downOption;
  } else {
    ytThumbnail.src = "./images/videonotfound.png";
    ytLink.href = "#";
  }
}

function videoOnly() {
  const videoUrl = document.getElementById("userInput").value;

  // Download the video using ytdl-core
  ytdl(videoUrl, { filter: "videoonly" }).pipeTo(
    new WritableStream({
      write(chunk) {
        // Handle each chunk of data received
        console.log("Received chunk:", chunk);
      },
      close() {
        // The download is complete
        console.log("Video downloaded successfully!");
      },
      abort(error) {
        // Handle error or abort
        console.error("Error while downloading the video:", error);
      },
    })
  );
}

function audioOnly() {
  const videoUrl = document.getElementById("userInput").value;

  // Download the audio
  ytdl(videoUrl, { filter: "audioonly" }).pipeTo(
    new WritableStream({
      write(chunk) {
        // Handle each chunk of data received
        console.log("Received chunk:", chunk);
      },
      close() {
        // The download is complete
        console.log("Video downloaded successfully!");
      },
      abort(error) {
        // Handle error or abort
        console.error("Error while downloading the video:", error);
      },
    })
  );
}

function videoAndAudio() {
  const videoUrl = document.getElementById("userInput").value;

  // Download the video and audio
  ytdl(videoUrl, { filter: "videoandaudio" }).pipeTo(
    new WritableStream({
      write(chunk) {
        // Handle each chunk of data received
        console.log("Received chunk:", chunk);
      },
      close() {
        // The download is complete
        console.log("Video downloaded successfully!");
      },
      abort(error) {
        // Handle error or abort
        console.error("Error while downloading the video:", error);
      },
    })
  );
}

window.searchVideo = searchVideo;
window.audioOnly = audioOnly;
window.videoOnly = videoOnly;
window.videoAndAudio = videoAndAudio;
