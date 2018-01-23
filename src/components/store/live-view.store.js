let webcamStream, webstreamURL
if (navigator.getUserMedia) {
    navigator.getUserMedia = navigator.getUserMedia
} else {
    navigator.getUserMedia = navigator.webkitGetUserMedia
}

export async function open() {
    let url = await new Promise((resolve, reject)=>{
        navigator.getUserMedia({ video: true }, function (stream) {
            webcamStream = stream
            webstreamURL = URL.createObjectURL(stream)
            resolve(webstreamURL)
        }, function (err) {
            reject(err)
        })
    })
    return url
}
export function close(){
    if (!!webcamStream.stop) {
        webcamStream.stop()
    } else if (!webcamStream.stop) {
        webcamStream.getTracks()[0].stop()
    }
    URL.revokeObjectURL(webstreamURL)
}