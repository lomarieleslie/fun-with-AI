import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import React from "react";

const OpenAI = () => {

  // Initialize state and variables to hold user's initial inputs + Open AI response 

  const [userInputting, setUserInputting] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [userPhrase, setUserPhrase] = useState("");
  const [results, setResults] = useState([]);

  // Initialize state and variables to hold user's Previous Prompts + Responses

  const [prevResponses, setPrevResponses] = useState([]);

  const currentResponse = {
    prompt: { userPrompt },
    response: { results },
  };

  const responseHistory = [currentResponse, ...prevResponses];

//  Fetching OPEN AI Data:

  useEffect(() => {
    const data = {
      prompt: userPrompt,
      max_tokens: 500,
      temperature: 1,
      n: 1,
      stream: false,
      logprobs: null,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.choices) {
          setResults(responseJson.choices);
        }

        console.log(responseJson.choices);
      });
  }, [searchTerm, userPrompt]);

  const handleInputting = (event) => {
    setUserPhrase(event.target.value);
  };

  const handleSubmitting = (event) => {
    event.preventDefault();
    setSearchTerm(userInputting);
    setUserPrompt(userPhrase);
    setPrevResponses(responseHistory);
    setUserInputting("");
    setUserPhrase("");
  };

  

  return (
    <div className="container">
      <h1>Fun with AI</h1>
      <form onSubmit={handleSubmitting}>
        <label className="PromptInput Label" htmlFor="prompt">
          Enter Prompt:
        </label>
        <div className="submitPrompt">
          <TextField
            required
            className="searchTerm"
            placeholder="Tell me a story about..."
            type="text"
            id="outlined-required"
            value={userPhrase}
            onChange={handleInputting}
          />
          <button type="submit" className="submitButton">
            Submit
          </button>
        </div>
      </form>

          <ul className="responseContainer">
            {responseHistory.map((prevResponses, i) => {
              if (prevResponses.response.results.length === 0) return null;
              if (prevResponses.prompt.userPrompt === "") return null;
              return (
                <li key={`prevResponses-${i}`}>
                  <h2>Prompt:</h2>
                  <p className="userPrompt">{prevResponses.prompt.userPrompt}</p>
                  <h2>Response:</h2>
                  <p>{prevResponses.response.results[0].text}</p>
                </li>
              );
            })}
          </ul>
        </div>
  
  );
};

export default OpenAI;
