import React from 'react'
import './SearchArea.css'


const SearchArea = React.memo(({ handleSearchForm, airlinesFoundList, airlinesActiveList }) => {

  const [formValues, setFormValues] = React.useState({})
  const [selectedAirlines, setSelectedAirlines] = React.useState([])
  const [inputPriceFrom, setInputPriceFrom] = React.useState('')
  const [inputPriceBefore, setInputPriceBefore] = React.useState('')
  const [checkboxTransfer, setCheckboxTransfer] = React.useState(false)
  const [checkboxDirect, setCheckboxDirect] = React.useState(false)

  React.useEffect(() => {
    handleSearchForm(formValues, selectedAirlines)
  }, [handleSearchForm, selectedAirlines, formValues])


  const handleChangeForm = (e) => {
    const name = e.target.name
    const value = e.target.value
    switch (name) {
      case 'transferFlight':
        setFormValues({ ...formValues, [name]: !checkboxTransfer })
        setCheckboxTransfer(!checkboxTransfer)
        break
      case 'directFlight':
        setFormValues({ ...formValues, [name]: !checkboxDirect })
        setCheckboxDirect(!checkboxDirect)
        break
      case 'priceFrom':
        setFormValues({ ...formValues, [name]: value })
        setInputPriceFrom(value)
        break
      case 'priceBefore':
        setFormValues({ ...formValues, [name]: value })
        setInputPriceBefore(value)
        break
      default:
        setFormValues({ ...formValues, [name]: value })
    }
  }


  const handleChangeAirlinesCheckbox = (e) => {
    const value = e.target.value
    if (selectedAirlines.includes(value)) {
      let arr = selectedAirlines.slice() // копия массива
      arr.splice(selectedAirlines.findIndex(item => item === value), 1) // удаление отмеченной а/к
      setSelectedAirlines(arr) // перезапись массива
    } else {
      setSelectedAirlines(selectedAirlines.concat(value))
    }
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
            id="transferFlight"
            name="transferFlight"
            value="transferFlight"
          />
          <label className="form__label" htmlFor="transferFlight">- 1 пересадка</label><br />
          <input
            type="checkbox"
            id="directFlight"
            name="directFlight"
            value="directFlight"
          />
          <label className="form__label" htmlFor="directFlight">- без пересадок</label><br />
        </fieldset>


        <fieldset className="form__set form__price" >
          <h3 className="form__subtitle">Цена</h3>
          <label className="form__label" htmlFor="from">От</label>
          <input
            className="form__input"
            type="number"
            id="from"
            name="priceFrom"
            placeholder="введите сумму от ..."
            onChange={handleChangeForm}
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
            onChange={handleChangeForm}
            value={inputPriceBefore}
            title="поле может содержать только цифры"
          />
          <br />
        </fieldset>

        {
          airlinesFoundList &&
          <fieldset className="form__set form__airlines" onChange={handleChangeAirlinesCheckbox}>
            <h3 className="form__subtitle">Авиакомпании</h3>
            {
              Object.keys(airlinesFoundList).map((airline) =>
                <div className="form__input-container" key={airline} >
                  <input
                    type="checkbox"
                    id={airline}
                    name={airline}
                    value={airline}
                    disabled={airlinesActiveList.includes(airline)}
                  />
                  <label className="form__label" htmlFor={airline}>{airline}</label>
                  <span className="form__min-price-span">от {airlinesFoundList[airline]} р.</span><br />
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
