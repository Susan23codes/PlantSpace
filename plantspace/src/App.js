import './App.css';
import { useState } from "react"
import NavBar from "./Components/NavBar"
import Questions from './Questions'
import IndividualQuestion from './IndividualQuestion';
import Login from './Login'
import axios from 'axios'
import { Routes, Route, useNavigate} from 'react-router-dom'
import ProfilePage from "./Components/ProfilePage"
import AskQuestion from './Components/AskQuestion';
import useLocalStorageState from 'use-local-storage-state'



function App() {
  const [token, setToken] = useLocalStorageState('libraryToken', null)
  const [username, setUsername] = useLocalStorageState('libraryUsername', '')

  const setAuth = (username, token) => {
    setToken(token)
    setUsername(username)
  }

  const handleLogout = () => {
    axios
      .post(
        'https://drf-library-api.herokuapp.com/api/auth/token/logout',
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() =>
        setAuth('', null)
      )
  }

  const navigate = useNavigate()

  
//   const questions = [
//     {
//         "id": 1,
//         "user": "Matt",
//         "title": "Why is my pothos dying?",
//         "body": "I've had this plant for 2 years and I haven't changed anything and now it's dying, help!",
//         "answers": [{"user": "Elise", "body": "Do you make sure you take the dead leaves off?"}]
//     },
//     {
//         "id": 2,
//         "user": "Fred",
//         "title": "Garden of Weedin'",
//         "body": "Can anyone recommend a good environmentally friendly weed-killer?",
//         "answers": [{"user": "Tom", "body": "Try some vinegar!"}]
//     },
//     {
//         "id": 3,
//         "user": "Karen",
//         "title": "Low maintenance?",
//         "body": "What sort of plants would you suggest that are very low maintenance?",
//         "answers": [{"user": "Bob", "body": "I think pothos are great in low light!"}, {"user": "Julie", "body": "Snake plants are also great!"}]
//     },
//     {
//         "id": 4,
//         "user": "Katie",
//         "title": "Good low-light plants?",
//         "body": "I don't have a lot of light in my house and would like some suggestions for low-light plants!",
//         "answers": [{ "user": "Frank", "body": "Get more lights!" }, { "user": "Tom", "body": "Pothos is a great low-light plant!" }]
//     }
// ]

const isLoggedIn = username && token
 
  return (
    <>
    
        <div className="App">
          <NavBar setAuth={setAuth} token={token} handleLogout={handleLogout}  Login={Login} isLoggedIn={isLoggedIn} navigate={navigate}/>
          <div>
        </div>
        <AskQuestion />
        <Routes>
          <Route 
            path="/login"
            element={<Login setAuth={setAuth} isLoggedIn={isLoggedIn} navigate={navigate}/>}
            />
          <Route
            path="/"
            element={<Questions isLoggedIn={isLoggedIn} token={token} username={username}/>}
            />
          <Route
            path="/question/{pk}"
            element={<IndividualQuestion isLoggedIn={isLoggedIn} token={token} username={username}/>}
            />
         </Routes>
        {/* <ProfilePage 
        questions={questions}
        answers={questions.answers}/> */}
      </div>
      
      
    </>
  );
}

export default App;
