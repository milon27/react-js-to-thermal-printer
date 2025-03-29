import printJS from "print-js";
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
    });
  };
  return (
    <div>
      <button onClick={() => printImage()}>print image </button>
      <button onClick={() => printPdf()}>print pdf</button>
      <button onClick={() => printHtml()}>print html</button>
      <div>
        <p>the template is here</p>
        <div
          id="template"
          style={{
            width: "4in",
            height: "6in",
            position: "relative",
          }}
        >
          <img
            src="/temp.png"
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
          <img
            src="/qr.png"
            alt=""
            style={{
              position: "absolute",
              width: "1.4in",
              height: "1.4in",
              top: "0.2in",
              right: "0.2in",
            }}
          />
        </div>
      </div>
    </div>
  );
}
