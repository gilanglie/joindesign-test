import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input,   Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Table
   } from 'reactstrap';
import { useCookies } from 'react-cookie';
import logo from '../assets/logo-dark.svg';
import axios from 'axios';

interface State {
    name: string;
    salary: string;
}
export const Dashboard: React.FC = () => {
  const [cookies, setCookie] = useCookies(['login']);

    const [inputValue, setinputValue] = useState<any>('');
    const [values, setValues] = useState<State>({
      name: '',
      salary: ''
    });
    const [tableEmployee, setTableEmployee] = useState([])
    const [tableTotal, setTableTotal] = useState('')
    const [errorInput, seterrorInput] = useState(false);
    const [outputValue, setoutputValue] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 1000,
    });

    const getEmployees = async () =>{
      instance.get('employees')
      .then((response:any)=>{
        console.log('res',response.data)
        setTableEmployee(response.data.data)
        setTableTotal(response.data.total)
      })
      .catch( err => console.log(err));
    }
    const createEmployees = (data:State) => {
      instance.post('employees', data)
        .then((response:any)=>{
          console.log('res',response.data)
          getEmployees()
        })
        .catch( err => console.log(err));
    }
    React.useEffect(() => {
        if(!cookies.login.isAuth) window.location.href = '/';
        getEmployees();
    },[]);
    const handleLogout = (
      event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
    ) => {
          setCookie('login', {isAuth: false});
          // removeCookie('login', { path: '/' });
          window.location.href = '/';
    }; 
    const handleChange = (prop: keyof State) => (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setValues({ ...values, [prop]: event.target.value }); 
      };
    const handlePost = (
      event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
    ) => {
      createEmployees(values);
    }
    const handleDelete = (e:any, id: any) => {
      instance.delete(`employees/${id}`)
      .then((response:any)=>{
        console.log('res',response.data)
        getEmployees()
      })
      .catch( err => console.log(err));
    } 
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setinputValue(event.target.value); 
    };

    const handleSubmit = (
      event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
    ) => {
      // !inputValue ? seterrorInput(true) : seterrorInput(false);
      // const str = inputValue;
      // instance.get(`reduce/${str}`)
      // .then((response:any)=>{
      //   console.log('res',response.data)
      //   setoutputValue(response.data)
      // })
      // .catch( err => console.log(err));

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
                      <Form>
                          <FormGroup>
                            <Label >Name</Label>
                            <Input type="text" onChange={handleChange('name')}/>
                          </FormGroup>
                          <FormGroup>
                            <Label>Salary</Label>
                            <Input type="number" onChange={handleChange('salary')}/>
                          </FormGroup>
                          <Button onClick={handlePost}>Submit</Button>
                      </Form>
                      <Table dark className="mt-4">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableEmployee.map((e : any, i : any) => {
                            return(
                            <tr>
                              <th scope="row">{e.id}</th>
                              <td>{e.name}</td>
                              <td>{e.salary}</td>
                              <td><Button color="red" style={{color:'red'}} onClick={(t)=> handleDelete(t ,e.id)}>Delete</Button></td>
                            </tr>
                            )
                            
                          })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={2}>
                              TOTAL  
                            </td>
                            <td colSpan={2}>
                              {tableTotal}  
                            </td>
                          </tr>
                        </tfoot>
                      </Table>
                    </CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
    
    ) 
  }