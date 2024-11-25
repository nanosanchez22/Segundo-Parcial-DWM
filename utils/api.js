const BASE_URL = 'http://172.20.10.12:8000'; //172.29.112.1
//const BASE_URL = 'http://172.29.112.1:8000'; 
//const BASE_URL = 'http://localhost:8000';



export const getDestinations = async () => {
    const response = await fetch(`${BASE_URL}/destinations`);
    const data = await response.json();
    return data;
};

export const getDestination = async (id) => {
    const response = await fetch(`${BASE_URL}/destinations/${id}`);
    const data = await response.json();
    return data;
};

export const addDestination = async (destination) => {
    const response = await fetch(`${BASE_URL}/destinations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(destination),
    });
    const data = await response.json();
    return data;
};

export const updateDestination = async (destination) => {
    const response = await fetch(`${BASE_URL}/destinations/${destination.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(destination),
    });
    const data = await response.json();
    return data;
};

export const deleteDestination = async (id) => {
    console.log("al enviar ",`${BASE_URL}/destinations/${id}`);
    const response = await fetch(`${BASE_URL}/destinations/${id}`, {
        method: 'DELETE',
        type: "application/json",
    });
    
    return response.ok;
};