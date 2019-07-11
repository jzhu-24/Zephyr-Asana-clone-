import React from 'react';
import TaskIndexContainer from '../tasks/task_index_container';

class ColumnIndexItem extends React.Component {

  render() {   
    if (this.props.column === undefined) return null;

    return (
      <div className="column">
        <p className="column-name">{this.props.column.name}</p>
        <TaskIndexContainer 
          column={this.props.column}/>
      </div>
    )
  };
};

export default ColumnIndexItem;