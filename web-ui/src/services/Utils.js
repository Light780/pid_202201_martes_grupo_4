import base64ToBlob from "base64toblob";

const signatures = {
    JVBERi0: "application/pdf",
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg",
    "/":"image/jpeg"
  };
  
const detectMimeType = (b64) => {
    for (var s in signatures) {
      if (b64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
}
export const blobConverter = (base64) => {
    return URL.createObjectURL(base64ToBlob(base64, detectMimeType(base64)))
} 