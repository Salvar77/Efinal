import Layout from "@/components/Main/Layout";
import classes from "../styles/Categories.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  };

  const saveCategory = async (ev) => {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  };

  const deleteCategory = async (category) => {
    swal
      .fire({
        title: "Jesteś pewien?",
        text: `Czy na pewno chcesz usunąć ${category.name}`,
        showCancelButton: true,
        cancelButtonText: "Anuluj",
        confirmButtonText: "Tak, Usuń",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id, { _id });
          fetchCategories();
        }
      });
  };

  const addNewProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const handlePropertyValuesChange = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  };

  return (
    <Layout>
      <h2>Kategorie</h2>
      <label>
        {editedCategory
          ? `Edytuj kategorię ${editedCategory.name}`
          : "Stwórz nową kategorię"}
      </label>
      <form onSubmit={saveCategory}>
        <div className={classes.category}>
          <input
            className={classes.category__input}
            type="text"
            placeholder={"nazwa kategorii"}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          <select
            className={classes.select}
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}
          >
            <option key="" value="">
              Brak nadrzędnej kategorii
            </option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className={classes.category__properties}>
          <label className={classes.category__propertiesLabel}>
            Właściwości
          </label>
          <button
            onClick={() => addNewProperty()}
            type="button"
            className={`btn-default ${classes.category__button}`}
          >
            Dodaj nową właściwość
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className={classes.category__propertiesBox}>
                <input
                  type="text"
                  className={classes.category__propertiesBoxStyle}
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  placeholder="nazwa właściwości (przykład: kolor)"
                />
                <input
                  type="text"
                  className={classes.category__propertiesBoxStyle}
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  value={property.values}
                  placeholder="wartości"
                />
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="btn-red"
                >
                  Usuń
                </button>
              </div>
            ))}
        </div>
        <div className={classes.category}>
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
              className="btn-default"
            >
              Anuluj
            </button>
          )}
          <button
            type="submit"
            className={`btn-primary ${classes.category__btn}`}
          >
            Zapisz
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className={`basic ${classes.table}`}>
          <thead>
            <tr>
              <td>Nazwa Kategorii</td>
              <td>Kategoria nadrzędna</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      href="#"
                      onClick={() => editCategory(category)}
                      className={`btn-default ${classes.edit}`}
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-red"
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
