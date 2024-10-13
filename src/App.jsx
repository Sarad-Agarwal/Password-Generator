import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  let [numbers, setNumbers] = useState(false)
  let [characters, setCharacters] = useState(false)
  let [length, setLength] = useState(12)//default length is set to 12
  let [password, setPassword] = useState("")

  let passRef = useRef(null)//useRef hook will be used as variable now
  let buttonRef = useRef(null); // Create a ref for the button


  const passCall = useCallback(() => {//it is the password generator function all time
    let str = "ABCDEFGHIJKLMNOPQURSTUWXYZabcdefghijklmnopqurstuvwxyz"
    let pass = ""
    if (numbers) {
      str += "0123456789"
    }
    if (characters) {
      str += "@#$%^&*)(_!)+="
    }
    for (let i = 0; i < length; i++) {
      pass = pass + str.charAt(Math.floor(Math.random() * str.length + 1))
    }
    setPassword(pass)
  }, [length, characters, numbers, setPassword])//the array will take the dependencies


  const CopytoClipboard = useCallback(() => {
    passRef.current?.select()
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = "green"; // Update background color to green
    }
    window.navigator.clipboard.writeText(password)
  }, [password])

  
  //---------------kahi pe bhi cher char hone se useEffect kam karta h-----------
  useEffect(() => {
    passCall()
  }, [length, characters, numbers, passCall])


  return (
    <>
    <div className='flex flex-col mt-44'>
    <h1 className='text-white font-semibold text-3xl mr-44 shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-out'>
  Generate Your Own Password
</h1>



      <div className='h-40 w-[700px] ml-48 bg-gray-900 shadow-2xl shadow-gray-800 outline outline-2 outline-purple-500 mt-8'>
        {/* <h1 className='text-white' text>Real Time Password Generator</h1> */}
        <input type="text" placeholder='  Password' value={password} readOnly className='mt-8 rounded-md w-96 h-8' ref={passRef} />

        <button
          ref={buttonRef} // Assign the ref here
          onClick={CopytoClipboard}
          className='text-white bg-blue-800 h-8 rounded-md w-20 font-bold ml-1'>Copy</button>

        <div className='flex items-center gap-x-1 text-white'>

          <input
            type="range" min={12} max={100} value={length} className='ml-28 mt-2 cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
          <label>Length: {length}</label>

          <input
            type="checkbox"
            defaultChecked={numbers}
            id='inputNumbers'
            className='ml-5'
            onChange={(e) => {
              setNumbers((prev) => !prev);
            }}
          />
          <label htmlFor="inputNumbers">Numbers</label>

          <input
            type="checkbox"
            defaultChecked={characters}
            id='inputCharacters'
            className='ml-5'
            onChange={(e) => {
              setCharacters((prev) => !prev);
            }}
          />
          <label htmlFor="inputCharacters">Characters</label>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
