import "./Cursor.css";

const Cursor = function (props) {
  return (
    <>
      <div
        className="cursor blink"
        style={{ top: props.top, left: props.left }}
      ></div>
    </>
  );
};

export default Cursor;
