import React, {useEffect, useState} from 'react';
import styled from "styled-components";
//import  './button.css';
import './App.css';
function App() {

// set all the necessary useState
  const [data, setData] = useState([]);
  const [allowable_point, setAllowablepoint] = useState(0);
  const [px, setX] = useState(0);
  const [py, setY] = useState(0);
  const [move, setMove] = useState(0);
  const [points, setPoint] = useState(0);
//define function to generate random number with maximum number
  const getRandomInt=(max)=> {
    return Math.floor(Math.random() * max);
  }

//define funtion to generate array with matrix coordinate of equal size
  const inidata=(counter)=>{
  let iner={buttoncolor:"white",pointbox:0,movable:0,player:0};
  var inner_array=[];
    for (let i = 0; i < counter; i++) {
      inner_array.push(iner)
    } 
    var outer_array=[];
    for (let i = 0; i < counter; i++) {
      outer_array.push(inner_array)
    } 
    return outer_array;
  }
    // Funtion to initialise new game
    const NewGame = () => {
      setMove(0);
      setPoint(0);
      let count=0;
      //ensure a valid input in entered
      do{
        count =parseInt( prompt("Please enter your square board number to start a new game "));
        if(count<2 ||isNaN(count) ){
          alert("invalid input! the input must be greater than 1");
        } 
      }while(count<2 ||isNaN(count) )

      setAllowablepoint(count);// initialise total expected points to the valid input captured
      let data1=inidata(count); // set new default matrix
      UpdateRandomPoint (count,data1)// call function to randomly set the point box and starting point
    }
    //function to randomly set the point box and starting point
  const UpdateRandomPoint = (counter,dt2) => {
    let  x_p=0;
    let  y_p=0;
    let dt=dt2;
    for (let p = 0; p < counter; p++) {
      do{
        x_p=getRandomInt(counter);
        y_p=getRandomInt(counter);
      } while(dt[x_p][y_p].pointbox==1)
    
      let newdata=[];
      for (let i = 0; i < counter; i++) {
        let inner_array=[];
        for (let j = 0; j < counter; j++) {
          if(y_p==j && x_p==i){
            inner_array.push({buttoncolor:"green",pointbox:1,movable:0})
          } else{
            inner_array.push(dt[i][j]);
          }
        }
        newdata.push(inner_array) 
      }
      dt=newdata;
    } 
    do{
      x_p=getRandomInt(counter);
      y_p=getRandomInt(counter);
      
    } while(dt[x_p][y_p].pointbox==1)
     
    let newdata=[];

    for (let i = 0; i < counter; i++) {
        
    let inner_array=[];
    for (let j = 0; j < counter; j++) {
      if(y_p==j && x_p==i){
          inner_array.push({buttoncolor:"red",pointbox:0,movable:0})
        }
        else{
          inner_array.push(dt[i][j]);
        } 
    }
  newdata.push(inner_array) 
  }
   dt=newdata;
   setY(y_p)
    setX(x_p)
      setData(dt);
    }
    const ActionUpdate = (x,y) => {
      if(!(((px+1==x)&&(py==y))||((py+1==y)&&(px==x))||((px-1==x)&&(py==y))||((py-1==y)&&(px==x)))){
        alert("this move is not allowed");
        return;
      }
      if(data[x][y].pointbox==1){
        setPoint(points+1);
      }
      
      let newdata=[];
      for (let i = 0; i < data.length; i++) {
        if(x==i){
          let inner_array=[];
        for (let j = 0; j < data.length; j++) {
          if(y==j){
              inner_array.push({buttoncolor:"red",pointbox:0,movable:1})
              continue;
          }
          inner_array.push(data[i][j]); 
        }
        newdata.push(inner_array)
        continue;
      }
      newdata.push(data[i])
    }
    let newdata2=[];
    for (let i = 0; i < newdata.length; i++) {
      if(px==i){
        let inner_array=[];
        for (let j = 0; j < newdata.length; j++) {       
          if(py==j){
            inner_array.push({buttoncolor:"white",pointbox:0,movable:0})
            continue;
            }
          inner_array.push(newdata[i][j]); 
        }
        newdata2.push(inner_array)
        continue;
      }
      newdata2.push(newdata[i])
    }
    setY(y);
    setX(x);
    setMove(move+1);
    setData(newdata2);
    if(allowable_point==points){
      alert("Congratulation! You have score the maximum point of " +points+  " with " +move + " move")
      NewGame();
    }
  }
//use effect to initialise new game
  useEffect(() => {
    NewGame();
  }, []);

// Button style
  const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 15px 15px;
  border-radius: 5px;
  margin: 0px 0px;
  cursor: pointer;
`;


    return (
        <div className="container">
          <Button bg="blue" onClick={(event) => NewGame()} class="${styles.button}">New Game</Button>

         <h5>Total moves:{move} </h5>
         <h5>Total points:{points} </h5>
          <table>
            <tbody>
                {
                    data.map((item,index) => (
                      <tr key={index}>
                        {
                            item.map( (item2,index2) => ( 
                              <td  key={index2}>
                                <Button  style={{backgroundColor:item2.buttoncolor}} onClick={() => ActionUpdate(index,index2)} ></Button>
                                </td>
                              )
                            )
                          } 
                      </tr>
                      )
                    )
                  }
            </tbody>
          </table>
          <h2>Designed by Akinbobola Olawole Stephen </h2>
        </div>
    );

}


export default App;
