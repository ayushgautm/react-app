import { string } from '@tensorflow/tfjs';
import React, { useEffect,useState } from 'react';

 interface Props{
   text:string; 
};




function ToxcicityModel(props:Props)
{
     const [predictions, setPredictions] = useState(Boolean);

  // Function to make the API call and get predictions
  const getPredictions = async () => {
    try {
      const response = await fetch('http://localhost:3000/predict', {
        method: 'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }

      const data = await response.json();
      setPredictions(data.predictions);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(predictions);
  // Call getPredictions when the component mounts or when text changes
  useEffect(() => {
    getPredictions();
  }, [props]);
    if(predictions)
        {
            return<div style={{color:"red"}}>{"true"}</div>
        }
    else
    {
        return<div style={{color:"Green"}}>{"False"}</div>
    }
}

export default ToxcicityModel;
