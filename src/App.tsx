import YoutubComments from "./components/YoutubeComments";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setUrl(e.target.value);
    console.log(url);
    setErrorMessage(""); // Reset error message when user types in the input field
  };

  const extractVideoId = () => {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(youtubeRegex);

    if (match) {
      // Extract the video ID from the matched URL
      const id = match[1];
      setVideoId(id);
      console.log(videoId);
    } else {
      setVideoId("");
      setErrorMessage("Please enter a valid YouTube URL.");
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    extractVideoId();
  };

  return (
    <div className="container-fluid" style={{ margin: 50 }}>
      <div className="row">
        <div className="col-md-10">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Instagram</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Facebook</a>
              </li>
              <li className="breadcrumb-item active">Youtube</li>
            </ol>
          </nav>
          <div className="page-header">
            <h1>Toxcicity Detector</h1>
            <br></br>
            <h6>Enter the Url inside the textbox </h6>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="url"
                value={url}
                onChange={handleInputChange}
                placeholder="Enter the URL"
              ></input>
              <br></br>
              <h6>Or Enter the Text Below</h6>
              <textarea
                style={{ height: "80px" }}
                className="form-control"
                id="textInput"
                placeholder="Enter the Text"
              ></textarea>
            </div>
            <br></br>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
          {videoId && <YoutubComments videoID={videoId}></YoutubComments>}
        </div>
      </div>
    </div>
  );
}
