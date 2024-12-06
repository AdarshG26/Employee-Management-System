const BASE_URL = 'http://localhost:3000'

export const getAllEmployees = async (search= '', page= 1, limit= 5) => {
    const url = `${BASE_URL}/employee?search=${search}&page=${page}&limit=${limit}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const result = await fetch(url, options);
        const data = await result.json(); 
        return data;
    } catch(err) {
        return err;
    }
}



export const createEmployee = async (empObj) => {
    const url = `${BASE_URL}/employee`;
    console.log('URL', url);
    
    const formData = new FormData();

    for(const key in empObj){
        formData.append(key, empObj[key])
    }
    const options = {
        method: 'POST',
        body: formData
    }
    try {
        const result = await fetch(url, options);
        const data = await result.json(); 
        return data;
    } catch (err) {
        return err;
    }
}


export const updateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/employee/${id}`;
    console.log('URL', url);
    const formData = new FormData();

    for(const key in empObj){
        formData.append(key, empObj[key])
    }
    const options = {
        method: 'PUT',
        body: formData
    }
    try {
        const result = await fetch(url, options);
        const data = await result.json(); 
        console.log('<-------update------->', data);
        return data;
    } catch (err) {
        return err;
    }
}

export const deleteEmployeeById = async (id) => {
    const url = `${BASE_URL}/employee/${id}`;
    
    const options = {
        method: 'Delete',
    }
    try {
        const result = await fetch(url, options);
        const data = await result.json(); 
        return data;
    } catch (err) {
        return err;
    }
}