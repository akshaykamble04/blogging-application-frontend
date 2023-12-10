import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";

import { signUp } from "../services/user-service";
import { toast } from "react-toastify";



const Signup = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
    });

    const [error, setError] = useState({
        errors: {},
        isError: false
    })

    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value })
    };

    const resetData = () => {
        setData({
            name: "",
            email: "",
            password: "",
            about: "",
        });
    }

    // submit the form
    const submitForm = (event) => {
        event.preventDefault();


        if (error.isError) {
            toast.error("Form data is invalid...");

            return;
        }
        console.log(data);

        //server call
        signUp(data).then((resp) => {
            console.log(resp);
            console.log("success log");
            toast.success("User is registered successfully !!!" + resp.id);
            setData({
                name: "",
                email: "",
                password: "",
                about: "",
            });

        }).catch((error) => {
            console.log(error);
            console.log("Error Log");

            setError({
                errors: error,
                isError: true
            });
        });
    }
    return (
        <Base>
            <Container>
                <Row className="mt-4">
                    {JSON.stringify(data)}
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader>
                                <h3>Fill Information To Register !!</h3>
                            </CardHeader>
                            <CardBody>
                                {/* Creating Form*/}
                                <Form onSubmit={submitForm}>
                                    <FormGroup>
                                        <Label for="name">Enter Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Here"
                                            id="name"
                                            onChange={(e) => handleChange(e, 'name')}
                                            value={data.name}
                                            invalid={error.errors?.response?.data?.name ? true : false}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input
                                            type="email"
                                            placeholder="Enter Here"
                                            id="email"
                                            onChange={(e) => handleChange(e, 'email')}
                                            value={data.email}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Enter Here"
                                            id="Password"
                                            onChange={(e) => handleChange(e, 'password')}
                                            value={data.password}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="about">Enter About</Label>
                                        <Input
                                            type="textarea"
                                            placeholder="Enter Here"
                                            id="about"
                                            style={{ height: "250px" }}
                                            onChange={(e) => handleChange(e, 'about')}
                                            value={data.about}

                                        />
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button outline color="light">Register</Button>
                                        <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
                                    </Container>
                                </Form>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>

    )
};

export default Signup;