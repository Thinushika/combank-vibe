import React from 'react'


// {
//     "progress": 100,
//     "createdAt": "2023-04-04T13:07:01.927Z",
//     "buttons": [
//         "U1",
//         "U2",
//         "U3",
//         "U4",
//         "🔄",
//         "V1",
//         "V2",
//         "V3",
//         "V4"
//     ],
//     "imageUrl": "your-image-url",
//     "buttonMessageId": "OtfxNzfMIKBPVE1aP4u4",
//     "originatingMessageId": "your-message-id",
//     "content": "your-original-prompt",
//     "ref": "",
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
            "msg": userPrompt
         }),
    });

    if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
    }
    
    const data = await response.json();
    console.log("imagine : ",data)
}