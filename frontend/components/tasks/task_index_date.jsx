import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import Calendar from 'react-calendar';
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TaskIndexDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCalendar: false,
    }

    this.toggleShowCalendar = this.toggleShowCalendar.bind(this);
    this.closeCalendar = this.closeCalendar.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.convertShortDate = this.convertShortDate.bind(this);
    this.convertNumericDate = this.convertNumericDate.bind(this);
    this.dueDateClasses = this.dueDateClasses.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('mousedown', this.closeCalendar);
  }

  componentWillMount() {
    document.removeEventListener('mousedown', this.closeCalendar);
  } 

  closeCalendar(event) {
    if (!event.target.classList[0]) return;
    if (this.state.showCalendar && event.target.classList[0].slice(0,14) !== 'react-calendar') {
      this.toggleShowCalendar(event);
    }
  }

  dueDateClasses() {
    const { task, className } = this.props;

    const currDate = new Date();
    const newDate = new Date(task.due_date);
    const diffDays = this.convertShortDate(task.due_date);
    const diffDaysNum = Math.floor((currDate.getTime() - newDate.getTime())/(24*60*60*1000));
    
    return classNames(
      `${className}-date-text`,
      'grey',
      {
        'green': ['Tomorrow', 'Today'].includes(diffDays),
        'red': (diffDays === 'Yesterday' || diffDaysNum > 1),
      }
    );
  }

  selectDate = date => {
    const { task, updateTask } = this.props;
    task.due_date = date;

    this.toggleShowCalendar();
    updateTask(task);
  }

  toggleShowCalendar(e) {
    this.setState({ showCalendar: !this.state.showCalendar });
    e && e.stopPropagation();
  }

  convertShortDate(date) {
    if (!date) return;

    const engDate = {
      [-1]: 'Tomorrow',
      0: 'Today',
      1: 'Yesterday',
    }
    const newDate = new Date(date);
    const currDate = new Date();
    const diffDays = Math.floor((currDate.getTime() - newDate.getTime())/(24*60*60*1000));

    if (engDate[diffDays]) {
      return engDate[diffDays];
    } else {
      return `${newDate.toLocaleString('default', { month: 'short'})} ${newDate.getDate()}`
    }
  }

  convertNumericDate(date) {
    if (!date) return;
    const newDate = new Date(date);
    
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = String(newDate.getFullYear()).slice(2);

    if (day < 10) day = '0' + String(day);
    if (month < 10) month = '0' + String(month);

    return `${month}/${day}/${year}`;
  }

  render() {
    const { task, className } = this.props;
    const { showCalendar } = this.state;

    let date;
    let calendar;

    calendar = (
      // stopPropagation to prevent clicking calendar from loading task
      <div className={`${className}-calendar-container`} onClick={e => e.stopPropagation()}>
        <Calendar
          onClickDay={this.selectDate} 
          value={(task.due_date && new Date(task.due_date)) || new Date}
          className='task-calendar'/>
      </div>
    );

    if (!task.due_date) {
      date = (
        <div className={`${className}-date-icon-border`} onClick={this.toggleShowCalendar} >
          <FontAwesomeIcon icon={faCalendar} className={`${className}-date-icon`} />
        </div>
      )
    } else {
      date = (
        <div className={this.dueDateClasses()} onClick={this.toggleShowCalendar} >
          {this.convertShortDate(task.due_date)}
        </div>
      )
    }

    return (
      <div className={`${className}-date`}>
        {date}
        {showCalendar && calendar}
      </div>
    )
  }
}

export default withRouter(TaskIndexDate);
