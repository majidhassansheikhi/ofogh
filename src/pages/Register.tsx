
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
import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

interface RegisterProps {
  fname: string;
  lname: string;
  email: string;
  password: string;
  repeatPassword: string;
  phoneNumber: string; // some phone numbers require +signs or ...
}

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterProps>({
    fname: "",
    lname: "",
    email: "",
    password: "",
    repeatPassword: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [valid, setValid] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
     const validationError: { [key: string]: string } = {};
    if (formData.fname === null || formData.fname === "") {
      isValid = false;
      validationError.fname = "نام الزامی است";
    }
    if (formData.lname === null || formData.lname === "") {
      isValid = false;
      validationError.lname = "نام خانوادگی الزامی است";
    }
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
    if (formData.repeatPassword === null || formData.repeatPassword === "") {
      isValid = false;
      validationError.repeatPassword = "تکرار گذرواژه الزامی است";
    } else if (formData.password !== formData.repeatPassword) {
      isValid = false;
      validationError.repeatPassword = "گذرواژه با تکرار آن مطابق نیست";
    }
    if (formData.phoneNumber === null || formData.phoneNumber === "") {
      isValid = false;
      validationError.phoneNumber = "شماره همراه الزامی است";
    }

    setErrors(validationError);
    setValid(isValid);

    if (Object.keys(validationError).length === 0) {
      axios
        .post("http://localhost:8000/users", formData)
        .then(() => {
          alert("با موفقیت ثبت شد");
          navigate("/login");
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
        <Typography variant="h5">ثبت نام</Typography>
        {!valid && (
          <span className="display-error">
            <Typography>
              {errors.fname};{errors.lname};{errors.email};{errors.password};
              {errors.repeatPassword};{errors.phoneNumber}
            </Typography>
          </span>
        )}
        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="نام"
                  autoFocus
                  value={formData.fname}
                  onChange={(e) =>
                    setFormData({ ...formData, fname: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lname"
                  required
                  fullWidth
                  id="lname"
                  label="نام خانوادگی"
                  value={formData.lname}
                  onChange={(e) =>
                    setFormData({ ...formData, lname: e.target.value })
                  }
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  name="repeatPassword"
                  required
                  fullWidth
                  id="repeatPassword"
                  label="تکرار گذرواژه"
                  placeholder="تکرار گذرواژه"
                  type="password"
                  value={formData.repeatPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, repeatPassword: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phoneNumber"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="شماره تلفن"
                  placeholder="شماره تلفن خود را وارد کنید"
                  type="number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ثبت نام
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">حساب کاربری دارید؟ وارد شوید</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;

