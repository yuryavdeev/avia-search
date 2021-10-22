import React from 'react';
import './CardsArea.css';
import Card from '../Card/Card';
import flightsList from '../../utils/flights.json'

const CardsArea = React.memo(() => {
  const [data, setData] = React.useState(flightsList.result.flights)
  // const [data, setData] = React.useState([])
  // console.log(data)
  const [cardToRender, setCardToRender] = React.useState([])
  const [message, setMessage] = React.useState('')
  const [buttonVisible, setButtonVisible] = React.useState(true)
  const [numbers, setNumbers] = React.useState(2)


  React.useEffect(() => {
    data.length < 1 ?
      setMessage('Ничего не найдено')
      :
      setCardToRender(
        data.slice(0, numbers).map(card =>
          <Card
            key={card.flightToken}
            card={card}
          />
        )
      )

    data.length <= numbers && setButtonVisible(false)
  }, [data, numbers])


  const addCardsToScreen = () => {
    setNumbers(numbers + 2)
  }


  return (
    <section className="cards-area">
      {
        message ?
          <p className="cards-area__message">{message}</p>
          :
          <div className='cards-area__flex'>{cardToRender}</div>
      }
      {
        buttonVisible &&
        !message &&
        <button className='cards-area__button' onClick={addCardsToScreen}>Показать ещё</button>
      }
    </section>
  );
})

export default CardsArea;
