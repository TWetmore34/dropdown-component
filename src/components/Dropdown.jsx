import React, {useEffect, useState} from 'react'
// setup unit test for each function. make sure that adding new entries keeps id unique
const Dropdown = ({options, placeholder, listId}) => {
  console.log(options)
  const [selected, setSelected] = useState([])
  const [inputVal, setInputVal] = useState("")
  const [prevInput, setPrevInput] = useState("")
  let [idVal, setIdVal] = useState(0)
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
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setIdVal(idVal + 1)
    setSelected([...selected, {id: idVal, text: inputVal}])
    setInputVal("")
  }
  const handleDelete = (e) => {
    setSelected(selected.filter(el => el.id !== parseInt(e.target.id)))
  }
  return (
    <div>
      <form className="container">
      {selected.map(el => {
      return (
        <p data-testid="selected" className='selected' key={el.id}>{el.text} 
        <span onClick={handleDelete} id={el.id} className='selected--delete'>&#10006;</span>
        </p>
        )})}
        <input placeholder={placeholder} onChange={handleChange} value={inputVal} type="text" tabIndex="1" className='select' list={listId} />
        <datalist id={listId}>
          {options.map(el => <option data-testid="option" key={el} value={el}>{el}</option>)}
        </datalist>
        <span className='barrier'>|</span>
        <button data-testid="submit" onClick={handleSubmit} className='submit'>&#128269;</button>
      </form>
  </div>
  )
}

export default Dropdown