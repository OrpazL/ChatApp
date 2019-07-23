
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { IReducers } from '../../../../index';
import { withDialog } from '../../../UI/Dialog/WithDialog.component';
import MaterialUIForm from 'react-material-ui-form'
import { TextField,  Button } from '@material-ui/core';
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
    React.useEffect(() => {
        const x = {
            y: 55
        }
        console.table(x)

    }, [])

    const onChange = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        const temp = { ...state }
        temp.form[name as keyof ISignInForm].value = value;
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

    const onSubmit = () => {
        
    }
    return (
        <div className={classes.SignIn}>
            {form}
            <Button onClick={}></Button>
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