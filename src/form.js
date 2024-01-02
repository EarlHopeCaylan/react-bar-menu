import React from 'react';
import Input from './component/Input';
import { fetchCategories, fetchCategoriesItem, fetchCategoriesButton } from './api/buttonApi';
import './assets/styles/form.css';
import Title from './component/title';
import { app } from './config-firebase/firebase.js';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate  } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    title: '',
    category: '',
    parent: '',
    display: '',
  });
  const [categories, setCategories] = React.useState([]);

  //FIRESTORE
  const db = getFirestore(app);

  React.useEffect(() => {
    const fetchCategory = async () => {
      const grabCategory = await fetchCategoriesButton('item');
      grabCategory.unshift('Selecione uma categoria'); // Add a first option
      setCategories(grabCategory);
    };
    fetchCategory();
  }, []);

  React.useEffect(() =>{
    const categories = fetchCategoriesButton("item")
  })

  function handleSubmit(event) {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    addDoc(collection(db, 'button'), form)
      .then((docRef) => {
        console.log(docRef.id);
        setForm({
          title: '',
          category: '',
          parent: '',
          display: '',
        })
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setForm({ ...form, [id]: value, [id]: value, [id]: value, [id]: value });
  }

  return (
    <div className="container mt-5 p-3 bg-body-tertiar">
      <Title title="Adicione um novo botão" />
      <form onSubmit={handleSubmit} className="m-1">
        <Input
          id="title"
          label="title"
          value={form.title}
          type="text"
          onChange={handleChange}
        />
        <div className="my-3">
          <label className="form-label">Categoria</label>
          <select
            id="category"
            className="form-select"
            value={form.category}
            onChange={handleChange}
          >
            {categories &&
              categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>
        <Input
          id="parent"
          label="Parent"
          value={form.parent}
          type="text"
          onChange={handleChange}
        />
        <Input
          id="display"
          label="Display"
          value={form.display}
          type="text"
          onChange={handleChange}
        />
        <button className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}
export default Form;
