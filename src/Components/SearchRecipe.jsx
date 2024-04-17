import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import html2pdf from 'html2pdf.js';

function SearchRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [expandedCards, setExpandedCards] = useState([]);

  useEffect(() => {
    const resizeCardMedia = () => {
      const cardMediaElements = document.querySelectorAll('.card-media');
      cardMediaElements.forEach((element) => {
        const cardAspectRatio = parseFloat(element.getAttribute('data-aspect-ratio'));
        const cardWidth = element.offsetWidth;
        const cardHeight = cardWidth / cardAspectRatio;
        element.style.height = `${cardHeight}px`;
      });
    };

    resizeCardMedia();

    window.addEventListener('resize', resizeCardMedia);

    return () => {
      window.removeEventListener('resize', resizeCardMedia);
    };
  }, [recipes]);

  const handleToggleInstructions = (index) => {
    setExpandedCards((prevExpandedCards) => {
      if (prevExpandedCards.includes(index)) {
        return prevExpandedCards.filter((i) => i !== index);
      } else {
        return [...prevExpandedCards, index];
      }
    });
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const recipeSearch = async () => {
    setLoading(true); // Set loading to true when fetching data

    const options = {
      method: 'GET',
      url: 'https://food-recipes-with-images.p.rapidapi.com/',
      params: { q: searchTerm },
      headers: {
        'X-RapidAPI-Key': 'e38190e3edmsh89073924e45455cp174847jsn0b69402f38d8',
        'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      response && setRecipes(response.data.d);
      console.log(response.data.d);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading back to false when data fetching completes
    }
  };

  const downloadRecipe = (recipe) => {
    const ingredientList = Object.values(recipe.Ingredients).map((ingredient, i) => `<li key=${i}>${ingredient}</li>`).join('');
    const instructions = recipe.Instructions;

    const recipeDetails = `
      <h2>${recipe.Title}</h2>
      <h3>Ingredients:</h3>
      <ol>${ingredientList}</ol>
      <h3>Instructions:</h3>
      <p>${instructions}</p>
    `;

    html2pdf().from(recipeDetails).save();
  };

  return (
    <>
      <div className="work-section-top">
        <h1 style={{ marginTop: '90px' }} className="primary-heading">Search for Recipes</h1>
      </div>
      <div style={{ marginTop: '40px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* <div className='searchBar' style={{ margin: 'auto' }}>
          <input className='inputSearch' style={{ width: '490px', height: '60px', marginBottom: '10px', padding: '5px' }} type='text' value={searchTerm} onChange={handleInputChange} placeholder='Search Ingredient' />
          <button style={{ background: '#d84729', color: 'white', border: 'none', padding: '19px 20px', borderRadius: '5px', cursor: 'pointer', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }} onClick={recipeSearch}>Submit</button>
        </div> */}

        {/* <div className='searchBar' style={{ margin: 'auto' }}>
          <input className='inputSearch'  type='text' value={searchTerm} onChange={handleInputChange} placeholder='Search Ingredient' />
          <button className='inputButton' style={{ background: '#d84729', color: 'white', border: 'none',borderRadius: '5px', cursor: 'pointer', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }} onClick={recipeSearch}>Submit</button>
        </div> */}

        <div class="search-container2">
       
          <input style={{borderBottomLeftRadius:'30px',borderTopLeftRadius:'30px'}} type='text' value={searchTerm} onChange={handleInputChange} placeholder="Search Recipe" name="search"/>
          <button style={{background: '#d84729', color: 'white', border: 'none', cursor: 'pointer', borderTopRightRadius: '30px', borderBottomRightRadius: '30px'}} onClick={recipeSearch}>Submit</button>        
      </div> 


        

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {recipes.map((recipe, index) => (
            <Card className='cardCSS' key={index} sx={{ maxWidth: 380, margin: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)' } }}>
              <CardMedia
                component="img"
                height="200"
                image={recipe.Image}
                alt={recipe.Title}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div" style={{ color: '#333', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
                  {recipe.Title}
                </Typography>
                <Typography variant="body1" color="text.secondary" style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.5', textAlign: 'justify' }}>
                  <strong>Ingredients:</strong>
                  <ol>
                    {expandedCards.includes(index) ?
                      Object.values(recipe.Ingredients).map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      )) :
                      Object.values(recipe.Ingredients).slice(0, 5).map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))
                    }
                  </ol>
                </Typography>
                {expandedCards.includes(index) && (
                  <Typography variant="body1" color="text.secondary" style={{ marginBottom: '10px', fontSize: '16px', lineHeight: '1.5', textAlign: 'justify' }}>
                    <strong>Instructions:</strong> {recipe.Instructions}
                  </Typography>
                )}
              </CardContent>
              <CardActions style={{ justifyContent: 'center' }}>
                <Button size="small" onClick={() => downloadRecipe(recipe)} style={{ background: '#4caf50', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                  Download Recipe
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

export default SearchRecipe;
