const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parser

const app = express();

// Middleware
app.use(bodyParser.json());


// This section represents sample data similar to a database

  // Define centers for products

const center = {
    A:"C1",
    B:"C1",
    C:"C1",
    D:"C2",
    E:"C2",
    F:"C2",
    G:"C3",
    H:"C3",
    I:"C3"
  }
  // Define weights for products

  const weight = {
    A:3,
    B:2,
    C:8,
    D:12,
    E:25,
    F:15,
    G:0.5,
    H:1,
    I:2
  }
  
  // Define distances between centers
  const distance = {
    C1:3,
    C2:2.5,
    C3:2
  }
  

  // Business logic to calculate MinCost
     // Create Function checkMin to calculate minimum cost
  function checkMin(obj){

     // Logic to calculate minCost based on sum and number of elements in obj to reach L1 position
    let sum = 0;
    let minCost=0
    const arr =Object.keys(obj)
    for(let i=arr.length-1;i>=0;i--){
      for(let j=0;j<=i;j++){
        sum = sum + obj[arr[j]] 
      }
      if(sum <= 5 && arr.length==3){
       minCost = 10*9 ;
       break;
      }
      if(sum > 5 && arr.length==3){
    
        minCost = minCost + (distance[arr[0]]*(10+((Math.floor(obj[arr[0]]/5)+1)==1?0:8*Math.floor(obj[arr[0]]/5))))
        +(distance[arr[1]]*(10+((Math.floor(obj[arr[1]]/5)+1)==1?0:8*Math.floor(obj[arr[1]]/5))))+2.5*10
        +(distance[arr[2]]*(10+((Math.floor(obj[arr[2]]/5)+1)==1?0:8*Math.floor(obj[arr[2]]/5)))) +2*10
       break;
      }
      
      // 
      if(sum <= 5 && arr.length==2){
         if(arr[0]=="C1"&&arr[1]=="C2"){
       minCost =minCost+ (obj["C1"]*4*10 +obj["C2"]*2.5*10)
       break;
      }
         if(arr[0]=="C2"&&arr[1]=="C3"){
       minCost =minCost+ (obj["C2"]*3*10 +obj["C3"]*2*10);
       break;
      }
         if(arr[0]=="C1"&&arr[1]=="C3"){
       minCost =minCost+ (obj["C1"]*3*10 +obj["C3"]*2*10 +10*2);
       break;
      }
    }
        if(sum > 5 && arr.length==2){
            if(arr[0]=="C1"&&arr[1]=="C2"){
       minCost =minCost+ (distance[arr[0]]*(10+((Math.floor(obj[arr[0]]/5)+1)==1?0:8*Math.floor(obj[arr[0]]/5)))) +(distance[arr[1]]*(10+((Math.floor(obj[arr[1]]/5)+1)==1?0:8*Math.floor(obj[arr[1]]/5))))+2.5*10;
       break;
      }
             if(arr[0]=="C2"&&arr[1]=="C3"){
       minCost =minCost+ (2.5*((10+obj["C2"]/5+1)==1?0:8*obj["C2"]/5) +(obj["C3"]*2*((10+obj["C3"]/5+1)==1?0:8*obj["C3"]/5)+2*10));
       break;
      }
        if(arr[0]=="C1"&&arr[1]=="C3"){
       minCost = minCost+ (distance[arr[0]]*(10+((Math.floor(obj[arr[0]]/5)+1)==1?0:8*Math.floor(obj[arr[0]]/5)))) +(distance[arr[1]]*(10+((Math.floor(obj[arr[1]]/5)+1)==1?0:8*Math.floor(obj[arr[1]]/5))))+2*10;
       break;
      }
     
  
      }
      if(sum >=0 && arr.length==1){
        minCost =minCost+ (distance[arr[0]]*(10+((Math.floor(obj[arr[0]]/5)+1)==1?0:8*Math.floor(obj[arr[0]]/5))));
        break;
       }
     
  }
  
  return minCost;
}
  // Function to determine the center and return the minimum cost

  function checkCenter(value){
    // Assign products to their respective centers and calculate weight at particular center
    const obj = {};
    let sumC1=0;
    let sumC2=0;
    let sumC3=0;
    for(product in value){
      if(center[product] =="C1"){
        sumC1=sumC1+weight[product]*value[product]
        if(sumC1!=0){obj["C1"]=sumC1}
      }
       if(center[product] =="C2"){
        sumC2=sumC2+weight[product]*value[product]
         if(sumC2!=0){obj["C2"]=sumC2}
      }
       if(center[product] =="C3"){
        sumC3=sumC3+weight[product]*value[product]
         if(sumC3!=0){obj["C3"]=sumC3}
      }
      
    }
    const result = checkMin(obj);// Calculate the minimum cost based on the assigned centers to reach L1 position

    return result;
  
  }

  // Handle POST request
app.post('/calculateCost', (req, res) => {
    const order = req.body;    // Extract order data from the request body
    let minCost = checkCenter(order); // Calculate the minimum cost based on the order

    res.json({ minCost }); // Send the minimum cost as a JSON response
});

const PORT = 3004
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});