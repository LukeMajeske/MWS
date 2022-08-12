import React, {useEffect, useRef, useState, useReducer} from "react";
import ReactDOM from "react-dom";
import { Button, Header } from "semantic-ui-react";
import cub3ski_img from "../assets/OG_Cub3Ski_img.png";
import CCSC_img from "../assets/CCSC_img.png";
import Slide from "./Slide"

//const colors=["#0088FE", "#00C49F", "#FFBB28"];
const colors=["#FFBB28"];
const _slides=[
    {
        image:cub3ski_img,
        header:"Game I created with React!",
        href:"https://cub3ski.com",
        code_href:"https://github.com/LukeMajeske/Cub3ski/tree/cub3ski_main/numble-app"
    },
    {
        image:CCSC_img,
        header:"My first website with Wordpress!",
        href:"https://crushcovidstreakchallenge.com/",
        code_href:"https://github.com/LukeMajeske/crushcovidstreakchallenge.com"
    }
]

const translateFactor = (1/(_slides.length+2)*100);
const delay = 100000;
let slideKey = 0;



function mod(n, m) {
    return ((n % m) + m) % m;
  }

function createSlide(index){
    const props = _slides[index];
    slideKey++;
    return(
        <Slide key={`slide${slideKey}`} image={props.image} header={props.header} href={props.href} code_href={props.code_href}></Slide>
    )

}

function portSlides(){
    var slides =[];
    for(var i=0; i<_slides.length;i++){
        slides.push(createSlide(i));
    }
    
    slides =[createSlide(_slides.length-1),...slides,createSlide(0)];
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
            action.ind = (action.ind + _slides.length+1) % _slides.length;
            slides.push(createSlide(action.ind))
            return(slides)
        case ACTIONS.DELSLIDESTART:
            slides.splice(0,1);
            return(slides)
        case ACTIONS.ADDSLIDESTART:
            action.ind = mod(action.ind - 2, _slides.length);
            slides = [createSlide(action.ind),...slides];
            return(slides);
        case ACTIONS.DELSLIDELAST:
            slides.splice(slides.length - 1,1);
            return(slides)
    }

}

export default function Portfolio(){
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
        if(direction === -1){//move to the right
            dispatch({type:ACTIONS.ADDSLIDELAST, ind:index});
            dispatch({type:ACTIONS.DELSLIDESTART});
            setIndex((prevIndex) => prevIndex+1 > _slides.length - 1 ? 0 : prevIndex + 1);
        }
        else if(direction === 1){//move to the left
            dispatch({type:ACTIONS.ADDSLIDESTART, ind:index});
            dispatch({type:ACTIONS.DELSLIDELAST});
            setIndex((prevIndex) => prevIndex-1 < 0 ? _slides.length - 1 : prevIndex - 1);  
        }
        setDirection((prevDir)=> 
        prevDir = 0);
        setTransitionEnabled(false);
    }

    function resetTransition(){
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
        <div data-testid="portfolio-1" className='portfolio segment-div-white' style={{backgroundColor:'white'}}>
            <Header as='h1' style={{color:'black'}}>Portfolio</Header>
            <div className='port-slideshow'>
                <div
                    className="port-slideshowSlider"
                    style={{ transform: `translateX(${((direction*translateFactor)-20)}%)`,
                    transition: !transitionEnabled ? 'none' : 'ease 2000ms'}}

                    onTransitionEnd = {()=> handleTransitionEnd()}
                >
                    {slides}
                </div>
                <Button className="left-btn" onClick={left} positive>Left</Button>
                <Button className="right-btn" onClick={right}positive>Right</Button>
            </div>
        </div>
    )
}

//ReactDOM.render(<Portfolio/>, document.getElementById("root"));

