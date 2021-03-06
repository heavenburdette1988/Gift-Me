import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserProviders";
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [about, setAbout] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [CreateDateTime, setCreateDateTime] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();


  const registerClick = (e) => {
     e.preventDefault();
      if (password && password !== confirmPassword) {
        alert("Passwords don't match. Do better.");
      } else {
        const userProfile = { firstName, lastName, displayName, imageLocation, email, about, dateOfBirth, CreateDateTime  };
        register(userProfile, password)
          .then(() => navigate("/"));
      }
   
 };

  return (
    <>
    <div className="register">
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imageLocation">Profile Image URL</Label>
          <Input id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="dateOfBirth">Date Of Birth</Label>
          <Input id="dateOfBirth" type="date" onChange={e => setDateOfBirth(e.target.value)} />
        </FormGroup>
        <Label htmlFor="About">About</Label>
        <p>Favorite colors, items you collect, hobbies, favorite books and music genre are some examples to what goes here. </p>
        <FormGroup>
                   <textarea id="about" rows="5
          " Cols="100" onChange={e => setAbout(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
             </fieldset>
    </Form>
    <Link to="/login">Back to login</Link>
    </div>
    </>
   
    
  );
}