import React, { forwardRef } from "react";
import QrReader from "react-qr-scanner";

function QRCodeReader({ handleScan }, ref) {
  console.log();

  const handleError = (e) => {
    console.log(e);
  };

  const previewStyle = {
    width: 400,
    height: 400,
  };
  const constra = {
    width: { min: 400, ideal: 400, max: 400 },
    height: { min: 400, ideal: 400 },
    aspectRatio: 1.777777778,
    frameRate: { max: 30 },
    facingMode: { exact: "application" },
    video: false,
    audio: false
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <QrReader
        ref={ref}
        delay={100}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        constraints={constra}
      />
    </div>
  );
}
export default forwardRef(QRCodeReader);
