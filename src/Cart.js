import React, { useState, useEffect } from "react";
import Item from "./Item";
import { useDrop } from "react-dnd";

const styles = {
  content: {
    borderStyle: "solid",
    paddingTop: 25,
    paddingBottom: 25,
    marginLeft: 50,
    width: 300,
    height: 300
  }
};

export default function Cart(props) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ITEM",
    drop: () => ({ data: props.data }),
    canDrop: (item, monitor) => {
      return item.source !== props.id;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const [selectedFields, setSelectedFields] = useState([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(-1);

  const clearItemSelection = () => {
    setSelectedFields([]);
    setLastSelectedIndex(-1);
  };

  const handleItemSelection = (index, cmdKey, shiftKey) => {
    let newSelectedFields;
    const fields = props.fields;
    const field = index < 0 ? "" : fields[index];
    const newLastSelectedIndex = index;
    if (!cmdKey && !shiftKey) {
      newSelectedFields = [field];
    } else if (shiftKey) {
      if (lastSelectedIndex >= index) {
        newSelectedFields = [].concat.apply(
          selectedFields,
          fields.slice(index, lastSelectedIndex)
        );
      } else {
        newSelectedFields = [].concat.apply(
          selectedFields,
          fields.slice(lastSelectedIndex + 1, index + 1)
        );
      }
    } else if (cmdKey) {
      const foundIndex = selectedFields.findIndex((f) => f === field);
      // If found remove it to unselect it.
      if (foundIndex >= 0) {
        newSelectedFields = [
          ...selectedFields.slice(0, foundIndex),
          ...selectedFields.slice(foundIndex + 1)
        ];
      } else {
        newSelectedFields = [...selectedFields, field];
      }
    }
    const finalList = fields
      ? fields.filter((f) => newSelectedFields.find((a) => a === f))
      : [];
    setSelectedFields(finalList);
    setLastSelectedIndex(newLastSelectedIndex);
  };

  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    clearItemSelection();
    // If you want to implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.
    // return () => console.log('unmounting...');
  }, []);

  const items = props.fields.map((field, index) => (
    <Item
      name={field}
      key={index}
      selectedSource={props.id}
      addItemsToCart={props.addItemsToCart}
      clearItemSelection={clearItemSelection}
      selectedFields={selectedFields}
      handleSelection={handleItemSelection}
      index={index}
    />
  ));
  return (
    <div style={styles.content} ref={drop}>
      {" "}
      {items}{" "}
    </div>
  );
}
