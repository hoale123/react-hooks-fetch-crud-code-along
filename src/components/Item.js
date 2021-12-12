import React from "react";

function Item({ item, handleUpdateItem, handleDeleteItem }) {
  // DELETE FETCH
  function handleDeleteClick() {
    console.log(item);
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => console.log("deleted!"))
      .then(() => handleDeleteItem(item));

  }
  
  
  function handleAddToCartClick() {
     // console.log("clicked item:", item);
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      // updated item
      .then((updatedItem) => handleUpdateItem(updatedItem));
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDeleteClick} className="remove">Delete</button>
    </li>
  );
}

export default Item;
