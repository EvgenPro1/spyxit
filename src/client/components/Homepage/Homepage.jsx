import {useState, useEffect} from 'react';
import './../../../bootstrap.min.css'

const getRandomIntInclusive = (max) => {
    const min = 1
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

export const Homepage = () => {
    const [number, setNumber] = useState()
    const [word, setWord] = useState('')
    const [page, setPage] = useState(0)
    const [spyIndex, setSpyIndex] = useState(0)
    const [show, setShow] = useState()

    useEffect(()=>{
        setSpyIndex(getRandomIntInclusive(number))
    },[number])

    const tempArr = new Array(number).fill(word)

    const setPlayersNum = (e) => {
        setNumber(+e.target.value)
    }

    const handleChangeWord = (e) => {
        setWord(e.target.value)
    }

    const handleReset = () => {
        setWord('')
        setNumber('')
        setPage(0)
    }

    if (spyIndex) tempArr[spyIndex] = 'You are a spy, beat them:)'

    const pageArr = tempArr.map((item, index) => <>
        <h1>player № {index+1} </h1>
        <div className='hovered p-3'>
            <h2 className=''>Click me to show</h2>
            <div className='position-relative d-flex justify-content-center'><h2 className='my-word position-absolute'>{item}</h2></div>
        </div>
        </>)

    return (
        <div className='d-flex flex-column align-items-center'>
            {!!page &&
            <>
                {pageArr[page - 1]}
            </>}
            {!page &&
            <>
                <input className='mt-2' placeholder='Enter number of players' type="number" value={number} onChange={(e) => setPlayersNum(e)}/>
                <input className='mt-2' placeholder='Enter word' type="text" value={word} onChange={(e) => handleChangeWord(e)}/>
            </>

            }
            <div className="flex-row justify-content-between">
                <button className='btn btn-outline-primary m-5' onClick={() => setPage(page + 1)}>next Page</button>
                <button className='btn btn-outline-danger m-5' onClick={handleReset}>Reset</button>

            </div>
            <div className='btn btn-outline-warning m-5' onClick={()=>setShow(!show)}>Show the topic</div>
            {show && <h1 className='my-word show'>{word}</h1> }
            <div className="hide-block d-flex justify-content-center align-items-center"><h1>Click here to hide the word</h1></div>
        </div>
    );
};