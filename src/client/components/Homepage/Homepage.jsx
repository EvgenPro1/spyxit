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
        <div className='border-primary p-3'>
            <h2 className=''>Click me to show or hide </h2>
            <h2 className='my-word'>{item}</h2>
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
                <input className='mt-2' type="number" value={number} onChange={(e) => setPlayersNum(e)}/>
                <input className='mt-2' type="text" value={word} onChange={(e) => handleChangeWord(e)}/>
            </>

            }
            <div className="flex-row justify-content-between">
                <button className='btn btn-outline-primary m-5' onClick={() => setPage(page + 1)}>next Page</button>
                <button className='btn btn-outline-danger m-5' onClick={handleReset}>Reset</button>

            </div>
        </div>
    );
};