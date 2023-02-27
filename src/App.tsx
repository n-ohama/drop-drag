import "./App.css";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  OnDragEndResponder,
  ResponderProvided,
} from "react-beautiful-dnd";
import { useState } from "react";

function App() {
  const [items, setItem] = useState(["item0", "item1", "item2"]);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const itemList = [...items];
    const deleteItem = itemList.splice(result.source.index, 1);
    console.log(deleteItem);
    if (result.destination) {
      itemList.splice(result.destination.index, 0, deleteItem[0]);
    }
    // items.splice(result.destination.index, 0, remove[0]);
    setItem(itemList);
  };

  return (
    <div className="dragdropArea">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      className="item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
