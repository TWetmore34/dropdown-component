import React, {useEffect, useState, useRef} from 'react'

const DropdownCustom = ({placeholder, options}) => {
  const [selected, setSelected] = useState([])
  const [inputVal, setInputVal] = useState("")
  // toggles dropdown menu
  const [visible, setVisible] = useState(false)
  // handle unique keys for selected arr
  let [idVal, setIdVal] = useState(0)
  const ref = useRef(null)

  const handleChange = (e) => {
    setInputVal(e.target.value)
  }

  // watches for whether the input el has been focused or not
  document.addEventListener("click", () => {
    setVisible(document.activeElement === ref.current)
  })
  // intentional toggles based on the arrow down key in the input section
  const handleToggle = (e) => {
    e.stopPropagation()
    setVisible(!visible)
  }
  // resets focus to input el for its container (this is what lets the document listener work)
  const setFocus = () => {
    ref.current.focus()
  }

  // handles addition based on typed in values
  const handleSubmit = (e) => {
    e.preventDefault()
    setIdVal(idVal + 1)
    setSelected([...selected, {id: idVal, text: inputVal}])
    setInputVal("")
  }

  const handleDelete = (e) => {
    setSelected(selected.filter(el => el.id !== parseInt(e.target.id)))
  }

  const handleSetSelected = (e) => {
    console.log("b")
    setSelected([...selected, {text: e.target.id, id: idVal}])
    setIdVal(idVal + 1)
    setInputVal("")
  }
  return (
    <div className='select--container'>
      <form className="container">
      {selected.map(el => (
        <p data-testid="selected" className='selected' key={el.id}>{el.text} 
        <span onClick={handleDelete} id={el.id} className='selected--delete'>&#10006;</span>
        </p>
        ))}
        <div onClick={setFocus} style={{width: "100%", display: "flex", justifyContent: "end", alignItems: "center"}}>
            <input ref={ref} id="test" placeholder={placeholder} onChange={handleChange} value={inputVal} type="text" tabIndex="1" className='select' />
            <span className='arrow-down' onClick={handleToggle} style={{marginBottom: ".5rem"}}>&#8964;</span>
        </div>
        <span className='barrier'>|</span>
        <button data-testid="submit" onClick={handleSubmit} className='submit'>&#128269;</button>
      </form>
        {visible ? 
        <div className='options'>
           {options.map(el => {
            if(inputVal === "") {
              return <p className='option' id={el} onClick={handleSetSelected} key={el}>{el}</p>
            }
            if(el.includes(inputVal)){
              return <p className='option' id={el} onClick={handleSetSelected} key={el}>{el}</p>
            }
            return null
           }
           )}
        </div>
        : null}
  </div>
  )
}

export default DropdownCustom