import React,  { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import getData from '../../redux/actions/getData';
import restartGame from '../../redux/actions/restartGame';
import selectItem from '../../redux/actions/selectItem';
import partnerFound from '../../redux/actions/partnerFound';
import setEndGame from '../../redux/actions/endGame';
import './style.css';

class Playing extends Component {
    componentDidMount() {
        this.props.getData();
    }
    restartGame() {
        this.props.restartGame();
    }
    itemSelected(indexRow, indexColumn, column) {
        const { lastColumn } = this.props;
        if (column.isOpen === true)
            return;
        if (lastColumn === undefined || lastColumn.id === undefined ) {
            this.props.selectItem(indexRow, indexColumn, column, true);    
        }
        else if(lastColumn.id === column.id) {
            this.props.partnerFound(lastColumn, { ...column, indexRow, indexColumn }); 
            alert('Pareja Encontrada');
            this.validateFinishGame();
        }
        else {
            const lastColumnSave = { ...lastColumn };
            const { selectItem } = this.props;
            this.props.selectItem(indexRow, indexColumn, column, true); 
            setTimeout(function() {
                selectItem(lastColumnSave.indexRow, lastColumnSave.indexColumn, undefined, false);
                selectItem(indexRow, indexColumn, undefined, false);    
            }, 500);   
        }
        
    }
    validateFinishGame() {
        let counterCloseItems = 0;
        this.props.data.forEach(row => {
            row.columns.forEach(column => {
                if(column.isOpen === false){
                    counterCloseItems++;
                }
            });
        });
        if (counterCloseItems === 0) {
            this.props.setEndGame();
            alert('Fin del juego.');
        }
        
    }
    render () {
        const { data, endGame } = this.props;
        return (
            <div className="page">
                <Typography className="page-message" variant="h5" component="h1" >
                    Encuentra la pareja
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                        <Grid container direction="row">
                            <Grid item xs={4} md={4} >
                            </Grid>
                            <Grid item  md={4} xs={4}>
                            {data && data.map((row, indexRow) => 
                                <Grid container direction="row" key={indexRow}>
                                    {row.columns.map((column, indexColumn) => 
                                        <Grid key={indexColumn} padding={1} item md={3} xs={3} >
                                            <Paper 
                                                className="items" 
                                                onClick={(event) => this.itemSelected(indexRow, indexColumn, column)}>
                                                {
                                                    column.isOpen ? <img src={column.img} className="imagen" /> :  <img title={column.img} src='/img/oculto.png' className="imagen" />
                                                }
                                            </Paper>
                                        </Grid>
                                    )} 
                                </Grid>
                            )}
                            </Grid>
                            <Grid item xs={4} md={4}>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                { endGame &&
                    <Typography className="page-message-gamer" component="h3" 
                    onClick={(event) => this.restartGame()}>
                        Reniciar Juego
                    </Typography>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.playing.data,
        lastColumn: state.playing.lastColumn,
        endGame: state.playing.endGame
    }
}

const mapDispatchToProps = {
    getData,
    restartGame,
    selectItem,
    partnerFound,
    setEndGame
}

export default  connect(mapStateToProps, mapDispatchToProps)(Playing);