import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });


  // Get All Data
  useEffect(() => {
    const getUsersList = async () => {
      try {
        const res = await axios.get("http://localhost:8080");
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsersList();
  }, []);

  const handleChange = (event, id) => {
    const { name, value } = event.target;
    setUser((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, [name]: value } : user
      )
    );
  };

  const handleChangeApi = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add User
  const submitHandler = async () => {
    console.log(formData);
    if (!formData.name || !formData.role || !formData.email) {
      alert("All inputs are needed");
    } else {
      await axios.post("http://localhost:8080/add", formData);
      setFormData({ name: "", email: "", role: "" });
      setIsCreating(false);
      const res = await axios.get("http://localhost:8080/");
      setUser(res.data);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  // Update User
  const saveUpdate = async (e) => {
    console.log(e);
    try {
      await axios.put(`http://localhost:8080/update/${e._id}`, e);
      const res = await axios.get("http://localhost:8080");
      setUser(res.data);
      setEditingId(null);
      alert("Updated Successfully");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    console.log(id);
    var answer = window.confirm("Are you Sure?");
    if (answer) {
      try {
        await axios.delete(`http://localhost:8080/delete/${id}`);
        const res = await axios.get("http://localhost:8080");
        setUser(res.data);
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsCreating(true)}
      >
        Create
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((e, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>
                {editingId === e._id ? (
                  <input
                    value={e.name}
                    name="name"
                    onChange={(event) => handleChange(event, e._id)}
                  />
                ) : (
                  <p>{e.name}</p>
                )}
              </td>
              <td>
                {editingId === e._id ? (
                  <input
                    value={e.role}
                    name="role"
                    onChange={(event) => handleChange(event, e._id)}
                  />
                ) : (
                  <p>{e.role}</p>
                )}
              </td>
              <td>
                {editingId === e._id ? (
                  <input
                    value={e.email}
                    name="email"
                    onChange={(event) => handleChange(event, e._id)}
                  />
                ) : (
                  <p>{e.email}</p>
                )}
              </td>
              <td>
                {editingId === e._id ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => saveUpdate(e)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEdit(e._id)}
                  >
                    Edit
                  </button>
                )}
              </td>
              <td>
                {editingId === e._id ? (
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(e._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}

          {isCreating && (
            <tr>
              <th scope="row">{}</th>
              <td>
                <input
                  type="text"
                  onChange={handleChangeApi}
                  name="name"
                  value={formData.name}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleChangeApi}
                  name="role"
                  value={formData.role}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleChangeApi}
                  name="email"
                  value={formData.email}
                ></input>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitHandler}
                >
                  Add
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default App;
