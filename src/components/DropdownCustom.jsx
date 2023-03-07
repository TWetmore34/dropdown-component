import React, {useEffect, useState, useRef} from 'react'

const DropdownCustom = ({placeholder, options}) => {
  const [selected, setSelected] = useState([])
  const [inputVal, setInputVal] = useState("")
  const [prevInput, setPrevInput] = useState("")
  const [visible, setVisible] = useState(false)
  let [idVal, setIdVal] = useState(0)
  const ref = useRef(null)
  const handleChange = (e) => {
    if(e.target.value.length - prevInput.length <= 2) {
      return setInputVal(e.target.value)
    }
    setIdVal(idVal + 1)
    setSelected([...selected,{id: idVal, text: e.target.value}])
  }
  useEffect(() => {
    setPrevInput(inputVal.slice(0, inputVal.length-1))
  },[inputVal, setPrevInput])

  window.addEventListener("click", () => {
    setVisible(document.activeElement === ref.current)
  })
  const handleToggle = (e) => {
    e.stopPropagation()
    setVisible(!visible)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIdVal(idVal + 1)
    setSelected([...selected, {id: idVal, text: inputVal}])
    setInputVal("")
  }

  const handleDelete = (e) => {
    setSelected(selected.filter(el => el.id !== parseInt(e.target.id)))
  }

  const setFocus = () => {
    ref.current.focus()
  }
  
  const handleSetSelected = (e) => {
    setSelected([...selected, {text: e.target.id, id: idVal}])
    setIdVal(idVal + 1)
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
           {options.map(el => <p className='option' id={el} onClick={handleSetSelected} key={el}>{el}</p>)}
        </div>
        : null}
  </div>
  )
}

export default DropdownCustom