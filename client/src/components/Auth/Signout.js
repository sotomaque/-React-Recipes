import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'

import { ApolloConsumer } from 'react-apollo';


const Signout = () => {
    
    const history = useHistory();

    const handleSignout = (client) => {
        localStorage.setItem('token', '');
        client.resetStore();
        history.push('/');
    }

    return (
        <ApolloConsumer>
        { 
            client => {
                return (
                    <Button color="inherit" variant="outlined" onClick={() => handleSignout(client) }>Sign Out</Button>
                )
            }
        }   
        </ApolloConsumer>
    )
}

export default Signout
