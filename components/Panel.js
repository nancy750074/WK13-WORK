import React, { Component } from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    TouchableWithoutFeedback,
    UIManager,
    Animated,
    Dimensions,
    PanResponder

} from 'react-native';

import { Card,List,ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native';

class Panel extends Component {
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        this.state = { height: this.props.expanded ? null : 0, position }
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            //onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: (this.onShouldDrag),
            onPanResponderMove: (event, gesture) => {
                this.state.position.setValue({ x: gesture.dx });
            },
            onPanResponderRelease: this.onReleaseItem,
            onPanResponderTerminate: this.onReleaseItem,
        });
    }

    onShouldDrag = (event, gesture) => {
        const { dx } = gesture;
        return Math.abs(dx) > 2;
    }


    onToggle = () => {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
        this.setState({
            height: this.state.height === null ? 0 : null,
        })
    }

    onReleaseItem = (event, gesture) => {
        let config = {
            toValue: { x: 0, y: 0 },
            duration: 500,
        };

        Animated.spring(
            this.state.position,
            config,
        ).start();
    }

    render() {
        const { album,gocontent } = this.props;
        const { height, position } = this.state;
        return (
            <Animated.View
                style={position.getLayout()}
                {...this.panResponder.panHandlers}
            >
                     <ListItem
                        key={album.title}
                        roundAvatar
                        avatar={{ uri: album.image }}
                        title={album.title}
                        subtitle={album.artist}
                        onPress={() => gocontent.navigate('Details', { ...album })}
                        // hideChevron
                        // rightTitle='More...'
                    />
                    
            </Animated.View>
        );
    }
}
export default Panel;