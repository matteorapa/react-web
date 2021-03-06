import React from 'react';
import authentication from '../authentication';

export default class DarkMode extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            darkMode : 'white',
            themeColor : 'purple'
        }
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
    }

     async componentDidMount(){
        //api request to get the dark mode state, and set the state accordingly
        if(authentication.isAuthenticated()){
            await fetch('https://myvault.technology/api/pref', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authentication.token,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    
                    this.setState(function() {
                        return {
                            themeColor: response.output[0].colour,
                            darkMode: response.output[0].dark
                        };
                      });

                      
                }
                else {
                    console.log('There was an error loading theme settings from darkmode component');
                    console.log(response.output);
                }

            })

            .catch((error) => {
                console.log(error);
            });
        }
        

        if(this.state.darkMode === 'grey'){
            this.dark();
        }else {
            this.light();
        }

    }

    async updateTheme(mode, cb) {

        
        await fetch('https://myvault.technology/api/pref', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authentication.token,
            },
            body: JSON.stringify({
                colour: this.state.themeColor,
                dark: mode,
            })
        })
      
            .then(response => (response.json()))
            .then((response) => {
      
                if (response.success) {
                  cb();
                }
                else {
                    console.log('Error when updating theme!')
                    
                }
            })
            .catch(error => console.log(error))
      
      }

    async toggleDarkMode(){  
        
        if(this.state.darkMode === 'grey'){
            this.setState({
                  darkMode: 'white'
              })

            await this.updateTheme('white', () => {
                  console.log('Switched to light mode')
            })
            this.light();
        }else {
            this.setState({
                darkMode: 'grey'
            })
            await this.updateTheme('grey', () => {
                console.log('Switched to dark mode')
            })
            this.dark();
        }
    }

    light(){

        document.body.style.setProperty('--background-color', 'rgb(255, 255, 255)');
        document.body.style.setProperty('--text-color', 'rgb(15, 15, 15)');
        document.body.style.setProperty('--light-color', 'rgba(210, 210, 210, 0.65)');
        document.body.style.setProperty('--dark-color', 'rgb(0, 0, 0)');
        document.body.style.setProperty('--shadow-color', 'rgb(204, 204, 204)');
        document.body.style.setProperty('--theme-color', this.state.themeColor);

    }

    dark(){

        document.body.style.setProperty('--background-color', 'rgb(35, 35, 38)');
        document.body.style.setProperty('--text-color', 'rgb(250, 250, 250)');
        document.body.style.setProperty('--light-color', 'rgba(25,25,28,0.65)');
        document.body.style.setProperty('--dark-color', 'rgb(0, 0, 0)');
        document.body.style.setProperty('--shadow-color', 'rgb(10, 10, 10)');
        document.body.style.setProperty('--theme-color', this.state.themeColor);

    }

    render() {
        if(authentication.isAuthenticated()){
            if(this.state.darkMode === 'grey'){
                return (
                    <button type="button" className="btn btn-dark side-margin" onClick={this.toggleDarkMode}>Dark Mode <i className="far fa-moon"></i></button>
                  );
            }else {
                return (
                    <button type="button" className="btn btn-light side-margin" onClick={this.toggleDarkMode}>Light Mode <i className="far fa-lightbulb"></i></button>
                    
                  );
            }
        }else {
            return ( <span></span>);
        }
        

      
    }
  }