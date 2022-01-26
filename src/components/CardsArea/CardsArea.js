import React from 'react'
import './CardsArea.scss'
import Card from '../Card/Card'

const CardsArea = React.memo(({ listForRender, message, sort }) => {

  const [cardToRender, setCardToRender] = React.useState([])
  const [buttonVisible, setButtonVisible] = React.useState(true)
  const [numbers, setNumbers] = React.useState(2)


  // сортировка по цене и длительности перелета 
  React.useEffect(() => {
    if (sort) {
      switch (sort) {
        case 'priceUp':
          listForRender.sort((cardLeft, cardRight) =>
            Number(cardLeft.flight.price.total.amount) - Number(cardRight.flight.price.total.amount))
          break
        case 'priceDown':
          listForRender.sort((cardLeft, cardRight) =>
            Number(cardRight.flight.price.total.amount) - Number(cardLeft.flight.price.total.amount))
          break
        case 'duration':
          listForRender.sort((cardLeft, cardRight) =>
            Number(cardLeft.flight.legs[0].duration) - Number(cardRight.flight.legs[0].duration))
          break
        default:
          console.log('Блок поиска "Сортировать" не использовался')
      }
    }
  }, [sort, listForRender])


  React.useEffect(() => {
    setButtonVisible(true)
    setCardToRender(
      listForRender.slice(0, numbers).map(card =>
        <Card
          key={card.flightToken}
          card={card}
        />
      )
    )
    listForRender.length <= numbers && setButtonVisible(false)
  }, [listForRender, numbers, sort])


  const addCardsToScreen = () => {
    setNumbers(numbers + 2)
  }


  return (
    <section className="cards-area">
      {
        message ?
          <p className="cards-area__message">{message}</p>
          :
          <div className="cards-area__flex">{cardToRender}</div>
      }
      {
        buttonVisible &&
        !message &&
        <button className="cards-area__button" onClick={addCardsToScreen}>ПОКАЗАТЬ ЕЩЁ</button>
      }
    </section>
  )
})

export default CardsArea
