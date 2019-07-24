import * as React from 'react';
import { withDialog } from '../../../UI/Dialog/WithDialog.component';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { IAction } from '../../../../Store/Actions/Action.enum';
import { IReducers } from '../../../../index';
import { RouteComponentProps } from 'react-router-dom';

interface SignUpProps extends RouteComponentProps {
}

interface SignUpState {

}

const SignUp: React.SFC<SignUpProps> = (props) => {
    const initialState: SignUpState= {

    } 

    const [state, setState] = React.useState(initialState)

    return (
        <div>test</div>
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