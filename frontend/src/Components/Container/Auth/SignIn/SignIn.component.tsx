
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IReducers } from '../../../../index';
import { withDialog } from '../../../UI/Dialog/WithDialog.component';
import { TextField, Button } from '@material-ui/core';
import classes from './SignIn.module.scss';
import { FormControl } from '../../../../Modals/Interfaces/Form.interface';
import { setFormControl, setConfig } from '../../../Form/Form';
import { EnumInputType } from '../../../../Modals/Enums/Form.enum';
import { signInUser } from '../../../../Store/Actions/Auth.action';
import { IUser } from '../../../../Modals/Interfaces/User.interface';

interface SignInProps extends IMapDispatch, IMapState, RouteComponentProps {
}

interface SignInState {
    form: ISignInForm,
    // tempData: ITempData
}


interface ISignInForm {
    username: FormControl<string>,
    password: FormControl<string>
}

const USERNAME = 'Username'
const PASSWORD = 'Password'

const SignIn: React.SFC<SignInProps> = (props) => {
    React.useEffect(() => {

    }, [])

    const onChange = (e: any) => {
        const value = e.target.value;
        const name: keyof ISignInForm = e.target.name.toLowerCase();
        const temp = { ...state }
        temp.form[name].value = value;
        setState(temp);
    }

    const initialState: SignInState = {
        form: {
            username: setFormControl(USERNAME, EnumInputType.Input, setConfig(USERNAME, USERNAME, USERNAME, 'text'), '', onChange),
            password: setFormControl(PASSWORD, EnumInputType.Input, setConfig(PASSWORD, PASSWORD, PASSWORD, 'text'), '', onChange)
        },
    }
    const [state, setState] = React.useState(initialState)

    const form = Object.values(state.form).map((control: FormControl<any>) => {
        const classesArr = [classes.TextField];
        if (!control.valid) {
            classesArr.push(classes.Invalid)
        }
        return (
            <TextField
                key={control.label}
                className={classesArr.join(' ')}
                inputProps={control.config}
                value={control.value}
                variant="outlined"
                onChange={control.change}
                label={control.label}
                placeholder={control.config.placeholder}
            ></TextField>)
    })

    const onSubmit = async () => {
        const user = {
            username: state.form.username.value,
            password: state.form.password.value
        }
        props.signInUser(user);

    }
    return (
        <div className={classes.SignIn}>
            <span>{JSON.stringify(props.currentUser)}</span>
            {form}
            <Button className={classes.Button} onClick={onSubmit}>Sign In</Button>
        </div>
    );
};

interface IMapState {
    currentUser: IUser | null
}

const mapStateToProps = (state: IReducers): IMapState => (
    {
        currentUser: state.AuthReducer.currentUser
    }
)
interface IMapDispatch {
    signInUser: Function;

}
const mapDispatchToProps = (dispatch: React.Dispatch<any>): IMapDispatch => ({
    signInUser: (user: any) => dispatch(signInUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withDialog(SignIn)));