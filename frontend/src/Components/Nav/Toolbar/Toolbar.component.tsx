import * as React from 'react';
import { connect } from 'react-redux';
import { IReducers } from '../../../index';
import MenuIcon from '@material-ui/icons/Menu';
import classes from './Toolbar.module.scss'
import { Toolbar, IconButton, Button } from '@material-ui/core';
import { ERoutesPath } from '../../../Modals/Enums/Paths.enum';
import { NavLink } from 'react-router-dom';

interface ToolbarProps extends IMapState, IMapDispatch {
}

const ToolbarComponent: React.SFC<ToolbarProps> = (props) => {
    return (
        <Toolbar className={classes.Toolbar}>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="Open drawer"
            >
                <MenuIcon />
            </IconButton>
            <div className={classes.ButtonContainer}>
                <NavLink to={ERoutesPath.signIn}><Button className={classes.Button}>Sign In</Button></NavLink>

            </div>
        </Toolbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarComponent);