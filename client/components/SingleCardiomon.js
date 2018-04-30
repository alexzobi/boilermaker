import React from 'react';
import { Container, Header, Image, Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchSingleCardiomon, getUser } from '../store';

const mapState = state => {
  // union of the state address
  return {
    cardiomon: state.singleCardiomon,
    user: state.user,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  // load single product and handle clicks
  return {
    loadSingleCardiomon: () => {
      dispatch(fetchSingleCardiomon(ownProps.match.params.cardiomonId));
    }
  };
};

class SingleCardiomon extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleCardiomon();
  }

  handleAddClick(evt) {
    const key = evt.target.name;
    const value = +evt.target.value + 1;
    const points = this.state.points ?
    this.state.points - 1 : this.props.user.points - 1
    this.setState({ [key]: value, points })
  }

  handleRemoveClick(evt) {
    const key = evt.target.name;
    const value = +evt.target.value - 1;
    const points = this.state.points ?
      this.state.points + 1 : this.props.user.points + 1
    this.setState({ [key]: value, points})
  }

  render() {
    const { imageUrl, name, description,
            health, defense, attack
          } = this.props.cardiomon;
    const points = this.state.points ?
      this.state.points
      : this.props.user.points;
    console.log('state ', this.state)
    console.log('props ', this.props)
    const newHealth = this.state.health ? this.state.health : health
    const newAttack = this.state.attack ? this.state.attack : attack
    const newDefense = this.state.defense ? this.state.defense : defense
    return name ? (
      <Container className="singleCardiomon">
        <div id="imageStats">
          <div>
            <Image src={imageUrl} size="large" />
          </div>
          <div>
            <Header as="h1">{name}</Header>
            {
              this.props.isCaught ? (
                <div>
                  <Header as="h2">Health: {newHealth}</Header>
                  <Button
                    name="health"
                    value={newHealth}
                    onClick={(evt) => this.handleAddClick(evt)}
                    positive
                  >
                    +
                  </Button>
                  <Button
                    name="health"
                    value={newHealth}
                    onClick={(evt) => this.handleRemoveClick(evt)}
                    negative
                  >
                    -
                  </Button>
                  <Header as="h2">Attack: {newAttack}</Header>

                  <Button
                    name="attack"
                    value={newAttack}
                    onClick={(evt) => this.handleAddClick(evt)}
                    positive
                  >
                    +
                  </Button>
                  <Button
                    name="attack"
                    value={newAttack}
                    onClick={(evt) => this.handleRemoveClick(evt)}
                    negative
                  >
                    -
                  </Button>

                  <Header as="h2">Defense: {newDefense}</Header>

                  <Button
                    name="defense"
                    value={newDefense}
                    onClick={(evt) => this.handleAddClick(evt)}
                    positive
                  >
                    +
                  </Button>
                  <Button
                    name="defense"
                    value={newDefense}
                    onClick={(evt) => this.handleRemoveClick(evt)}
                    negative
                  >
                    -
                  </Button>
                  <Header as="h2">Available Training Points: { points }</Header>
                </div>
              ) : (
                <div>
                  <Header as="h2">Health: {newHealth}</Header>
                  <Header as="h2">Attack: {newAttack}</Header>
                  <Header as="h2">Defense: {newDefense}</Header>
                </div>
              )
            }
          </div>
        </div>
          <Header as="h2">Description:</Header>
          <p>{description}</p>
      </Container>
    ) : (
      <p>Loading...</p>
    );
  }
}

const SingleCardiomonContainer = connect(mapState, mapDispatch)(SingleCardiomon);

export default SingleCardiomonContainer;
