import React, { useEffect, useRef, useState, useReducer} from "react";
import ReactDOM from "react-dom";
import { Button, Header } from "semantic-ui-react";

const colors=["#0088FE", "#00C49F", "#FFBB28"];
const delay = 5000;


function mod(n, m) {
    return ((n % m) + m) % m;
  }

function createSlide(color){
    return(
        <div
            className="port-slide"
            //key={index}
            style={{backgroundColor:`${color}`,
            backgroundSize:'contain',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'50% 50%'
            }}
        ></div>
    )

}

function portSlides(){
    var slides =[];
    for(var i=0; i<colors.length;i++){
        slides.push(createSlide(colors[i]))
    }
    slides =[createSlide(colors[colors.length-1]),...slides,createSlide(colors[0])]
    return(slides)
}

const ACTIONS={
    ADDSLIDELAST:'addslide-last',
    DELSLIDESTART:'delslide-start',
    ADDSLIDESTART: 'addslide-start',
    DELSLIDELAST:'delslide-last'

}

function reducer(slides:any[], action){
    switch(action.type){
        case ACTIONS.ADDSLIDELAST:
            action.ind = (action.ind + 4) % colors.length;
            slides.push(createSlide(colors[action.ind]))
            return(slides)
        case ACTIONS.DELSLIDESTART:
            slides.splice(0,1);
            return(slides)
        case ACTIONS.ADDSLIDESTART:
            action.ind = mod(action.ind - 2, colors.length);
            slides = [createSlide(colors[action.ind]),...slides];
            return(slides);
        case ACTIONS.DELSLIDELAST:
            slides.splice(slides.length - 1,1);
            return(slides)
    }

}

function Portfolio(){
    const [index, setIndex] = useState(0);
    const [slides, dispatch] = useReducer(reducer,portSlides());
    const [direction, setDirection] = useState(0);//1 = right,0 = return to neutral -1 = left
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const timeoutRef = useRef(null);

    function resetTimeout() {

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current!);
        }
      }
    
    function handleTransitionEnd(){
        /*if(index === 2){
            setTransitionEnabled(false);
            console.log('Set FALSE');
        }*/
        //console.log(index, direction);
        if(direction === -1){//move to the right
            dispatch({type:ACTIONS.ADDSLIDELAST, ind:index});
            dispatch({type:ACTIONS.DELSLIDESTART});
            setIndex((prevIndex) => prevIndex+1 > colors.length - 1 ? 0 : prevIndex + 1);
        }
        else{//move to the left
            dispatch({type:ACTIONS.ADDSLIDESTART, ind:index});
            dispatch({type:ACTIONS.DELSLIDELAST});
            setIndex((prevIndex) => prevIndex-1 < 0 ? colors.length - 1 : prevIndex - 1);  
        }
        setDirection((prevDir)=> 
        prevDir = 0);
        setTransitionEnabled(false);
    }

    function resetTransition(){
        /*if(index === 0){
            setTransitionEnabled(true);
            console.log('Set TRUE');
        }*/
        setTransitionEnabled(true);
    }

    useEffect(()=>{
        resetTimeout();

        timeoutRef.current = setTimeout(() => 
            [resetTransition(),
            setDirection((prevDir)=>
            prevDir === 0 ? -1 : 0)],
            delay
        );
                
        
        return () => {
            resetTimeout();
          };
    },[direction]);

    function left(){
        setDirection((prevDirection) => prevDirection === -1 ? 0 : 1);
        resetTransition();
    }

    function right(){
        setDirection((prevDirection) => prevDirection === 1 ? 0 : -1);
        resetTransition();
    }

    return(
        <div className='portfolio segment-div-white' style={{backgroundColor:'white'}}>
            <Header as='h1' style={{color:'black'}}>Portfolio</Header>
            <div className='port-slideshow'>
                <div
                    className="port-slideshowSlider"
                    style={{ transform: `translateX(${((direction*20)-20)}%)`,
                    transition: !transitionEnabled ? 'none' : 'ease 2000ms'}}

                    onTransitionEnd = {()=> handleTransitionEnd()}
                >
                    {slides}
                </div>
            </div>
            <Button onClick={left} positive>Left</Button>
            <Button onClick={right}positive>Right</Button>
        </div>
    )
}

ReactDOM.render(<Portfolio/>, document.getElementById("root"));

export default Portfolio;