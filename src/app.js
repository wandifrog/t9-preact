import { useEffect, useState } from 'preact/hooks'

const data = [
  {
    number: '1',
    char: ['.', ',', '?']
  },
  {
    number: '2',
    char: ['a', 'b', 'c']
  },
  {
    number: '3',
    char: ['d', 'e', 'f']
  },
  {
    number: '4',
    char: ['g', 'h', 'i']
  },
  {
    number: '5',
    char: ['j', 'k', 'l']
  },
  {
    number: '6',
    char: ['m', 'n', 'o']
  },
  {
    number: '7',
    char: ['p', 'q', 'r', 's']
  },
  {
    number: '8',
    char: ['t', 'u', 'v']
  },
  {
    number: '9',
    char: ['w', 'x', 'y', 'z']
  },
  {
    number: '',
    char: ['uppercase']
  },
  {
    number: '0',
    char: ['']
  },
  {
    number: '',
    char: ['backspace']
  },
]

const outsideState = {
  counter: 0,
  buttonTimeout: null,
  lastButtonPressed: null
}

const App = () => {
  // const [output, setOutput] = useState('')
  const [output, setOutput] = useState({
    value: '',
    temporaryValue: ''
  })
  const [uppercase, setUppercase] = useState(false)

  const uppercaseButtonPressed = () => {
    setUppercase(!uppercase)
  }

  const backspaceButtonPressed = () => {
    setOutput(output.slice(0, -1))
  }

  const spaceButtonPressed = () => {
    setOutput(output + ' ')
  }

  const numberButtonPressed = (charList, number) => {

    if (outsideState.lastButtonPressed !== number) {
      clearTimeout(outsideState.buttonTimeout)
      outsideState.lastButtonPressed = number
      outsideState.counter = 0
      const char = charList[0]
      const newOutput = {
        value: output.value + output.temporaryValue,
        temporaryValue: uppercase ? char.toUpperCase() : char
      }

      setOutput(newOutput)
      return
    }

    const char = charList[outsideState.counter]
    setOutput({ ...output, temporaryValue: uppercase ? char.toUpperCase() : char })
    
    if (outsideState.counter < char.length - 1) {
      outsideState.counter++
    } else {
      outsideState.counter = 0
    }
  }

  const numberButtonReleased = () => {
    clearTimeout(outsideState.buttonTimeout)
    outsideState.buttonTimeout = setTimeout(() => {
      outsideState.counter = 0
      setOutput({
        value: output.value + output.temporaryValue,
        temporaryValue: ''
      })
    }, 1000)
  }

  const backspaceButtonReleased = () => {
    // clearTimeout(outsideState.buttonTimeout)
    // setOutput(output.slice(0, -1))
  }

  const spaceButtonReleased = () => {
    // setOutput(output + ' ')
  }



  useEffect(() => {
    // outsideState.buttonTimeout = setTimeout(() => {
    //   setOutput({
    //     value: output.value + output.temporaryValue,
    //     temporaryValue: ''
    //   })
    // }, 1500)
  }, [output])



  return (
    <div className="t9key">
      <div className="t9key-display">
        <div className="output">{output.value}<span>{output.temporaryValue}</span></div>
      </div>
      <div className="t9key-keyboard">
        {
          data.map(({ char, number }, index) => {
            const chars = char.join(',')
            return (
              <div
                key={index}
                className="t9key-button"
                onMouseDown={() => {
                  if (char[0] === 'uppercase') {
                    uppercaseButtonPressed()
                  } else if (char[0] === 'backspace') {
                    backspaceButtonPressed()
                  } else if (char[0] === '') {
                    spaceButtonPressed()
                  } else {
                    numberButtonPressed(char, number)
                  }
                }}
                onMouseUp={() => {
                  if (char[0] === 'uppercase') {
                    // does not do anything
                  } else if (char[0] === 'backspace') {
                    backspaceButtonReleased()
                  } else if (char[0] === '') {
                    spaceButtonReleased()
                  } else {
                    numberButtonReleased(char)
                  }
                }}
              >
                <div>{number}</div>
                <div>{uppercase ? chars.toUpperCase() : chars}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default App
