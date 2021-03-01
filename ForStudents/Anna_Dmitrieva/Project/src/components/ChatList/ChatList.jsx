import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';
import Modal from '@components/Modal';

import './style.scss';

export default class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeChats: [
                { name: 'Коля', id: '1' },
                { name: 'Аня', id: '2' },
                { name: 'Катя', id: '3' },
                { name: 'Тема', id: '4' },
            ],
        };
    };
    addChat = name => {
        this.setState({ activeChats: [...this.state.activeChats, { name, id: Date.now() }] });
    };
    render() {
        const { classes } = this.props;
        const { activeChats } = this.state;
        return (<div className="chat-list">
            <List>
                {activeChats.map((chat, i) => (
                    <ListItem className="list-item" button key={ i }>
                        <ListItemIcon className="list-item-icon">
                            <ChatIcon className="list-item-chat-icon"/>
                            <Link to={ `/chat/${chat.id}` }>{ chat.name }</Link>
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
            <Modal add={ this.addChat } />
        </div>
        );
    };
};