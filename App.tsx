/*
 import * as React from 'react';
 import { Checkbox } from 'react-native-paper';
 
 export default class MyComponent extends React.Component {
   state = {
     checked: false,
   };
 
   render() {
     const { checked } = this.state;
     return (
       <Checkbox
         status={checked ? 'checked' : 'unchecked'}
         onPress={() => { this.setState({ checked: !checked }); }}
       />
     );
   }
 }
*/

import * as yup from "yup";
import { Formik } from "formik";

import React, { Component, Fragment } from "react";
import { TextInput, Text, Button, Alert } from "react-native";

import axios from "axios";

const handleSubmit = values => {
  //Alert.alert(JSON.stringify(values));
  var myData = JSON.stringify(values);
  axios
    .post(
      "http://localhost:35118/api/values",
      values
    )
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

export default class App extends Component {
  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email()
            .required(),
          password: yup
            .string()
            .min(6)
            .required()
        })}
      >
        {({  
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit
        }) => (
          <Fragment>
            <TextInput
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              placeholder="E-mail"
            />
            {touched.email && errors.email && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
            )}
            <TextInput
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder="Password"
              onBlur={() => setFieldTouched("password")}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.password}
              </Text>
            )}
            <Button
              title="Sign In"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </Fragment>
        )}
      </Formik>
    );
  }
}