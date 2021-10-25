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

  const [airlinesFoundListSort, setAirlinesFoundListSort] = React.useState({})

  // получение списка перевозчиков с ценами (для отрисовки в SearchArea)
  React.useEffect(() => {
    let temporaryObject = {}

    // сортировка <= получить мин. цену в объект
    mainList.sort((cardLeft, cardRight) =>
      Number(cardRight.flight.price.total.amount) - Number(cardLeft.flight.price.total.amount)
    ).map(card =>
      temporaryObject = { ...temporaryObject, [card.flight.carrier.caption]: card.flight.price.total.amount }
    )

    // в объект а/к: цена (без сортировки)
    setAirlinesFoundList(temporaryObject)
    // в массив отсортированные по цене а/к
    setAirlinesFoundListSort(Object.keys(temporaryObject).sort((a, b) => temporaryObject[a] - temporaryObject[b]))
  }, [mainList])


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
        airlinesFoundListSort={airlinesFoundListSort}
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
