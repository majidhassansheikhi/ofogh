import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

interface RegisterProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterProps>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [valid, setValid] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let isValid = true;
    const validationError: { [key: string]: string } = {};
    if (formData.email === null || formData.email === "") {
      isValid = false;
      validationError.email = "ایمیل الزامی است";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationError.email = "ایمیل معتبر نیست";
    }
    if (formData.password === null || formData.password === "") {
      isValid = false;
      validationError.password = "گذرواژه الزامی است";
    } else if (formData.password.length < 8) {
      isValid = false;
      validationError.password = "گذرواژه حداقل شامل 8 کاراکتر است";
    }
    setErrors(validationError);
    setValid(isValid);

    if (isValid) {
      axios
        .get("http://localhost:8000/users")
        .then((result) => {
          result.data.forEach((user: { email: string; password: string }) => {
            if (user.email === formData.email && user.password === formData.password) {
              alert("با موفقیت وارد شدید");
              navigate("/");
            } else if (user.email !== "" && !isValid) {
              validationError.email = "ایمیل اشتباه است";
              setErrors(validationError);
            }
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5"> ورود</Typography>
        {!valid && (
          <span className="display-error">
            <Typography>
              {errors.email};{errors.password};
            </Typography>
          </span>
        )}
        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="ایمیل"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="گذرواژه"
                  placeholder="گذرواژه خود را وارد کنید"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ورود
              </Button>
            </Grid>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register">ساخت حساب کاربری</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;


