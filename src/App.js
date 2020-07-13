import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
  FormSelect,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "shards-react";
import { useForm, Controller } from "react-hook-form";
import { Trash, Plus } from "react-bootstrap-icons";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

function Form({
  values = {
    customer: "NASA",
    flights: [],
  },
  onSubmit = () => {},
}) {
  const { register, errors, control, handleSubmit } = useForm({
    reValidateMode: "all",
    mode: "all",
    defaultValues: values,
  });
  const [expandoIndexes, setExpandoIndexes] = React.useState(
    Object.keys(values.flights)
  );

  const onDelete = (index) => {
    setExpandoIndexes(expandoIndexes.filter((i) => i !== index));
  };

  const addNewFlight = () => {
    setExpandoIndexes([...expandoIndexes, expandoIndexes.length + 1]);
  };

  const onRawSubmit = (data) => {
    onSubmit({
      ...data,
      flights: Object.values(data.flights),
    });
  };

  return (
    <form onSubmit={handleSubmit(onRawSubmit)}>
      <InputGroup className="mb-2">
        <InputGroupAddon type="prepend">
          <InputGroupText>Customer</InputGroupText>
        </InputGroupAddon>
        <FormInput
          placeholder="Customer name"
          invalid={!!errors.customer}
          name="customer"
          innerRef={register({
            required: true,
          })}
        />
      </InputGroup>
      <Container>
        {expandoIndexes.map((ind) => (
          <Row key={`expando:${ind}`}>
            <Col sm="3" style={{ paddingLeft: 0 }}>
              <Controller
                as={
                  <FormSelect>
                    <option value="Falcon 9">Falcon 9</option>
                    <option value="Falcon Heavy">Falcon Heavy</option>
                  </FormSelect>
                }
                defaultValue="Falcon 9"
                name={`flights[${ind}].type`}
                control={control}
              />
            </Col>
            <Col sm="8" style={{ paddingLeft: 0 }}>
              <FormInput
                placeholder="Payload"
                invalid={
                  errors.flights &&
                  errors.flights[ind] &&
                  !!errors.flights[ind].payload
                }
                name={`flights[${ind}].payload`}
                innerRef={register({
                  required: true,
                })}
                className="mb-2"
              />
            </Col>
            <Col sm="1" style={{ padding: 0 }}>
              <Button style={{ width: "100%" }} onClick={() => onDelete(ind)}>
                <Trash />
              </Button>
            </Col>
          </Row>
        ))}
      </Container>
      <div style={{ paddingTop: "1em" }}>
        <Button onClick={() => addNewFlight()}>
          <Plus />
          {"  "}
          Add New Flight
        </Button>
      </div>
      <div
        style={{
          paddingTop: "1em",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

function App() {
  const [values, setValues] = React.useState({
    customer: "NASA",
    flights: [],
  });
  const [key, setKey] = React.useState(1);
  return (
    <Container style={{ padding: "1em" }}>
      <div
        style={{
          paddingBottom: "1em",
          display: "grid",
          gridTemplateColumns: "repeat(5,20%)",
          gridColumnGap: "1em",
        }}
      >
        <Button
          pill
          theme="success"
          onClick={() => {
            setValues({
              customer: "NASA",
              flights: [],
            });
            setKey(key + 1);
          }}
        >
          Empty Form
        </Button>
        <Button
          pill
          theme="info"
          onClick={() => {
            setValues({
              customer: "NASA",
              flights: [
                { type: "Falcon Heavy", payload: "Car" },
                { type: "Falcon 9", payload: "Satellite" },
                { type: "Falcon 9", payload: "Astronauts" },
              ],
            });
            setKey(key + 1);
          }}
        >
          Populated Form
        </Button>
      </div>
      <Form values={values} key={key} onSubmit={(data) => console.log(data)} />
    </Container>
  );
}

export default App;
