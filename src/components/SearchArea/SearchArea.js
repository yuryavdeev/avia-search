import React from 'react'
import './SearchArea.css'


const SearchArea = React.memo(({ handleSearchForm, airlinesList }) => {

  const [values, setValues] = React.useState({})
  const [airlinesArr, setAirlinesArr] = React.useState([])
  const [inputPriceFrom, setInputPriceFrom] = React.useState('')
  const [inputPriceBefore, setInputPriceBefore] = React.useState('')
  const [checkboxTransfer, setCheckboxTransfer] = React.useState(false)
  const [checkboxDirect, setCheckboxDirect] = React.useState(false)

  React.useEffect(() => {
    handleSearchForm(values, airlinesArr)
  }, [handleSearchForm, values, airlinesArr.length])

  // console.log(airlinesList) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const handleChangeForm = ((e) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'hasTransfer') {
      setValues({ ...values, [name]: !checkboxTransfer })
      setCheckboxTransfer(!checkboxTransfer)
    } else if (name === 'directFlight') {
      setValues({ ...values, [name]: !checkboxDirect })
      setCheckboxDirect(!checkboxDirect)
    } else {
      setValues({ ...values, [name]: value })
    }
  })


  const showInputValue = (e) => {
    e.target.name === 'priceFrom' ?
      setInputPriceFrom(e.target.value)
      :
      setInputPriceBefore(e.target.value)
  }


  const handleChangeAirlinesCheckbox = (e) => {
    setAirlinesArr(airlinesArr.concat(e.target.name))
  }


  return (
    <section className="search-area">
      <form className="form">

        <fieldset className="form__set form__sort" onChange={handleChangeForm}>
          <h3 className="form__subtitle">Сортировать</h3>
          <input
            type="radio"
            id="priceUp"
            name="sort"
            value="priceUp"
          />
          <label className="form__label" htmlFor="priceUp">- по возрастанию цены</label><br />
          <input
            type="radio"
            id="priceDown"
            name="sort"
            value="priceDown"
          />
          <label className="form__label" htmlFor="priceDown">- по убыванию цены</label><br />
          <input
            type="radio"
            id="duration"
            name="sort"
            value="duration"
          />
          <label className="form__label" htmlFor="duration">- по времени в пути</label>
        </fieldset>


        <fieldset className="form__set form__filter" onChange={handleChangeForm}>
          <h3 className="form__subtitle">Фильтровать</h3>
          <input
            type="checkbox"
            id="hasTransfer"
            name="hasTransfer"
            value="hasTransfer"
          />
          <label className="form__label" htmlFor="hasTransfer">- 1 пересадка</label><br />
          <input
            type="checkbox"
            id="directFlight"
            name="directFlight"
            value="directFlight"
          />
          <label className="form__label" htmlFor="directFlight">- без пересадок</label><br />
        </fieldset>


        <fieldset className="form__set form__price" onChange={handleChangeForm}>
          <h3 className="form__subtitle">Цена</h3>
          <label className="form__label" htmlFor="from">От</label>
          <input
            className="form__input"
            type="number"
            id="from"
            name="priceFrom"
            placeholder="введите сумму от ..."
            onChange={showInputValue}
            value={inputPriceFrom}
            title="поле может содержать только цифры"
          />
          <br />
          <label className="form__label" htmlFor="before">До</label>
          <input
            className="form__input"
            type="number"
            id="before"
            name="priceBefore"
            placeholder="введите сумму до ..."
            onChange={showInputValue}
            value={inputPriceBefore}
            title="поле может содержать только цифры"
          />
          <br />
        </fieldset>

        {
          airlinesList &&
          <fieldset className="form__set form__airlines" onChange={handleChangeAirlinesCheckbox}>
            <h3 className="form__subtitle">Авиакомпании</h3>
            {
              Object.getOwnPropertyNames(airlinesList).map((airline) =>
                <div className="form__input-container" key={airline}>
                  <input
                    type="checkbox"
                    id={airline}
                    name={airline}
                    value={airline}
                  />
                  <label className="form__label" htmlFor={airline}>{airline}</label>
                  <span className="form__min-price-span">от {airlinesList[airline]} р.</span><br />
                </div>
              )
            }

          </fieldset>
        }

      </form>
    </section>
  )
})

export default SearchArea
