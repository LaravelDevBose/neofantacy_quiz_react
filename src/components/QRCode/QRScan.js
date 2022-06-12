import React, { forwardRef } from "react";
import { QrReader } from "react-qr-reader";

function QRScan({ handleScan }, ref) {
  return (
    <QrReader
      ref={ref}
      onResult={(result, error) => {
        if (!!result) {
          handleScan(result?.text);
        }

        if (!!error) {
          console.info(error);
        }
        // console.log(result);
      }}
      style={{ width: "100%" }}
    />
  );
}
export default forwardRef(QRScan);
