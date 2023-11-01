import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '../../context/Settings/SettingsProvider';
import useForm from '../../hooks/useForm';
import { Pagination } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Todo = () => {
  const settings = useContext(SettingsContext);
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  const calculateTotal = () => Math.ceil(list.length / settings.displayItems);

  const handlePagination = (page) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  const start = (currentPage - 1) * settings.displayItems;
  const end = start + settings.displayItems;
  const itemsToDisplay = list.slice(start, end);
  const handleAddItemModalClose = () => setShowAddItemModal(false);
  const handleAddItemModalShow = () => setShowAddItemModal(true);
  const handleTasksModalClose = () => setShowTasksModal(false);
  const handleTasksModalShow = () => setShowTasksModal(true);
  
  return (
    <>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>

      {/* Add Item Modal Trigger Button */}
      <Button variant="primary" onClick={handleAddItemModalShow}>
        Add New Todo
      </Button>

      {/* Tasks Modal Trigger Button */}
      <Button variant="secondary" className="ml-2" onClick={handleTasksModalShow}>
        View Tasks
      </Button>

      {/* Add Item Modal */}
      <Modal show={showAddItemModal} onHide={handleAddItemModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add To Do Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <h2>Add To Do Item</h2>
            <label>
              <span>To Do Item</span>
              <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
            </label>
            <label>
              <span>Assigned To</span>
              <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
            </label>
            <label>
              <span>Difficulty</span>
              <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
            </label>
            <label>
              <button type="submit">Add Item</button>
            </label>
          </form>
        </Modal.Body>
      </Modal>

      {/* Tasks Modal */}
      <Modal show={showTasksModal} onHide={handleTasksModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemsToDisplay.map(item => (
            <div key={item.id}>
              <p>{item.text}</p>
              <p><small>Assigned to: {item.assignee}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
              <div onClick={() => toggleComplete(item.id)}>
                Complete: {item.complete.toString()}
              </div>
              <Button onClick={() => deleteItem(item.id)} variant="danger" className="mr-2">
                Delete
              </Button>
              <Button onClick={() => toggleComplete(item.id)} variant="warning">
                Toggle Status
              </Button>
              <hr />
            </div>
          ))}
          <Pagination value={currentPage} total={calculateTotal()} onChange={handlePagination} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Todo;

