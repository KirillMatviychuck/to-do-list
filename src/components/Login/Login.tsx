import {Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import classes from './Login.module.css'
import {useFormik} from "formik";
import {loginUserTC} from "./auth-reducer";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
        },
        onSubmit: values => {
            dispatch(loginUserTC(values.email, values.password, values.rememberMe))
        }
    });

    if (isLoggedIn) {
        return <Navigate to={'/to-do-list'}/>
    }

    return (
        <div>
            <div className={classes.alertMessage}>
                Working with to do list is completely tied to a paid server,
                so working without a paid account in this application is
                unfortunately not possible. If you want to see this project,
                write to me in private messages and I will provide data for
                a test login
            </div>
            <div className={classes.loginWrap}>
                <form className={classes.loginForm} onSubmit={formik.handleSubmit}>
                    <TextField type='email'
                               label="Email"
                               {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                    <TextField
                        type='password'
                        label="Password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                    <FormControlLabel
                        label={"Remember me"}
                        control={<Checkbox
                            color="primary"
                            {...formik.getFieldProps('rememberMe')}
                            checked={formik.values.rememberMe}
                        />}

                    />
                    <Button type="submit" variant="contained" color="primary">
                        Log In
                    </Button>
                </form>
            </div>
        </div>
    )
}
