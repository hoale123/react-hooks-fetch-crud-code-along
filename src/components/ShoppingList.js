import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);
  // callback function
  //DELTE.
  function handleDeleteItem(deletedItem) {
    console.log("In ShoppingCart:", deletedItem);
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }


  //For our update action, we'd like to give our users the ability to keep track of which items from their shopping list they've added to their cart.
  //PATCH
  // add this callback function; PATCH
  function handleUpdateItem(updatedItem) {
    // console.log("In ShoppingCart:", updatedItem);
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }


    // add this function! POST
    function handleAddItem(newItem) {
      // console.log("In ShoppingList:", newItem);
      setItems([...items, newItem]);
    }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item handleDeleteItem={handleDeleteItem} handleUpdateItem={handleUpdateItem} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
