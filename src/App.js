import { useState } from "react"
import "./App.css"
import { sampleText } from "./sampleText"
import marked from "marked"
// Librairie pour sanitizer
import DOMPurify from "dompurify"

const App = () => {
  // Chargement de la sauvegarde si elle existe
  let [text, setText] = useState(localStorage.getItem("markdownSaved") ? localStorage.getItem("markdownSaved") : sampleText)

  // Changement d'état dans le textArea
  const handleChange = (event) => {
    const newText = event.target.value
    localStorage.setItem("markdownSaved", newText)
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
