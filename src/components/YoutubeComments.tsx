import React, { useState, useEffect } from "react";
import ToxcicityModel from "./ToxicityModel";

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

interface Props {
  videoID: string;
}

interface YouTubeApiResponse {
  nextPageToken: string;
  items: CommentItem[];
}
function YoutubComments({ videoID }: Props) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?&part=snippet&key=AIzaSyA1rtl4Z_rFx8Vs4yVW3ea9KgHpBOazKDs&videoId=${videoID}&maxResults=10`
        );
        const data: YouTubeApiResponse = await response.json();

        if (data.items) {
          if (nextPageToken) {
            setComments(data.items);
          } else {
            setComments((prevComments) => [...prevComments, ...data.items]);
          }
          setNextPageToken(data.nextPageToken);
        } else {
          console.error("No comments found in the response");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const loadMoreComments = () => {
    setNextPageToken(nextPageToken);
  };

  return (
    <div className="container-fluid" style={{ margin: 50 }}>
      <div className="row">
        <div className="col-md-10">
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
              {comments.map((comment, index) => (
                <>
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {
                        comment.snippet.topLevelComment.snippet
                          .authorDisplayName
                      }
                    </td>
                    <td>
                      {comment.snippet.topLevelComment.snippet.textDisplay}
                    </td>
                    <td>
                      <ToxcicityModel
                        text={
                          comment.snippet.topLevelComment.snippet.textDisplay
                        }
                      ></ToxcicityModel>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>

          {nextPageToken && (
            <button onClick={loadMoreComments}>Load More</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default YoutubComments;
