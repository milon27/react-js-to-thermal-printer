import { jsPDF } from "jspdf";
import printJS from "print-js";
import { useRef } from "react";
import "./app.css";

export default function App() {
  const printImage = () => {
    printJS({
      printable: "/one.png",
      type: "image",
      imageStyle: "width: 100%; height: auto;", // Scale the image to fit the page (can adjust width/height as needed)
    });
  };

  const printPdf = () => {
    printJS({
      printable: "/one.pdf",
      type: "pdf",
    });
  };

  const printHtml = () => {
    printJS({
      printable: "template",
      type: "html",
      css: "/print.css",
    });
  };

  const contentRef = useRef(null); // Reference for the HTML content you want to convert to PDF
  const convertHtmlToPdfAndThenPrint = () => {
    if (contentRef.current) {
      const doc = new jsPDF({
        unit: "mm", // Use millimeters for page size and margins
        format: [101.6, 152.4], // 4x6 inches in mm (101.6mm x 152.4mm)
      });

      // First, capture the entire content in the div, including the images
      // Add the background image (tempImg)
      const tempImg = document.getElementById("tempImg");

      if (tempImg instanceof HTMLImageElement) {
        doc.addImage(tempImg!, "PNG", 0, 0, 101.6, 152.4); // Add image to fit the full 4x6 area
      } else {
        console.error("tempImg is not an HTMLImageElement");
      }

      // Now, add the QR image (#qrImg), with absolute positioning based on your CSS
      const qrImg = document.getElementById("qrImg");
      const qrWidth = 35.56; // 1.4 inches in mm
      const qrHeight = 35.56; // 1.4 inches in mm
      const qrTop = 5.08; // 0.2 inches in mm
      const qrRight = 5.08; // 0.2 inches in mm

      if (qrImg instanceof HTMLImageElement) {
        // Adding QR image with specific positioning (absolute in your CSS)
        doc.addImage(
          qrImg!,
          "PNG",
          101.6 - qrWidth - qrRight,
          qrTop,
          qrWidth,
          qrHeight
        );
      } else {
        console.error("qrImg is not an HTMLImageElement");
      }

      // Generate the PDF and send to print
      // doc.save("generated.pdf"); // For download, or send to print directly
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Use Print.js to print the generated PDF from the URL
      printJS({
        printable: pdfUrl,
        type: "pdf",
        showModal: true, // Optional: Show print dialog
      });

      // Clean up the object URL after printing
      URL.revokeObjectURL(pdfUrl);
    } else {
      console.log("Content ref is null");
    }
  };

  return (
    <div>
      <button onClick={() => printImage()}>print image </button>
      <button onClick={() => printPdf()}>print pdf</button>
      <button onClick={() => printHtml()}>print html</button>
      <button onClick={() => convertHtmlToPdfAndThenPrint()}>
        print pdf from html
      </button>
      <div>
        <p>the template is here</p>
        <div id="template" ref={contentRef}>
          <img id="tempImg" src="/temp.png" alt="" />
          <img id="qrImg" src="/qr.png" alt="" />
        </div>
      </div>
    </div>
  );
}
