import React from 'react';
import List, {ListItem, ListItemText} from 'material-ui/List'
import Menu, {MenuItem} from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  button: {
    minWidth: 50
  },
});

class ChapterSelect extends React.Component {
  state = {
    anchorEl: null
  };

  handleMenuItemClick = (event, chapterId) => {
    this.setState({ anchorEl: null });
    return this.props.handleMenuItemClick(event, chapterId)
  }

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, eventData, chapterId, handleMenuItemClick } = this.props;
    const chapter = eventData[chapterId];

    return (
      <div>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Current City"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={`Chapter: ${chapter.name}`}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {Object.keys(eventData).map((chapterId, index) => (
            <MenuItem
              key={chapterId}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, chapterId)}
            >
              {eventData[chapterId].name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default ChapterSelect;