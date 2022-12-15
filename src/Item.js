import React, { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";

const getFieldStyle = (isDragging, selected) => {
  const style = {
    borderStyle: "dashed",
    borderWidth: 1,
    height: 30,
    margin: 5
  };
  style.backgroundColor = selected ? "pink" : "#87cefa";
  style.opacity = isDragging ? 0.5 : 1;
  return style;
};

export default function Item(props) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "ITEM" },
    begin: (item, monitor) => {
      let dragFields;
      if (props.selectedFields.find((field) => field === props.name)) {
        dragFields = props.selectedFields;
      } else {
        dragFields = [...props.selectedFields, props.name];
      }
      return { fields: dragFields, source: props.selectedSource };
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      // When dropped on a compatible target, do something
      if (dropResult) {
        props.addItemsToCart(item.fields, item.source, dropResult);
        props.clearItemSelection();
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  // const opacity = isDragging ? 0.4 : 1;

  const handleRowSelection = (cmdKey, shiftKey, index) => {
    props.handleSelection(index, cmdKey, shiftKey);
  };

  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)

    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    preview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
    // If you want to implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.
    // return () => console.log('unmounting...');
  }, []);

  const selected = props.selectedFields.find((field) => props.name === field);
  return (
    <div
      ref={drag}
      style={getFieldStyle(false, selected)}
      onClick={(e) => handleRowSelection(e.metaKey, e.shiftKey, props.index)}
    >
      {props.name}
    </div>
  );
}
