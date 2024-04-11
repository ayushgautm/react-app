import React, { useState, useEffect } from 'react';

interface CommentItem {
    id: string;
    snippet: {
      topLevelComment: {
        snippet: {
          authorDisplayName: string;
          textDisplay: string;
        };
      };
    };
  }
interface YouTubeApiResponse {
    nextPageToken:string;
    items: CommentItem[];
  }
 /*const Toxcity_checker=()=>{const threshold = 0.9;
    toxicity.load(threshold).then(model => {
      const sentences = ['you suck'];
    
      model.classify(sentences).then(predictions => {
        console.log(predictions); 
    });
 }); */

function App()
{
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
    
    useEffect(() => {
        const fetchComments = async () => {
          try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?pageToken=${nextPageToken||''}&part=snippet&key=AIzaSyA1rtl4Z_rFx8Vs4yVW3ea9KgHpBOazKDs&videoId=SqcY0GlETPk&maxResults=10`);
            const data: YouTubeApiResponse = await response.json();
    
            if (data.items) {
                if (nextPageToken) {                    
                    setComments(data.items);
                  } else {                    
                    setComments(prevComments => [...prevComments, ...data.items]);
                  }
                  setNextPageToken(data.nextPageToken);           
            } else {
              console.error('No comments found in the response');
            }
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
        };
    
        fetchComments();
      }, []);

      const loadMoreComments = () => {    
        setNextPageToken(nextPageToken);
      };
      //console.log(comments);
    return     <div className="container-fluid" style={{margin:50}}>
	<div className="row">
		<div className="col-md-12">
			<nav>
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<a href="#">Instagram</a>
					</li>
					<li className="breadcrumb-item">
						<a href="#">Facebook</a>
					</li>
					<li className="breadcrumb-item active">
						Youtube
					</li>
				</ol>
			</nav>
			<div className="page-header">
				<h1>
					Toxcicity Detector 
                    <br></br>
                    <small><small>Enter the Url inside the textbox</small></small>
				</h1>
			</div>
			<form role="form">
				<div className="form-group">					 					
					<input type="text" className="form-control" id="exampleInputEmail1"></input>
				</div>
                <br></br>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
            <table className="table">
  <thead>
    <tr>
      <th scope="col">Index</th>
      <th scope="col">YoutubHandle</th>
      <th scope="col">Comment</th>
      <th scope="col">Toxic</th>
    </tr>
  </thead>
  <tbody>
  {comments.map((comment,index) => (
    <><tr key={index}>
    <th scope='row'>{index+1}</th>
    <td>{comment.snippet.topLevelComment.snippet.authorDisplayName}</td>
    <td>{comment.snippet.topLevelComment.snippet.textDisplay}</td>
    <td><ToxcicityModel text={comment.snippet.topLevelComment.snippet.textDisplay}></ToxcicityModel></td></tr></>
        ))}
  </tbody>
  </table>
     
  {nextPageToken && (
        <button onClick={loadMoreComments}>Load More</button>
      )}
		</div>
	</div>
</div>
}   

export default App;