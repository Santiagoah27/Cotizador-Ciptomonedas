import styled from "@emotion/styled";
const Result = ({ trade }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    trade;

  const Result = styled.div`
    color: #fff;
    font-family: "lato", sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
  `;
  const Text = styled.p`
      font-size: 18px;
    span {
      font-weight: 700;
    }
  `;
  const Image = styled.img`
    display:block;
    width: 120px;
  `;
  const Price = styled.p`
    font-size: 24px;
    span {
      font-weight: 700;
    }
  `;
  return (
    <Result>
      <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen cripto" />
      <div>
        <Price>
          El Precio es de: <span>{PRICE}</span>
        </Price>
        <Text>
          Precio más alto del día: <span>{HIGHDAY}</span>
        </Text>
        <Text>
          Precio más bajo del día: <span></span>
          {LOWDAY}
        </Text>
        <Text>
          Variación últimas 24 horas: <span></span>
          {CHANGEPCT24HOUR}
        </Text>
        <Text>
          Última Actialización: <span></span>
          {LASTUPDATE}
        </Text>
      </div>
    </Result>
  );
};

export default Result;
