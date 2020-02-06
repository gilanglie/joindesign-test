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
export const Login: React.FC = () => {
    const [cookies, setCookie] = useCookies(['login']);
    const [values, setValues] = useState<State>({
        email: '',
        password: ''
    });
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorLogin, seterrorLogin] = useState(false);

    React.useEffect(() => {
        if(cookies.login.isAuth) window.location.href = '/dashboard';
    });
      
    const handleChange = (prop: keyof State) => (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setValues({ ...values, [prop]: event.target.value }); 
      };

    const handleSubmit = (
        event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
      ) => {
        event.preventDefault();
        !values.email ? setErrorEmail(true) : setErrorEmail(false);
        !values.password ? setErrorPassword(true) : setErrorPassword(false);            

        if(values.email == 'support@joinprint.com.hk' && values.password == 'support@joinprint.com.hk'){
            seterrorLogin(false);
            setCookie('login', {isAuth: true, email: values.email} , { path: '/' });
            window.location.href = '/dashboard';
        }else{
            seterrorLogin(true);
        }
      };    
    return ( 
    <Container fluid className="h-100vh" style={{height: '100vh',backgroundImage:`url(${bgImage})`}}>
        <Row className="align-items-center justify-content-center h-100">
            <Col xs="12" md="4" className="mx-auto " > 
                <Card>
                    <CardImg top width="100%" src={logo} alt="Logo" className="w-50 align-self-center mt-5" />
                    <CardBody className="mb-5">
                    <CardTitle className="text-center m-4"><h2>Sign Up</h2></CardTitle>
                    <CardText>                         
                        <Form>
                            <FormGroup>
                                <Input type="email" placeholder="Email" onChange={handleChange('email')} />
                                {errorEmail? <span className="text-danger">Required</span> : ''}
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" placeholder="Password" onChange={handleChange('password')}/>
                                {errorPassword? <span className="text-danger">Required</span> : ''}
                            </FormGroup>
                            <Button className="btn-block" color="primary" onClick={handleSubmit}>Submit</Button>
                            {errorLogin? <h6 className="text-danger text-center">Login error!</h6> : ''}
                        </Form>
                    </CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
    
    ) 
  }