import {Component} from "react";

import { WiHumidity } from "react-icons/wi";

import { FaWind } from "react-icons/fa6";

import "./index.css"

import {Hourglass} from "react-loader-spinner"

// Define constants for different conditions
const conditions={
    isSuccess:"SUCCESS",
    isFailure:"FAILURE",
    isLoader:"LOADER"
}

const conditionsOne={
    isSuccess:"SUCCESS",
    isFailure:"FAILURE",
    isLoader:"LOADER"
}

class Home extends Component{
    
    state={datetime:"",defaultDateTime:"",weatherStorageData:[],defaultWeatherStorage:[],userInputValue:"",statusDefault:conditionsOne.isLoader,status:conditions.isLoader,darkMode:false}

    componentDidMount(){

        // Fetch default weather data when the component mounts
    
        this.fetchDefault()
    
    }



    
    handleError=(error)=>{

        // Log the error to the console for debugging purposes

        console.log("Error fetching weather data:",error);



    }

    fetchDefault=async()=>{
      
        // Set the default status to loader
        this.setState({statusDefault:conditionsOne.isLoader})

        const key="43cb9982139dd169fa8c54b44a128b5c"
      
        const search="Hyderabad"
       const api=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=${key}`
       const options={
        method:"GET"
       }


       try{
        const response=await fetch(api,options)
        console.log(response)
        if(response.ok===true){
        const responseToJson=await response.json()
        console.log(responseToJson)
        
        // Extract relevant weather data from the API response
        const weatherData={
            name:responseToJson.name,
            id:responseToJson.id,
            temp:responseToJson.main.temp,
            dt:responseToJson.dt,
            timezone:responseToJson.timezone,
            windspeed:responseToJson.wind.speed,
            humidity:responseToJson.main.humidity,
            temperatureMinimum:responseToJson.main.temp_min,
            temperatureMaximum:responseToJson.main.temp_max,
            description:responseToJson.weather[0].description,
            main:responseToJson.weather[0].main,
            icons:responseToJson.weather[0].icon,
            cloudsTotal:responseToJson.clouds.all,
            visibility:responseToJson.visibility,
            country:responseToJson.sys.country
        }
        
        const dateData=new Date((weatherData.dt*1000)-(weatherData.timezone*1000))
        console.log(dateData)


        // Update the state with the fetched default weather data

        this.setState({defaultDateTime:dateData,defaultWeatherStorage:weatherData,statusDefault:conditionsOne.isSuccess})

        }
        else{
            
            // Hanlde non-ok response 

            this.setState({statusDefault:conditionsOne.isFailure})
            this.handleError(new Error(`HTTP error ${response.status}`))
           
        }
    }
    catch(error){
        this.setState({statusDefault:conditionsOne.isFailure})
        this.handleError(error)
       
    }


    }



    fetchWeather=async()=>{
        const {userInputValue}=this.state

        // Set the status to loader before fetching weather data

        this.setState({status:conditions.isLoader})

        const key="43cb9982139dd169fa8c54b44a128b5c"
      
       const search=userInputValue
       const api=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=${key}`
       const options={
        method:"GET"
       }


       try{
        const response=await fetch(api,options)
        console.log(response)
        if(response.ok===true){
        const responseToJson=await response.json()
        console.log(responseToJson)
        
        // Extract relevant weather data from the API response
        const weatherData={
            name:responseToJson.name,
            id:responseToJson.id,
            temp:responseToJson.main.temp,
            dt:responseToJson.dt,
            timezone:responseToJson.timezone,
            windspeed:responseToJson.wind.speed,
            humidity:responseToJson.main.humidity,
            temperatureMinimum:responseToJson.main.temp_min,
            temperatureMaximum:responseToJson.main.temp_max,
            description:responseToJson.weather[0].description,
            main:responseToJson.weather[0].main,
            icons:responseToJson.weather[0].icon,
            cloudsTotal:responseToJson.clouds.all,
            visibility:responseToJson.visibility,
            country:responseToJson.sys.country
        }
        
        const dateData=new Date((weatherData.dt*1000)-(weatherData.timezone*1000))
        console.log(dateData)
        

        // Update the state with the fetched weather data

        this.setState({datetime:dateData,weatherStorageData:weatherData,status:conditions.isSuccess})

        }
        else{
            
            // Hanlde non-ok response 
            
            this.setState({status:conditions.isFailure})
          
            this.handleError(new Error(`HTTP error ${response.status}`))
           
        }
    }
    catch(error){
        
       this.setState({status:conditions.isFailure})
        this.handleError(error)
       
    }


    }

    userInput=(event)=>{

        // Update the userInputValue state with the input value
        this.setState({userInputValue:event.target.value})
    }

    loader=()=>{

        // Render a loader component while fetching weather data

       return( <div className="loader-bg">
            <div>
            <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
            />
  <h1>...Loading</h1>
            </div>
        </div>)
    }

    
    loaderDefault=()=>{
        // Render a loader component while fetching default weather data

        return(<div className="loader-bg">
            <div>
            <Hourglass visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
            />

            <h1>...Loading</h1>
            </div>
        </div>)
    }


    showingWeatherData=()=>{
        const {weatherStorageData,datetime}=this.state
        

        // Render the searched weather data component
        return(
        
        <div className="weather-card">
        <h1>{weatherStorageData.name} / {weatherStorageData.country}</h1>

      
        <div>
            <p>max temp {weatherStorageData.temperatureMaximum}&deg;</p>

            <div className="temperature-icon">
            <h1>{weatherStorageData.temp}&deg; C</h1>
            <div>
            <img src={`http://openweathermap.org/img/w/${weatherStorageData.icons}.png`} alt="not-found"/>
            </div>
            </div>


            <p>min temp {weatherStorageData.temperatureMinimum}&deg;</p>
        </div>

        <p>Visibility: {weatherStorageData.visibility} meters</p>

        <div className="humidity-flex">
        <p>Humidity: {weatherStorageData.humidity} %</p>
        <div>
        <WiHumidity size={30}/>
        </div>
        </div>

        <div className="humidity-flex">
        <p>Wind speed: {weatherStorageData.windspeed} m/s</p>
        <div>
        <FaWind size={30} />
        </div>
        </div>
      
       
        <p>{weatherStorageData.main} ({weatherStorageData.description})</p>
        <p>Date & time{datetime.toLocaleString()}</p>

    </div>

        )

    }

    defaultWeatherData=()=>{
        const {defaultWeatherStorage,defaultDateTime}=this.state


        // Render the default weather data component
        return(
        
        <div className="weather-card">
        <h1>{defaultWeatherStorage.name} / {defaultWeatherStorage.country}</h1>
       
      
        <div>
            <p>max temp {defaultWeatherStorage.temperatureMaximum}&deg;</p>
            <div className="temperature-icon">
            <h1>{defaultWeatherStorage.temp}&deg; C</h1>
            <div>
            <img src={`http://openweathermap.org/img/w/${defaultWeatherStorage.icons}.png`} alt="not-found"/>
            </div>
            </div>
            <p>min temp {defaultWeatherStorage.temperatureMinimum}&deg;</p>
        </div>
        <p>Visibility: {defaultWeatherStorage.visibility} meters</p>
        <div className="humidity-flex">
        <p>Humidity: {defaultWeatherStorage.humidity} %</p>
        <div>
        <WiHumidity size={30}/>
        </div>
        </div>


        <div className="humidity-flex">
        <p>Wind speed: {defaultWeatherStorage.windspeed} m/s</p>
        <div>
        <FaWind size={30} />
        </div>
        </div>
      
       
        <p>{defaultWeatherStorage.main} ({defaultWeatherStorage.description})</p>

        
        <p>Date & time {defaultDateTime.toLocaleString()}</p>

    </div>

        )

    }


    tellToUserSearch=()=>(

        // Render a message to prompt the user to seach for a city

        <div className="searched-info">

            <p>Please Enter a correct City name. <br/>Weather info appear here...</p>

            <div>
                <img className="user-weather-image" src="https://i.ibb.co/t8x5yq5/warm-98534-1920.png" alt="not-found"/>
            </div>
        </div>
    )

    showData=()=>{
        const {status}=this.state

        // Render the appropriate component based on the status
        switch(status){
            case conditions.isLoader:
                return this.loader()
            case conditions.isSuccess:
                return this.showingWeatherData()
            case conditions.isFailure:
                return this.tellToUserSearch()
            default:
                return null
        }
    }

    defaultData=()=>{
        const {statusDefault}=this.state

        // Render the appropriate component based on the default status
        switch(statusDefault){
            case conditionsOne.isLoader:
                return this.loaderDefault()
            case conditionsOne.isSuccess:
                return this.defaultWeatherData()
            case conditionsOne.isFailure:
                return <h1>Something went wrong.</h1>
            default:
                return <h1>Something went wrong.</h1>
        }
    }


    changeDarkMode=()=>{
        const {darkMode}=this.state

        // Toggle the dark mode state
        this.setState({darkMode:!darkMode})
    }

    searching=()=>{

        // Fetch weather data for the user and reset the input value
        this.fetchWeather()
        this.setState({userInputValue:""})
    }

    render(){

        const {userInputValue,darkMode}=this.state
      

        return(

            <div className={darkMode===true?"dark-mode-container":"weather-container"}>

                <div className={darkMode===true?"nav-bar-dark":"nav-bar"}>

                    <div>
                        <img className="company-logo" src="https://i.ibb.co/6PmG2Qd/Screenshot-2024-06-15-120252.png" alt="weather-logo-not-found"/>
                    </div>
                    <div>
                        <p className="weather-para">Stay updated with real-time weather forecasts at your fingertips. From sunny skies to storm alerts, be prepared for any weather condition with our reliable and user-friendly app.</p>
                    </div>
                    <div>
                     
                        {
                            darkMode===true?<button className="sun-button" onClick={()=>this.changeDarkMode()} type="button"><img className="sun-image" src="https://i.ibb.co/84P4nNX/icon-1294224.png" alt="lightMode"/></button>:<button className="moon-button" onClick={this.changeDarkMode} type="button"><img className="moon-image" src="https://i.ibb.co/SBkWQJq/moon-25454-1920.png" alt="darkMode"/></button>
                        }
                    </div>
                </div>
            

            <div className={darkMode===true?"change-background-dark":"change-background-white"}>
            
            <hr className="hr"/>
            <p className="smaller-screen-weather-para">Stay updated with real-time weather forecasts at your fingertips. From sunny skies to storm alerts, be prepared for any weather condition with our reliable and user-friendly app.</p>
                  
            
            <div className="user-input">
                <div>
                    <input className="search-input" value={userInputValue} onChange={this.userInput} type="search" placeholder="Enter city name"/>
                    <button className="search-button" onClick={()=>this.searching()} type="button">Search</button>
                </div>
            </div>

            <br/>

        <div className="multiple-weathers">
            <div>

                {
                    this.showData()
                }

                </div>

                <div>

                {
                    this.defaultData()
                }
                </div>
        </div>


            </div>

            </div>
        )
    }
}

export default Home