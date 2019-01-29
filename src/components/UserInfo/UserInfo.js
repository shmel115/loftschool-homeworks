import React, { PureComponent } from 'react';
import styles from './UserInfo.module.css';
import { connect } from 'react-redux';
import { getUserResult, getUserIsFetch } from '../../modules/User';

const mapStateToProps = state => ({
  user: getUserResult(state),
  isLoading: getUserIsFetch(state)
});

class UserInfo extends PureComponent {
  render() {
    const { user, isLoading } = this.props;
    if (!user && !isLoading) {
      return <p>Пользователь не найден</p>;
    } else if (!user && isLoading) {
      return <p>Загрузка...</p>;
    } else {
      return (
        <div className={styles.root}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={user.avatar_url}
              alt={user.name}
            />
          </div>
          <p className="t-user-name">{user.name}</p>
          <p className="t-user-bio">{user.bio}</p>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(UserInfo);
