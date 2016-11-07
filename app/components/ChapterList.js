import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {fetchChapterList} from '../actions/chapters';
import { Actions } from 'react-native-router-flux';


class ChapterList extends React.Component {

    componentDidMount(){
        this.props.fetchChapterList(this.props.subject.key)
    }

    handleChapterPressed(chapter){
        Actions.conceptView({chapter})
    }

    _renderChapterList(){
        return this.props.chapters.data.map( chapter => {
            return(
                <TouchableHighlight 
                    style={styles.chapterListItem} 
                    key={chapter.key}
                    underlayColor="#333"
                    onPress={this.handleChapterPressed.bind(this, chapter)}
                >
                    <View style={styles.chapterListItemContainer}>
                        <Text style={styles.chapterListItemText}>
                            {chapter.name}
                        </Text>
                        <Icon name="chevron-right" size={50} color="#333" />
                    </View>
                </TouchableHighlight>
            );
        }); 
    }

    render(){
        return (
            <View style={styles.container}>
                {
                    this.props.chapters.isFetching ? (
                        <Text>Loading...</Text>
                    ) : this._renderChapterList() 
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
    },
    chapterListItem: {
        backgroundColor: 'white',
        flex: 1,
        borderBottomColor: '#333',
        borderBottomWidth: 1
    },
    chapterListItemContainer: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    chapterListItemText: {
        fontSize: 23
    }
})

const mapStateToProps = ({chapters}) => ({
    chapters
})

const mapDispatchToProps = (dispatch) => ({
    fetchChapterList: (subject_key) => {dispatch(fetchChapterList(subject_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList)