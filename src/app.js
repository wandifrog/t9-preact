import { useState } from 'preact/hooks'

const data = [
  {
    number: '1',
    value: ['.', ',', '?']
  },
  {
    number: '2',
    value: ['a', 'b', 'c']
  },
  {
    number: '3',
    value: ['d', 'e', 'f']
  },
  {
    number: '4',
    value: ['g', 'h', 'i']
  },
  {
    number: '5',
    value: ['j', 'k', 'l']
  },
  {
    number: '6',
    value: ['m', 'n', 'o']
  },
  {
    number: '7',
    value: ['p', 'q', 'r', 's']
  },
  {
    number: '8',
    value: ['t', 'u', 'v']
  },
  {
    number: '9',
    value: ['w', 'x', 'y', 'z']
  },
  {
    number: '',
    value: ['uppercase']
  },
  {
    number: '0',
    value: ['space']
  },
  {
    number: '',
    value: ['backspace']
  },
]

const App = () => {
  const [state, setState] = useState(123)

  return (
    <div id="app">
      {state}
    </div>
  )
}
export default App
