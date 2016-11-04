import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
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
                    <Text style={styles.chapterListItemText}>
                        {chapter.name}
                    </Text>
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
        marginTop: 50,
    },
    chapterListItem: {
        backgroundColor: 'white',
        flex: 1,
        marginBottom: 10,
        justifyContent: 'center',
        padding: 15,
        alignItems: 'stretch'
    },
    chapterListItemText: {
        fontSize: 25
    }
})

const mapStateToProps = ({chapters}) => ({
    chapters
})

const mapDispatchToProps = (dispatch) => ({
    fetchChapterList: (subject_key) => {dispatch(fetchChapterList(subject_key))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList)