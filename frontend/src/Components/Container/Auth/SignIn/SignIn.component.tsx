
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IReducers } from '../../../../index';
import { withDialog } from '../../../UI/Dialog/WithDialog.component';
import MaterialUIForm from 'react-material-ui-form'
import { TextField, } from '@material-ui/core';
import classes from './SignIn.module.scss';
import { FormControl } from '../../../../Modals/Interfaces/Form.interface';
import { setFormControl, setConfig } from '../../../Form/Form';
import { EnumInputType } from '../../../../Modals/Enums/Form.enum';

interface SignInProps extends IMapDispatch, IMapState, RouteComponentProps {
}

interface SignInState {
    form: ISignInForm,
    // tempData: ITempData
}

interface ITempData {
    username: string,
    password: string
}

interface ISignInForm {
    username: FormControl<string>,
    password: FormControl<string>
}

const USERNAME = 'Username'
const PASSWORD = 'Password'

const SignIn: React.SFC<SignInProps> = (props) => {
    const onChange = (e: string) => {
        debugger
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
                className={classesArr.join(' ')}
                inputProps={control.config}
                value={control.value}
                variant="outlined"
                onChange={control.change}
                label={control.label}
                placeholder={control.config.placeholder}
            ></TextField>)
    })
    return (
        <div className={classes.SignIn}>
            {form}
        </div>
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
const mapDispatchToProps = (dispatch: React.Dispatch<any>): IMapDispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withDialog(SignIn)));