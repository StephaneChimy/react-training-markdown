import { useState } from "react"
import "./App.css"
import { sampleText } from "./sampleText"
import marked from "marked"
import DOMPurify from "dompurify"

const App = () => {
  let [text, setText] = useState(sampleText)

  // Changement d'état dans le textArea
  const handleChange = (event) => {
    const newText = event.target.value
    setText((text = newText))
  }

  // Fonction retournant le text compilé par marked
  const renderText = (text) => {
    let __html
    __html = marked(DOMPurify.sanitize(text))
    return { __html }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-6'>
          <textarea className='form-control' value={text} rows='35' onChange={handleChange}></textarea>
        </div>

        <div className='col-sm-6'>
          <div dangerouslySetInnerHTML={renderText(text)}></div>
        </div>
      </div>
    </div>
  )
}

export default App
