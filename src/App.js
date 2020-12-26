import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Recipes from './components/Recipes';
import Pagination from './components/Page';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipesPerPage] = useState(9);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('fish');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  let currentRecipes = [];

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=11ba277d6b81487097631bb14b08659c&query="${query}"&number=10&addRecipeNutrition=true&addRecipeInformation=true`
        );
        setRecipes(res.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    getRecipes();
  }, [query]);


  const getSearch = (e) => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
    };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };


  const indexOfLastPost = currentPage * recipesPerPage;
  const indexOfFirstPost = indexOfLastPost - recipesPerPage;
  currentRecipes = recipes.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let display = (
    <Container fluid>
      <Row className="justify-content-center mt-3">
        {currentRecipes.map((recipe) => (
          <Recipes
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            sourceUrl={recipe.sourceUrl}
            nutrition={recipe.nutrition}
            loading={loading}
          />
        ))}
      </Row>
      <Row className="justify-content-center mt-3">
        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Row>
    </Container>
  );

  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand className="">Recipe Search App</Navbar.Brand>
        <Form className="ml-auto" inline onSubmit={getSearch}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search Yummy food"
              className="mr-sm-2"
              value={search}
              onChange={updateSearch}
            />
            
          </InputGroup>
        </Form>
      </Navbar>
      {display}
    </>
  );
};

export default App;
