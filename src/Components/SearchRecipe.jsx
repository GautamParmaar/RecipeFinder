import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function SearchRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

const [expandedCards, setExpandedCards] = useState([]);

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



    const recipeSearch=async()=>{

      const options = {
        method: 'GET',
        url: 'https://food-recipes-with-images.p.rapidapi.com/',
        params: {q: searchTerm},
        headers: {
          'X-RapidAPI-Key': 'e38190e3edmsh89073924e45455cp174847jsn0b69402f38d8',
          'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
        }
      };
      
      
      try {
        const response = await axios.request(options);
         response && setRecipes(response.data.d);
        console.log(response.data.d)

        
      } catch (error) {
        console.error(error);
      }

    }
    return (
        <>
  <div style={{ marginTop: '90px', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ margin: 'auto' }}>
                <input style={{ width: '490px', height: '40px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', padding: '5px' }} type='text'value={searchTerm} onChange={handleInputChange} placeholder='Search Ingredient' />
                <button style={{ background: '#4caf50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }} onClick={recipeSearch}>Submit</button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {recipes.map((recipe, index) => (
                    <Card key={index} sx={{ maxWidth: 380, margin: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)' } }}>
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
                            <Button size="small" onClick={() => handleToggleInstructions(index)} style={{ background: '#4caf50', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                                {expandedCards.includes(index) ? 'Less Info' : 'More Info'}
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>


        </>)
}

export default SearchRecipe