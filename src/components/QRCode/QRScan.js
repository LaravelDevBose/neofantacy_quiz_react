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
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <QrReader
        ref={ref}
        delay={100}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        facingMode="rear"
        constraints={{ facingMode: "environment" }}
      />
    </div>
  );
}
export default forwardRef(QRCodeReader);
