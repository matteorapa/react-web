class Authentication{
    constructor(){
        this.authenticated = true;
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsidXNlcmlkIjoxMjMsIm5hbWUiOiJNYXR0ZW8iLCJlbWFpbCI6IjJAMi4yIiwiZG9iIjoiMjAyMC0wMy0wNVQwMDowMDowMC4wMDBaIiwic3VybmFtZSI6IlJhcGEifSwiaWF0IjoxNTg1NzgxMjQ2LCJleHAiOjE1ODU3ODQ4NDZ9.yi83qF-zenq55Tp1rRRh5ICDZmFlwpfLEV1lY4l8ZCk';
    }

    async login(email, password, cb){
        //todo  api call here
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Allow-Control-Allow-Credentials': 'true' },
            body: JSON.stringify({ 
                email: email,
                password: password

            })
        };
        let response = await fetch('http://myvault.technology/api/login', requestOptions);
        const status= await response.status;

        if(status === 200){
            console.log('Credentials match');
            this.authenticated = true;
            //console.log(response.json());
            //this.token = response.json().token;
            cb();
        }else if(status === 422){
            console.log('Invalid email or password');
        }else {
            console.log('An error has occured during signin');
        }
        
    }

    logout(cb){
        this.authenticated = false;
        this.token = null;
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }

    async createUser(name, surname, date, email , password, cb){
        //api call to add user
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Allow-Control-Allow-Credentials': 'true' },
            body: JSON.stringify({ 
                name: name,
                surname: surname,
                dob: date,
                email: email,
                password: password

         })
        };
        let response = await fetch('http://myvault.technology/api/users', requestOptions);
        const status= await response.status;

        if(status === 201){
            console.log('User created successfully');
            cb();

        }else if(status === 409){
            console.log('Conflict. Email already used');

        }else{
            console.log('An error has occured');
            console.log(response);
        }
    }
}

export default new Authentication();