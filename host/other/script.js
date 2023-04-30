const imageUpload = document.getElementById('imageUpload');

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/content/other/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/content/other/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/content/other/models')
]).then(start);

async function start() {
  const container = document.createElement('div');
  container.style.position = 'relative';
  document.body.append(container);
  const labeledFaceDescriptors = await loadLabeledImages();
  // console.log(labeledFaceDescriptors);
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
  // console.log(faceMatcher);
  let image;
  let canvas;
  document.body.append('Loaded');
  imageUpload.addEventListener('change', async () => {
    if (image) image.remove();
    if (canvas) canvas.remove();
    image = await faceapi.bufferToImage(imageUpload.files[0]);
    container.append(image);
    canvas = faceapi.createCanvasFromMedia(image);
    container.append(canvas);
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    // console.log(results);
    // results.forEach((result, i) => {
    //   const box = resizedDetections[i].detection.box
    //   const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
    //   drawBox.draw(canvas)
    // })
    ivm = 0;
    results.forEach((result) => {
      console.log(result);
      console.log(result._label);
      if (result._label == 'Match') {
        ivm = 1;
      }
    });
    if (ivm == 1) {
      console.log('Face Matched');
    } else {
      console.log('Face not Matched');
    }
  })
}

function loadLabeledImages() {
  const labels = ['Match'];
  return Promise.all(
    labels.map(async label => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`/sys/faceapi/${i}`);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  )
}
