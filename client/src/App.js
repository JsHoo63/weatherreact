import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      location: '',
      weathers: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  getAllWeathers = () => {
    axios
      .get('/getAllWeathers')
      .then(result => {
        this.setState({ weathers: result.data });
        console.log(this.state.weathers);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllWeathers();
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }
  //for form
  onSubmit = e => {
    e.preventDefault();

    this.setState({ alertVisible: false });
    //console.log(this.state.title);

    const query = `/getweather?title=${this.state.location}`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
        this.setState({ alertVisible: true });
        }
        this.getAllWeathers();
      })
      .catch(error => {
        alert('Error: ', error);
      });
    //const data = this.state.movies;
    //this.setState({ movies: this.state.movies.reverse() });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeWeather(location) {
    this.setState({
      weathers: this.state.weathers.filter(weather => {
        if (weather.location !== location) return weather;
      })
    });
    const query = `/deleteweather?location=${location}`;
    axios
      .get(query)
      .then(result => {
        this.getAllWeathers();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }
  render() {
    return (
      <div className="App">
        <Jumbotron className="heading">
          <h4 className="display-3"><b>EVERY WEATHER</b></h4>
          <h2><p className="lead"><b>Search for weathers</b></p></h2>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Location not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="location">Enter a location</Label>
                  <Input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="enter a location..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <input class="submitlocation" type="submit" value="Submit"/>
                <p />
              </Form>
            </Col>
          </Row>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>Delete</th>
                  <th>Location</th>
                  <th>Country</th>
                  <th>Temperature</th>
                  <th>Weather</th>
                  <th>Icon</th>
                </tr>
              </thead>
              <tbody>
                {this.state.weathers.map(weather => {
                  return (
                    <tr>
                      <td>
                        <button
                         class="tablebutton"
                          onClick={() => {
                            this.removeWeather(weather.location);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      <td>{weather.name}</td>
                      <td>{weather.country}</td>
                      <td>{weather.temp}°C</td>
                      <td>{weather.mainweather}</td>
                      <td>
                        <img src={'http://openweathermap.org/img/w/'+ weather.icon +'.png'}/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
      
    );
  }
}

export default App;