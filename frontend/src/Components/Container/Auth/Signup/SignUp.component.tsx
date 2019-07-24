import * as React from 'react';
import { withDialog } from '../../../UI/Dialog/WithDialog.component';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { IAction } from '../../../../Store/Actions/Action.enum';
import { IReducers } from '../../../../index';
import { RouteComponentProps } from 'react-router-dom';
import { FormControl } from '../../../../Modals/Interfaces/Form.interface';
import { setFormControl, setConfig } from '../../../Form/Form';
import { EnumInputType } from '../../../../Modals/Enums/Form.enum';
import { TextField, Button } from '@material-ui/core';
import classes from './SignUp.module.scss';

interface SignUpProps extends RouteComponentProps {
}

interface SignUpState {
    form: ISignUpForm,

}

interface ISignUpForm {
    username: FormControl<string>,
    password: FormControl<string>,
    email: FormControl<string>
}

const USERNAME = 'Username';
const PASSWORD = 'Password';
const EMAIL = 'Email';

const SignUp: React.SFC<SignUpProps> = (props) => {


    const onChange = (e: any) => {
        const value = e.target.value;
        const name: keyof ISignUpForm = e.target.name.toLowerCase();
        const temp = { ...state }
        temp.form[name].value = value;
        setState(temp);
    }

    const initialState: SignUpState = {
        form: {
            username: setFormControl(USERNAME, EnumInputType.Input, setConfig(USERNAME, USERNAME, USERNAME, 'text'), '', onChange),
            password: setFormControl(PASSWORD, EnumInputType.Input, setConfig(PASSWORD, PASSWORD, PASSWORD, 'text'), '', onChange),
            email: setFormControl(EMAIL, EnumInputType.Input, setConfig(EMAIL, EMAIL, EMAIL, 'text'), '', onChange)
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
        const user: any = {}
        for (let key in state.form) {
            user[key] = (state as any).form[key].value;
        }
        console.log(user);
    }


    return (
        <section className={classes.SignUp}>
            {form}
            <Button className={classes.Button} onClick={onSubmit}>Sign Up</Button>
        </section>
    );
};

interface IMapState {

}

const mapStateToProps = (state: IReducers): IMapState => (
    {

    }
)
interface IMapDispatch {

}
const mapDispatchToProps = (dispatch: React.Dispatch<IAction>): IMapDispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withDialog(SignUp)));