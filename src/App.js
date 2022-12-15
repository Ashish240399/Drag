import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Cart from "./Cart";
import ItemsDragLayer from "./ItemsDragLayer";

const styles = {
  main: {
    width: "50%",
    margin: "0 auto",
    textAlign: "center"
  },
  content: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "left",
    alignItems: "stretch",
    alignContent: "stretch"
  }
};

export default function App() {
  const [leftItems, setLeftItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8"
  ]);
  const [rightItems, setRightItems] = useState([]);

  const addItemsToCart = (items, source, dropResult) => {
    const newLeftItems =
      source === "left"
        ? leftItems.filter((x) => items.findIndex((y) => x === y) < 0)
        : leftItems.concat(items);
    const newRightItems =
      source === "left"
        ? rightItems.concat(items)
        : rightItems.filter((x) => items.findIndex((y) => x === y) < 0);
    setLeftItems(newLeftItems);
    setRightItems(newRightItems);
  };
  return (
    <div style={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <h2>Drag and drop multiple items with React DnD</h2>
        <h4>Use Shift or Cmd key to multi-select</h4>
        <ItemsDragLayer />
        <div style={styles.content}>
          <Cart id="left" fields={leftItems} addItemsToCart={addItemsToCart} />
          <Cart
            id="right"
            fields={rightItems}
            addItemsToCart={addItemsToCart}
          />
        </div>
      </DndProvider>
    </div>
  );
}
