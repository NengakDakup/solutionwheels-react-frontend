import axios from 'axios'

const addTokenToHeader = token => {
    if(token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default addTokenToHeader;