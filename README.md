# Trip Organizer

Trip Organizer is a tool that simplifies your travel planning process.

## Functionality

### What is Trip Organizer?
Trip Organizer is a SpringBoot application designed to help users organize their trips more efficiently. Users can recieve personalized recommendations for attractions and accommodations based on their chosen location and budget. Trip Organizer achieves this by integrating OpenAI's GPT API. Users can select from the recommended options as well as further options given by the service, as well as further customize their trip details. 

### How does the GPT-based recommendation work?
1. On the frontend, the user provides their desired location and budget through the given form.
2. When the user submits the form a POST request is sent to the ```GPTService``` in the backend.
3. The ```GptServiceImplementation``` prepares this request by calling the OPEN AI API at the URL https://api.openai.com/v1/chat/completions. We put that we want to use the GPT model in the request body, as well as a predefined prompt that includes the users' chosen location and budget.
4. GPT processes the prompt and returns a response, with suggested attraction and accommodations, as well as their details. 
5. The response is then parsed in the ```GptServiceImplementation``` class using the ```RequestUtility.parseResponse()``` method. The given recommendations are saved in the application's database (if they don't already exist) through the ```RequestUtility.saveParsedData()``` method.
6. The frontend recieves the GPT response, through the ```GetRequestPage``` component, and display's the given recommendaions.
7. After reviewing the recommendations, the user selects the accommodations and attractions they want to include in their trip by checking corresponding boxes. Then they proceed to the next step of their trip planning.

## Features

**GPT-Based Recommendations:** The users of Trip Organizer can get personalized recommendations for their trip. They can choose a specific location and specific budget and get recommendations for attractions and accommodations that do not go over the users' budget.

**Trip Planning and Trip Management:** Users can customize their trips. They can create, edit and delete trips. They have a wide variety of selections for their acommodations and attractions either through the GPT -based recommendations or directly from the database. The budget is automatically calculated as the user is adding their trip details.

**User Authentication:** The users can register and log in to manage their trips. Trip Organizer uses JWT-based authentication to ensure secure user sessions.

## Api Endpoints

### Authentication Endpoints:
```POST /api/auth/signup```: Register a new user.

```POST /api/auth/login```: Authenticate a user and retrieve a JWT token.

### Trip Endpoints:
```GET /api/trips```: Retrieve all trips.

```POST /api/trips```: Create a new trip.

```PUT /api/trips/{id}```: Update an existing trip.

```DELETE /api/trips/{id}```: Delete a trip by ID.

### Attraction & Accommodation Endpoints:
```GET /api/attractions```: Retrieve all attractions.

```GET /api/accommodations```: Retrieve all accommodations.

### GPT Recommendation Endpoints:
```POST /api/gpt/prompt```: Send user input (location, budget) and receive recommendations.

**Example:**
Request body
```
{
    "location": "Rome",
    "budget": 2000.0
}
```

**Example:**
Response body

```
{ 
"attractions": [
    {
      "name": "Colosseum",
      "location": "Rome",
      "price": 20,
      "description": "Explore the ancient Roman amphitheater, one of the most iconic landmarks in the world."
    },
    {
      "name": "Vatican Museums",
      "location": "Rome",
      "price": 25,
      "description": "Discover the rich art and history housed within the Vatican, including the Sistine Chapel."
    }],
"attractions": [
    {
      "name": "Colosseum",
      "location": "Rome",
      "price": 20,
      "description": "Explore the ancient Roman amphitheater, one of the most iconic landmarks in the world."
    },
    {
      "name": "Vatican Museums",
      "location": "Rome",
      "price": 25,
      "description": "Discover the rich art and history housed within the Vatican, including the Sistine Chapel."
    }]

}
```

## Technical Specifications:

Backend:

- JAVA v17
  - Spring Boot v3.3.1
  - Lombok v1.18.32
- JWT
  - jjwt-api v0.11.5
  - jjwt-impl v0.11.5
  - jjwt-jackson v0.11.5

Frontend:

- React
- React Router
- Axios

## Installation

Clone the repository

```git clone https://github.com/Mila-Slavkovska/TravelService.git```

Set up the required environment variables for OpenAI and JWT in the ```application.properties```

```
openai.api.key=YOUR_OPENAI_API_KEY
security.jwt.secret-key=YOUR_SECRET_KEY
security.jwt.expiration-time=EXPIRATION_TIME
```
You can get your OPENAI API key [here](https://platform.openai.com/api-keys)

**Set up the database using Docker Compose**

Run the following command
```docker compose up```

Build the project using Maven: ```mvn install```

Run the backend: ```mvn spring-boot:run```

Frontend: 

Navigate to the front-end directory: ```cd frontend```

Install the dependencies: ```npm install```

Run the development server: ```npm start```
