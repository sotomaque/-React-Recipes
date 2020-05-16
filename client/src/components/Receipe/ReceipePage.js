import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_RECIPE } from '../../queries';


const ReceipePage = () => {
    const { receipeId } = useParams();
    const { data, loading, error } = useQuery(GET_RECIPE, {
        variables: { _id: receipeId }
    });

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    return (
        <div className="App">
            <h2>{data.getRecipe.name}</h2>
            <p>Category: {data.getRecipe.category}</p>
            <p>Description:  {data.getRecipe.description}</p>
            <p>Instructions: {data.getRecipe.instructions}</p>
            <p>Likes: {data.getRecipe.likes}</p>
            <p>Created By: {data.getRecipe.category}</p>
            <button></button>
        </div>
    )
}

export default ReceipePage
