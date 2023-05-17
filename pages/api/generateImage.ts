import React from 'react'


// {
//     "success": true,
//     "messageId": "your-message-id",
//     "createdAt": "2023-04-04T13:07:01.927Z"
//   }

//   {
//     "createdAt": "2023-04-04T13:05:01.927Z",
//     "content": "Your now in relax mode",
//     "ref": "",
//     "type": "relax",
//     "responseAt": "2023-04-04T13:06:01.927Z"
// }

export default async function(req: { body: { userPrompt: string; }; }, res: any){
    const userPrompt = req.body.userPrompt || '';
    console.log("data prompt :", userPrompt);

    const response = await fetch('https://api.thenextleg.io/v2/imagine', {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${process.env.NEXT_LEG}`, 
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({ 
            "msg": "an amazing cat with white fur walking in the forests"
         }),
    });

    if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
    }
    
    const data = await response.json();
    console.log("imagine : ",data)
}