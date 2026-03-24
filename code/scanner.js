import { addProductToCart } from "./product.js";

const API_URL = "https://invadable-chasidy-fleshly.ngrok-free.dev/products";
const btnScan = document.getElementById("scanBtn");


btnScan.addEventListener("click", startScanner);

function log(msg) {
    document.getElementById("log").innerText += msg + "\n";
}

export function startScanner() {
    const html5QrCode = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {

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
                            addProductToCart(data);
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