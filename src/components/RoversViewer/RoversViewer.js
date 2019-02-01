// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './RoversViewer.module.css';
import Grid from '@material-ui/core/Grid';
import SelectSol from '../SelectSol';
import RoverPhotos from '../RoverPhotos';
import {
  changeSol,
  getSol,
  getRovers,
  getRoversPhotos,
  fetchPhotosRequest
} from '../../modules/RoverPhotos';

const mapStateToProps = state => ({
  sol: getSol(state),
  rovers: getRovers(state),
  photos: (name, sol) => getRoversPhotos(state, name, sol)
});

const mapDispatchToProps = {
  changeSol,
  fetchPhotosRequest
};

class RoversViewer extends Component {
  handleChangeSol = position => {
    const { changeSol } = this.props;
    changeSol(position);
  };
  renderRovers() {
    const { photos, rovers, sol } = this.props;
    return (
      <div>
        {rovers.map(rover => {
          return (
            <RoverPhotos
              key={rover}
              name={rover}
              photos={photos(rover, sol.current)}
            />
          );
        })}
      </div>
    );
  }

  render() {
    console.log(this.props);
    const { sol } = this.props;
    return (
      <Grid container justify="center" className={classes.root}>
        <SelectSol
          selectedSol={sol.current}
          minSol={sol.min}
          maxSol={sol.max}
          changeSol={this.handleChangeSol}
        />
        <div style={{ width: '100%' }}>{this.renderRovers()}</div>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoversViewer);
