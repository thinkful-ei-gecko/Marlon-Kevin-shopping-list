'use strict';

// `STORE` is responsible for storing the underlying data
// that our app needs to keep track of in order to work.
//
// for a shopping list, our data model is pretty simple.
// we just have an array of shopping list items. each one
// is an object with a `name` and a `checked` property that
// indicates if it's checked off or not.
// we're pre-adding items to the shopping list so there's
// something to see when the page first loads.
const STORE = [
  {name: "apples", checked: false, id: cuid()},
  {name: "oranges", checked: false, id: cuid()},
  {name: "milk", checked: true, id: cuid()},    
  {name: "bread", checked: false, id: cuid()}
];

function generateItemElement(item) {
  return `
  <li data-item-id="${item.id}">
    <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
        <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
        <span class="button-label">delete</span>
      </button>
    </div>
  </li>`;
}

function generateShoppingItemsString(shoppinglist) {
  const items = shoppinglist.map((item, index) => generateItemElement(item, index));
  return items.join('');
}

function renderShoppingList() {
  //add li elements to ul HTML element
  //use STORE as reference for list values
  //Generate string for each item in STORE as an li
  //items checked state T/F representing CSS class
  //Join items into one long string of list elements

  // this function will be responsible for rendering the shopping list in
  // the DOM
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  $('#js-shopping-list-form').on('submit', event => {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName, STORE);
    renderShoppingList();
  });
}

function addItemToShoppingList(itemName, shoppinglist) {
  console.log(`adding ${itemName} to shopping list`);
  shoppinglist.push({name: itemName, checked: false, id: cuid()});
}

function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  
  // listen for when user clicks checked button on an item
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('handleItemCheckClicked ran');
    // retrieve the items id from the data attr
    const itemID = getItemIDFromElement(event.currentTarget);
    console.log(itemID);
    // toggle the checked property for the item in store
    toggleCheckedForListItem(itemID);
    // re-render the shopping list
    renderShoppingList();
  });
}

function getItemIDFromElement(item) {
  return $(item).closest('li').data('item-id');
}

function toggleCheckedForListItem(itemID) {
  console.log(`toggling item for itemID: ${itemID}`);
  const item = STORE.find(item => item.id === itemID);
  item.checked = !item.checked;
}

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);