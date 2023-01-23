const ITEMS_CONTAINER = document.getElementById("items");
const ITEM_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");


let items = getItems();

function getItems(){
	const value = localStorage.getItem("todo") || "[]";
  
  return JSON.parse(value);
}

function setItems(items){
	const itemsJson = JSON.stringify(items);
  
  localStorage.setItem("todo", itemsJson);
}

function addItem(){
	items.unshift({
  description:"",
  completed: false,
  });
  setItems(items);
  refreshList();
}

// trying to mimic the above function to address localStorage
function deleteItem(item, key, value){
  this.remove();
  removeItem(items);
  refreshList();
} 

function updateItem(item, key, value){
	item[key] = value;
  setItems(items);
  refreshList();
}

function refreshList(){
	items.sort((a, b) => {
  	if(a.completed){
    	return 1;
    }
    if(b.completed){
    	return -1;
    }
    	return a.description < b.description ? -1:1;
  });
  
  ITEMS_CONTAINER.innerHTML = "";
  	for (const item of items){
    const itemElement = ITEM_TEMPLATE.content.cloneNode(true);
    const descriptionInput = itemElement.querySelector(".item-description");
    const completedInput = itemElement.querySelector(".item-completed");
    
    descriptionInput.value = item.description;
    completedInput.checked = item.completed;
    
    descriptionInput.addEventListener("change", () => {
    	updateItem(item, "description", descriptionInput.value);
    });
    
    completedInput.addEventListener("change", () => {
    	updateItem(item, "completed", completedInput.checked);
    });
    
    
    ITEMS_CONTAINER.append(itemElement);

// finally got this to print the console log; idk why document works but itemElement doesn't
    document.querySelector(".delete").addEventListener("click", function(){
      console.log("at least we made it clickable now");
      // need to identify the THING to remove
      // remove(this); NOT IT
      // remove(itemElement); NOT IT
      // remove(this.ITEM_TEMPLATE); NOT IT
    })
    
    }
}

ADD_BUTTON.addEventListener("click", () => {
	addItem();
});



refreshList();