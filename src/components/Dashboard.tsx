import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input,   Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
   } from 'reactstrap';
import { useCookies } from 'react-cookie';
import bgImage from '../assets/bg.jpg';
import logo from '../assets/logo-dark.svg';

interface State {
    email: string;
    password: string;
}
export const Dashboard: React.FC = () => {
    const [cookies, removeCookie] = useCookies(['login']);

    const [inputValue, setinputValue] = useState<any>('');
    const [values, setValues] = useState<State>({
        email: '',
        password: ''
    });
    const [errorInput, seterrorInput] = useState(false);
    const [outputValue, setoutputValue] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    React.useEffect(() => {
        if(!cookies.login.isAuth) window.location.href = '/';
    });
    const handleLogout = (
      event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
    ) => {
          removeCookie('login', { path: '/' });
          window.location.href = '/';
    }; 
    const handleChange = (prop: keyof State) => (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setValues({ ...values, [prop]: event.target.value }); 
      };
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setinputValue(event.target.value); 
    };

    const handleSubmit = (
      event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();
      !inputValue ? seterrorInput(true) : seterrorInput(false);
      const str = inputValue;
      const spacing = str.split('');
      let index = [];
      const index1:any = [];

          for (var i = 0; i < spacing.length; i++) {
          if (spacing[i] == spacing[i+1] && spacing[i+1] == spacing[i+2]
              ||
              spacing[i] != spacing[i+1] && spacing[i] != spacing[i-1]
              ) { 
                  index.push(spacing[i]);
              }
          }

          for (var i = 0; i < index.length; i++) {
          if (index[i] == index[i+1] && index[i+1] == index[i+2]
              ||
              index[i] != index[i+1] && index[i] != index[i-1]
              ) { 
                  index1.push(index[i]);
              }
          }
      setoutputValue(index1)
    };    
    return ( 
    <Container fluid className="h-100vh" style={{height: '100vh',backgroundColor:'#e9ecef'}}>
        <Row className="align-items-center ">
            <Col md="12" className="mx-auto bg-white p-3 mb-5" >
              <Row  >
                <Col >
                <img src={logo} style={{maxHeight:'50px'}}/>
                </Col>
                <Col className="text-right align-self-center">
                  <h6 className="d-inline mr-4 ">Hello, {cookies.login ? cookies.login.email : ''}!</h6>
                  <Button className="d-inline" color="danger" onClick={handleLogout}>Logout</Button>
                </Col>
              </Row>
            </Col>
            <Col className="mx-auto " > 
                <Card>
                    <CardBody className="mb-5">
                    <CardTitle className="text-center m-4"><h2>Problem Solving</h2></CardTitle>
                    <CardText>                         
                        <Form>
                            <FormGroup>
                                <Input type="text" placeholder="Input String" onChange={ e => {handleInputChange(e)}} />
                                {errorInput? <span className="text-danger">Required</span> : ''}
                            </FormGroup>
                            <Button className="btn-block" color="primary" onClick={handleSubmit}>Submit</Button>
                            {outputValue? <h6 className="text-center">Output : {outputValue}</h6> : ''}
                        </Form>
                    </CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col className="mx-auto mt-4" > 
                <Card>
                    <CardBody className="mb-5">
                    <CardTitle className="text-center m-4"><h2>Database</h2></CardTitle>
                    <CardText>                         
                        <Row>
                          <Col>
                          <h4>Sql Script</h4>
                            <p>
                            CREATE TABLE employees ( <br/>
                                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, <br/>
                                name VARCHAR(30) NOT NULL, <br/>
                                salary VARCHAR(30) NOT NULL<br/>
                            ); <br/>
                            <br/>
                            <br/>
                            INSERT INTO `employees` (`name`, `salary`) <br/>
                            VALUES ( 'Gavin', '1420'); <br/>
                            INSERT INTO `employees` (`name`, `salary`) <br/>
                            VALUES ( 'Norie', '2006'); <br/>
                            INSERT INTO `employees` (`name`, `salary`) <br/>
                            VALUES ( 'Somya', '2210'); <br/>
                            INSERT INTO `employees` (`name`, `salary`) <br/>
                            VALUES ( 'Waiman', '3000'); <br/>
                            </p>
                          </Col>
                          <Col>
                          <h4>SQL Query</h4>
                            <p>
                            SELECT AVG(salary) - AVG(REPLACE(salary, '0', '')) AS avg_salary FROM employees;
                            </p>
                          </Col>
                        </Row>
                    </CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
    
    ) 
  }