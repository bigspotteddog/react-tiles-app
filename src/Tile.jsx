import { useState, forwardRef, useImperativeHandle } from "react";
import "./Tile.css";

const Tile = forwardRef(function Tile(props, ref) {
  const [letters, setLetters] = useState(props.letters);

  const addLetters = function (letters) {
    setLetters((previous) => {
      return previous + letters;
    });
  };

  useImperativeHandle(ref, () => ({
    addLetters: addLetters,
  }));

  let color = getColor(props);

  let classes = `tile shape ${color}`;

  return (
    <>
      <div
        ref={ref}
        data-id={props.id}
        data-left={props.left}
        data-top={props.top}
        className={classes}
        style={{
          left: props.left,
          top: props.top,
          width: props.width,
          height: props.height,
          transform: `translate(${props.translate?.x}px, ${props.translate?.y}px)`,
        }}
      >
        <div
          className="tile-content"
          style={{ fontSize: getFontSize(props.width, letters) }}
        >
          {letters}
        </div>
      </div>
    </>
  );
});

export default Tile;

const getTextWidth = function (text, font) {
  var canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
};

const getFontSize = function (width, letters) {
  for (let scale = 0.4; scale > 0.1; scale *= 0.9) {
    let fontSize = width * scale;
    let wordWidth = getTextWidth(letters, `400 ${fontSize}px monospace`);
    if (wordWidth < width * 0.9) {
      return fontSize;
    }
  }
  return width * 0.1;
};

const VOWELS = "aeiouy";

function getColor(props) {
  let color = "blue";
  if (VOWELS.indexOf(props.letters.toLowerCase()) > -1) {
    color = "orange";
  }
  return color;
}
