import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react'
import Display from '../Display'
import * as yup from "yup";
import axios from "axios";

const Login = () => {

  const [show, setShow] = useState(false)
  const [status, setStatus] = useState(false)

  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(4, "Mínimo de 4 dígitos")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleForm = (data) => {
    console.log(data)
    axios
      .post("https://kenzieshop.herokuapp.com/sessions/", data)
      .then((response) => {
        setStatus(true)
        setShow(true)
        console.log(response);
      })
      .catch((e) => {
        console.log(e)
        setShow(false);
        setStatus(true)
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)}>
        <div>
          <TextField
            name="username"
            label="Username"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </div>
        <div>
          <TextField
            name="password"
            label="Password"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </div>
      </form>
      {status && <Display show={show}/>}
    </>
  );
};

export default Login;