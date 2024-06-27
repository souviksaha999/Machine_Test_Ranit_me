
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';

const fetchProducts = async () => {
  const { data } = await axios.get('https://fakestoreapi.com/products');
  return data;
};

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [visibleProduct, setVisibleProduct] = useState(Array(20).fill(false));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleClick = (index) => {
    setVisibleProduct((prevState) => {
      const newVisibleState = [...prevState];
      newVisibleState[index] = !newVisibleState[index];
      return newVisibleState;
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products: {error.message}</div>;


  

  return (
    <TableContainer component={Paper} sx={{marginTop:'5rem'}}>
      <Table>
        <TableBody>
          {[...Array(4)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(5)].map((_, colIndex) => {
                const productIndex = rowIndex * 5 + colIndex;
                return (
                  <TableCell
                    key={colIndex}
                    onClick={() => handleClick(productIndex)}
                    sx={{
                      backgroundColor: visibleProduct[productIndex] ? 'white' : 'black',
                      cursor: 'pointer',
                      padding: '16px',
                      textAlign: 'center',
                       border: '1px solid #e0e0e0'
                    }}
                  >
                    {visibleProduct[productIndex] && products[productIndex] && (
                      <Card sx={{ maxWidth: 150, margin: 'auto' }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={products[productIndex].image}
                          alt={products[productIndex].title}
                        />
                        <CardContent>
                          <Typography variant="body2" color="textSecondary">
                            {products[productIndex].title}
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;


