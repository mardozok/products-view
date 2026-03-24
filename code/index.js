const API_URL = "https://invadable-chasidy-fleshly.ngrok-free.dev/products";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("scanBtn")
        .addEventListener("click", startScanner);
});

function log(msg) {
    document.getElementById("log").innerText += msg + "\n";
}

function startScanner() {
    const html5QrCode = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            let cameraId = devices.find(device =>
                device.label.toLowerCase().includes('back') ||
                device.label.toLowerCase().includes('rear')
            )?.id || devices[0].id;

            html5QrCode.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: 250 },
                (decodedText) => {
                    log("SCAN: " + decodedText);

                    fetch(`${API_URL}/${decodedText}`, {
                        method: "POST"
                    })
                        .then(res => res.json())
                        .then(data => {
                            log("RESPUESTA: " + JSON.stringify(data));
                        })
                        .catch(err => log("ERROR: " + err));

                    html5QrCode.stop();
                }
            );
        }
    }).catch(err => {
        log("ERROR CAMARA: " + err);
    });
}