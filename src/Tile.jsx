import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import "./Tile.css";

const VOWELS = "aeiouy";
let letters;
let setLetters;

const Tile = forwardRef(function Tile(props, ref) {
  [letters, setLetters] = useState(props.letters);

  useImperativeHandle(ref, () => ({
    addLetters: addLetters
  }));
  
  function addLetters(letters) {
    setLetters((previous) => {
      console.log(previous);
      return previous + letters
    });
  }

  let color = "blue";
  if (VOWELS.indexOf(props.letters.toLowerCase()) > -1) {
    color = "orange";
  }

  let classes = `tile shape ${color}`;

  return (
    <>
      <div ref={ref} className={classes} style={{ left: props.left, top: props.top }}>
        <div className="content">{letters}</div>
      </div>
    </>
  );
});

export default Tile;
