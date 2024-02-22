import { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';

const getMyAds = () => {
    const [ads, setAds] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchAds();
    }, [ads]);

    const fetchAds = async () => {
        try {
            const request = await fetch(`${Global.url}post/getPosts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            });
            const response = await request.json();
            if (response.status === 'error') {
                console.log(response.message);
                return;
            }
            if (response.status === 'success') {
                setAds(response.posts);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return ads;
};

export default getMyAds;