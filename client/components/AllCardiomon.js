import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Cardiomon(props) {
  const { cardiomon, user } = props;
  console.log('cardiomon ', cardiomon)
  return (
    <div className="all-cardiomon-container">
      <Card.Group>
        {cardiomon &&
          cardiomon.map(mon => (
            <Card key={mon.id} link>
              <Image
                src={mon.imageUrl}
                centered
                size="medium"
                as={Link}
                to={`/cardiomon/${mon.id}`}
              />
              <Card.Content>
                <Card.Header as={Link} to={`/cardiomon/${mon.id}`}>
                  {mon.name}
                </Card.Header>
                <Card.Description>
                  {mon.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                {/* <div className="card-price-button">
                  {mon.inventory ? (
                    <Button
                      className="card-button"
                      positive
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button className="card-button" disabled>
                      Caught!
                    </Button>
                  )}
                </div> */}
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </div>
  );
}

const mapState = state => {
  return {
    cardiomon: state.cardiomon,
    user: state.user
  }
}

const cardiomonContainer = connect(mapState)(Cardiomon);
export default cardiomonContainer;
