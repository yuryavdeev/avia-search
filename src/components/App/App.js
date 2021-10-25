import React from 'react'
import './App.css'
import SearchArea from '../SearchArea/SearchArea'
import CardsArea from '../CardsArea/CardsArea'
import flightsList from '../../utils/flights.json'


const App = () => {

  const mainList = flightsList.result.flights
  const [listForRender, setListForRender] = React.useState([])
  const [message, setMessage] = React.useState('')

  const [sort, setSort] = React.useState('')
  const [transferFlight, setTransferFlight] = React.useState(false)
  const [directFlight, setDirectFlight] = React.useState(false)
  const [priceFrom, setPriceFrom] = React.useState()
  const [priceBefore, setPriceBefore] = React.useState()

  const [airlinesFoundList, setAirlinesFoundList] = React.useState({})
  const [airlinesCheckedList, setAirlinesCheckedList] = React.useState([])
  const [airlinesActiveList, setAirlinesActiveList] = React.useState([])
  const [listForCheckboxHandle, setListForCheckboxHandle] = React.useState([])

  // поиск
  React.useEffect(() => {
    let temporaryArray = []

    // фильтр по цене (и установка начального списка для отрисовки <= нет условия)
    temporaryArray = mainList.filter(card =>
      priceFrom && priceBefore ?
        card.flight.price.total.amount < Number(priceBefore) && card.flight.price.total.amount > Number(priceFrom)
        :
        priceFrom && !priceBefore ?
          card.flight.price.total.amount > Number(priceFrom)
          :
          !priceFrom && priceBefore ?
            card.flight.price.total.amount < Number(priceBefore)
            :
            card
    )

    // фильтр по сегментам (пересадки - есть/нет)
    if (transferFlight || directFlight) {
      temporaryArray = temporaryArray.filter(card =>
        transferFlight && !directFlight ?
          card.flight.legs[0].segments.length > 1
          :
          !transferFlight && directFlight ?
            card.flight.legs[0].segments.length === 1
            :
            card
      )
    }

    setListForCheckboxHandle(temporaryArray)

    // фильтр по авиакомпаниям
    if (airlinesCheckedList.length) {
      temporaryArray = temporaryArray.filter(card =>
        airlinesCheckedList.includes(card.flight.carrier.caption)
      )
    }

    setListForRender(temporaryArray)
  }, [mainList, priceBefore, priceFrom, transferFlight, directFlight, airlinesCheckedList])


  // переключатель сообщения
  React.useEffect(() => {
    listForRender.length ?
      setMessage('')
      :
      setMessage('Ничего не найдено')
  }, [listForRender])


  // получение списка а/к с ценами (отрис. в SearchArea)
  React.useEffect(() => {
    let temporaryObject = {}

    // сортировка <= получить мин. цену в объект
    mainList.sort((cardLeft, cardRight) =>
      Number(cardRight.flight.price.total.amount) - Number(cardLeft.flight.price.total.amount)
    ).map(card =>
      temporaryObject = { ...temporaryObject, [card.flight.carrier.caption]: card.flight.price.total.amount }
    )

    // в объект "а/к: цена" (отсорт. по имени а/к - ключу объекта)
    setAirlinesFoundList(Object.keys(temporaryObject).sort().reduce((obj, key) => {
      obj[key] = temporaryObject[key]
      return obj
    }, {}))
  }, [mainList])


  // обработка disabled для чекбокса с а/к
  React.useEffect(() => {
    // все а/к в listForRender - в Set 
    let list = new Set(listForCheckboxHandle.map(card => card.flight.carrier.caption))
    // "разность" с airlinesFoundList
    let intersection = Object.keys(airlinesFoundList).filter(x => !list.has(x))
    setAirlinesActiveList(intersection)
  }, [airlinesFoundList, listForCheckboxHandle])


  const handleSearchForm = (formValues, selectedAirlines) => {
    if (Object.keys(formValues).length) {
      formValues.sort && setSort(formValues.sort)
      formValues.transferFlight === undefined ? setTransferFlight(false) : setTransferFlight(formValues.transferFlight)
      formValues.directFlight === undefined ? setDirectFlight(false) : setDirectFlight(formValues.directFlight)
      setPriceFrom(formValues.priceFrom)
      setPriceBefore(formValues.priceBefore)
    }
    setAirlinesCheckedList(selectedAirlines)
  }


  return (
    <div className="app">
      <SearchArea
        handleSearchForm={handleSearchForm}
        airlinesFoundList={airlinesFoundList}
        airlinesActiveList={airlinesActiveList}
      />
      <CardsArea
        listForRender={listForRender}
        message={message}
        sort={sort}
      />
    </div>
  )
}

export default App
