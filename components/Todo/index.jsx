import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '../../context/Settings/SettingsProvider';
import useForm from '../../hooks/useForm';
import { Pagination } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Auth from '../Auth.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import Login from '../Login.jsx';
import useAxios from '../../hooks/axios.js';



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
  const { isAuthenticated, logout } = useContext(AuthContext);
  const axios = useAxios();

  const addItem = async (item) => {
    try {
      const newItem = { ...item, id: uuid(), complete: false };
      const response = await axios.post('/todo', newItem);
      setList((prevList) => [...prevList, response.data]);
      handleAddItemModalClose();
    } catch (error) {
      console.error("Error adding todo: ", error.response);
    }
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get('/todo');
        setList(response.data);
      } catch (error) {
        console.error("Error fetching todos: ", error.response);
      }
    };

    fetchList();
  }, []);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get('/todo');
        setList(response.data);
      } catch (error) {
        console.error("Error fetching todos: ", error.response);
      }
    };

    fetchList();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/todo/${id}`);
      const items = list.filter(item => item.id !== id);
      setList(items);
    } catch (error) {
      console.error("Error deleting todo: ", error.response);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const item = list.find(item => item.id === id);
      const updatedItem = { ...item, complete: !item.complete };
      const response = await axios.put(`/todo/${id}`, updatedItem);
      const items = list.map(item => item.id === id ? response.data : item);
      setList(items);
    } catch (error) {
      console.error("Error toggling todo complete: ", error.response);
    }
  };

  const calculateTotal = () => Math.ceil(list.length / settings.displayItems);

  const handlePagination = (page) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  const { handleChange, handleSubmit, values, resetForm } = useForm(addItem, defaultValues);
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

      {/* Login/Logout button */}
      <div className="mb-3">
          {isAuthenticated ? (
              <Button variant="danger" onClick={logout}>
                  Logout
              </Button>
          ) : (
              <Login />
          )}
      </div>

      {/* Add Item Modal Trigger Button */}
      <Button variant="primary" onClick={handleAddItemModalShow}>
        <Auth capability="create">
          Add New Todo
        </Auth>
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
          <Auth capability="read">
            {itemsToDisplay.map(item => (
              <div key={item.id}>
                <p>{item.text}</p>
                <p><small>Assigned to: {item.assignee}</small></p>
                <p><small>Difficulty: {item.difficulty}</small></p>
                <div onClick={() => toggleComplete(item.id)}>
                  Complete: {item.complete.toString()}
                </div>
                <Auth capability="delete">
                  <Button onClick={() => deleteItem(item.id)} variant="danger" className="mr-2">
                    Delete
                  </Button>
                </Auth>
                <Auth capability="update">
                  <Button onClick={() => toggleComplete(item.id)} variant="warning">
                    Toggle Status
                  </Button>
                </Auth>
                <hr />
              </div>
            ))}
          </Auth>
          <Pagination value={currentPage} total={calculateTotal()} onChange={handlePagination} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Todo;

