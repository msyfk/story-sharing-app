const start = () => {
  const video = document.createElement("video");
  const constraints = { video: { facingMode: "environment" } };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      video.srcObject = stream;
      video.play();
      document.body.appendChild(video);
    })
    .catch((error) => {
      alert("Tidak bisa mengakses kamera!");
      console.error(error);
    });
};

export const camera = { start };
