import React from "react";
import ItemsTemplate from "./ItemsTemplate";
import { useDragLayer } from "react-dnd";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%"
};

const getFieldStyle = (isDragging) => {
  const style = {
    width: 300,
    maxWidth: 300
  };
  style.opacity = isDragging ? 0.8 : 1;
  return style;
};

const getItemStyles = (currentOffset) => {
  if (!currentOffset) {
    return {
      display: "none"
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
};

export default function FieldDragLayer(props) {
  const { itemType, isDragging, item, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    })
  );

  const renderItem = (type, item) => {
    switch (type) {
      case "ITEM":
        return <ItemsTemplate fields={item.fields} />;
      default:
        return null;
    }
  };
  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(currentOffset)}>
        <div style={getFieldStyle(isDragging)}>
          {renderItem(itemType, item)}
        </div>
      </div>
    </div>
  );
}
